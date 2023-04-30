from decimal import Decimal
from pathlib import Path
import dbt.adapters.factory

# This is critical because `get_adapter` is all over dbt-core
# as they expect a singleton adapter instance per plugin,
# so dbt-niceDatabase will have one adapter instance named niceDatabase.
# This makes sense in dbt-land where we have a single Project/Profile
# combination executed in process from start to finish or a single tenant RPC
# This doesn't fit our paradigm of one adapter per DbtProject in a multitenant server,
# so we create an adapter instance **independent** of the FACTORY cache
# and attach it directly to our RuntimeConfig which is passed through
# anywhere dbt-core needs config including in all `get_adapter` calls
dbt.adapters.factory.get_adapter = lambda config: config.adapter

import os
import threading
import uuid
from collections import UserDict
from collections.abc import Iterable
from datetime import date, datetime, time
from copy import copy
from functools import lru_cache, partial
from hashlib import md5
from typing import (
    TYPE_CHECKING,
    Any,
    Callable,
    Dict,
    List,
    Optional,
    Tuple,
    TypeVar,
)

import agate
from dbt.adapters.factory import get_adapter_class_by_name
from dbt.config.runtime import RuntimeConfig
from dbt.contracts.graph.manifest import NodeType
from dbt.events.functions import fire_event  # monkey-patched for perf
from dbt.flags import set_from_args
from dbt.node_types import NodeType
from dbt.parser.manifest import ManifestLoader, process_node
from dbt.parser.sql import SqlBlockParser, SqlMacroParser
from dbt.task.sql import SqlCompileRunner, SqlExecuteRunner
from dbt.tracking import disable_tracking
from dbt.version import __version__ as dbt_version

try:
    # dbt <= 1.3
    from dbt.contracts.graph.compiled import ManifestNode  # type: ignore
    from dbt.contracts.graph.parsed import ColumnInfo  # type: ignore
except Exception:
    # dbt > 1.3
    from dbt.contracts.graph.nodes import ColumnInfo, ManifestNode  # type: ignore


if TYPE_CHECKING:
    # These imports are only used for type checking
    from dbt.adapters.base import BaseRelation  # type: ignore
    from dbt.contracts.connection import AdapterResponse


CACHE = {}
CACHE_VERSION = 1
SQL_CACHE_SIZE = 1024

MANIFEST_ARTIFACT = "manifest.json"
DBT_MAJOR_VER, DBT_MINOR_VER, DBT_PATCH_VER = (int(v) for v in dbt_version.split("."))
RAW_CODE = "raw_code" if DBT_MAJOR_VER >= 1 and DBT_MINOR_VER >= 3 else "raw_sql"
COMPILED_CODE = "compiled_code" if DBT_MAJOR_VER >= 1 and DBT_MINOR_VER >= 3 else "compiled_sql"

JINJA_CONTROL_SEQS = ["{{", "}}", "{%", "%}", "{#", "#}"]

T = TypeVar("T")

def to_dict(obj):
    if isinstance(obj, agate.Table):
        return {
            "rows": [to_dict(row) for row in obj.rows],
            "column_names": obj.column_names,
        }
    if isinstance(obj, str):
        return obj
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    elif isinstance(obj, dict):
        return dict((key, to_dict(val)) for key, val in obj.items())
    elif isinstance(obj, Iterable):
        return [to_dict(val) for val in obj]
    elif hasattr(obj, '__dict__'):
        return to_dict(vars(obj))
    elif hasattr(obj, '__slots__'):
        return to_dict(dict((name, getattr(obj, name)) for name in getattr(obj, '__slots__')))
    return obj


def has_jinja(query: str) -> bool:
    """Utility to check for jinja prior to certain compilation procedures"""
    return any(seq in query for seq in JINJA_CONTROL_SEQS)


def memoize_get_rendered(function):
    """Custom memoization function for dbt-core jinja interface"""

    def wrapper(
        string: str,
        ctx: Dict[str, Any],
        node: "ManifestNode" = None,
        capture_macros: bool = False,
        native: bool = False,
    ):
        v = md5(string.strip().encode("utf-8")).hexdigest()
        v += "__" + str(CACHE_VERSION)
        if capture_macros == True and node is not None:
            if node.is_ephemeral:
                return function(string, ctx, node, capture_macros, native)
            v += "__" + node.unique_id
        rv = CACHE.get(v)
        if rv is not None:
            return rv
        else:
            rv = function(string, ctx, node, capture_macros, native)
            CACHE[v] = rv
            return rv

    return wrapper


# Performance hacks
# jinja.get_rendered = memoize_get_rendered(jinja.get_rendered)
disable_tracking()
fire_event = lambda e: None


class ConfigInterface:
    """This mimic dbt-core args based interface for dbt-core
    class instantiation"""

    def __init__(
        self,
        threads: Optional[int] = 1,
        target: Optional[str] = None,
        profiles_dir: Optional[str] = None,
        project_dir: Optional[str] = None,
        profile: Optional[str] = None
    ):
        self.threads = threads
        self.target = target
        self.profiles_dir = profiles_dir
        self.project_dir = project_dir
        self.dependencies = []
        self.single_threaded = threads == 1
        self.quiet = True
        self.profile = profile


class ManifestProxy(UserDict):
    """Proxy for manifest dictionary (`flat_graph`), if we need mutation then we should
    create a copy of the dict or interface with the dbt-core manifest object instead"""

    def _readonly(self, *args, **kwargs):
        raise RuntimeError("Cannot modify ManifestProxy")

    __setitem__ = _readonly
    __delitem__ = _readonly
    pop = _readonly
    popitem = _readonly
    clear = _readonly
    update = _readonly
    setdefault = _readonly


class DbtAdapterExecutionResult:
    """Interface for execution results, this keeps us 1 layer removed from dbt interfaces which may change"""

    def __init__(
        self, adapter_response: "AdapterResponse", table: agate.Table, raw_sql: str, compiled_sql: str
    ) -> None:
        self.adapter_response = adapter_response
        self.table = table
        self.raw_sql = raw_sql
        self.compiled_sql = compiled_sql


class DbtAdapterCompilationResult:
    """Interface for compilation results, this keeps us 1 layer removed from dbt interfaces which may change"""

    def __init__(self, raw_sql: str, compiled_sql: str, node: "ManifestNode") -> None:
        self.raw_sql = raw_sql
        self.compiled_sql = compiled_sql
        self.node = node


class DbtProject:
    """Container for a dbt project. The dbt attribute is the primary interface for
    dbt-core. The adapter attribute is the primary interface for the dbt adapter"""

    def __init__(
        self,
        target: Optional[str] = None,
        profiles_dir: Optional[str] = None,
        project_dir: Optional[str] = None,
        threads: Optional[int] = 1,
        profile: Optional[str] = None,
    ):
        
        self.args = ConfigInterface(
            threads=threads,
            target=target,
            profiles_dir=profiles_dir,
            project_dir=project_dir,
            profile=profile,
        )

        self.init_project()

        # Utilities
        self._sql_parser: Optional[SqlBlockParser] = None
        self._macro_parser: Optional[SqlMacroParser] = None
        self._sql_runner: Optional[SqlExecuteRunner] = None
        self._sql_compiler: Optional[SqlCompileRunner] = None

        # Tracks internal state version
        self._version: int = 1
        self.mutex = threading.Lock()
        # atexit.register(lambda dbt_project: dbt_project.adapter.connections.cleanup_all, self)

    def get_adapter(self):
        """This inits a new Adapter which is fundamentally different than
        the singleton approach in the core lib"""
        adapter_name = self.config.credentials.type
        return get_adapter_class_by_name(adapter_name)(self.config)

    def init_project(self):
        set_from_args(self.args, self.args)
        self.config = RuntimeConfig.from_args(self.args)
        if hasattr(self, "adapter"):
            self.adapter.cleanup_all()
        self.adapter = self.get_adapter()
        self.adapter.connections.set_connection_name()
        self.config.adapter = self.adapter
        self.dbt = None

    def parse_project(self, init: bool = False) -> None:
        """Parses project on disk from `ConfigInterface` in args attribute, verifies connection
        to adapters database, mutates config, adapter, and dbt attributes"""
        if init:
            self.init_project()

        project_parser = ManifestLoader(
            self.config, self.config.load_dependencies(), self.adapter.connections.set_query_header
        )
        self.dbt = project_parser.load()
        self.dbt.build_flat_graph()
        project_parser.save_macros_to_adapter(self.adapter)
        self._sql_parser = None
        self._macro_parser = None
        self._sql_compiler = None
        self._sql_runner = None

    @classmethod
    def from_args(cls, args: ConfigInterface) -> "DbtProject":
        """Instatiate the DbtProject directly from a ConfigInterface instance"""
        return cls(
            target=args.target,
            profiles_dir=args.profiles_dir,
            project_dir=args.project_dir,
            threads=args.threads,
            profile=args.profile,
        )

    @property
    def sql_parser(self) -> SqlBlockParser:
        """A dbt-core SQL parser capable of parsing and adding nodes to the manifest via `parse_remote` which will
        also return the added node to the caller. Note that post-parsing this still typically requires calls to
        `_process_nodes_for_ref` and `_process_sources_for_ref` from `dbt.parser.manifest`"""
        if self._sql_parser is None:
            self._sql_parser = SqlBlockParser(self.config, self.dbt, self.config)
        return self._sql_parser

    @property
    def macro_parser(self) -> SqlMacroParser:
        """A dbt-core macro parser"""
        if self._macro_parser is None:
            self._macro_parser = SqlMacroParser(self.config, self.dbt)
        return self._macro_parser

    @property
    def sql_runner(self) -> SqlExecuteRunner:
        """A runner which is used internally by the `execute_sql` function of `dbt.lib`.
        The runners `node` attribute can be updated before calling `compile` or `compile_and_execute`."""
        if self._sql_runner is None:
            self._sql_runner = SqlExecuteRunner(
                self.config, self.adapter, node=None, node_index=1, num_nodes=1
            )
        return self._sql_runner

    @property
    def sql_compiler(self) -> SqlCompileRunner:
        """A runner which is used internally by the `compile_sql` function of `dbt.lib`.
        The runners `node` attribute can be updated before calling `compile` or `compile_and_execute`."""
        if self._sql_compiler is None:
            self._sql_compiler = SqlCompileRunner(
                self.config, self.adapter, node=None, node_index=1, num_nodes=1
            )
        return self._sql_compiler

    @property
    def project_name(self) -> str:
        """dbt project name"""
        return self.config.project_name

    @property
    def project_root(self) -> str:
        """dbt project root"""
        return self.config.project_root

    @property
    def manifest(self) -> ManifestProxy:
        """dbt manifest dict"""
        return ManifestProxy(self.dbt.flat_graph)

    def safe_parse_project(self, reinit: bool = False) -> None:
        self.clear_caches()
        _config_pointer = copy(self.config)
        try:
            self.parse_project(init=reinit)
            self.write_manifest_artifact()
        except Exception:
            self.config = _config_pointer

    def write_manifest_artifact(self) -> None:
        """Write a manifest.json to disk"""
        artifact_path = os.path.join(
            self.config.project_root, self.config.target_path, MANIFEST_ARTIFACT
        )
        self.dbt.write(artifact_path)

    def clear_caches(self) -> None:
        """Clear least recently used caches and reinstantiable container objects"""
        self.get_ref_node.cache_clear()
        self.get_source_node.cache_clear()
        self.get_macro_function.cache_clear()
        self.get_columns.cache_clear()
        self.compile_sql.cache_clear()

    @lru_cache(maxsize=10)
    def get_ref_node(self, target_model_name: str) -> "ManifestNode":
        """Get a `"ManifestNode"` from a dbt project model name"""
        return self.dbt.resolve_ref(
            target_model_name=target_model_name,
            target_model_package=None,
            current_project=self.config.project_name,
            node_package=self.config.project_name,
        )

    @lru_cache(maxsize=10)
    def get_source_node(self, target_source_name: str, target_table_name: str) -> "ManifestNode":
        """Get a `"ManifestNode"` from a dbt project source name and table name"""
        return self.dbt.resolve_source(
            target_source_name=target_source_name,
            target_table_name=target_table_name,
            current_project=self.config.project_name,
            node_package=self.config.project_name,
        )

    def get_server_node(self, sql: str, node_name="name"):
        """Get a node for SQL execution against adapter"""
        self._clear_node(node_name)
        sql_node = self.sql_parser.parse_remote(sql, node_name)
        process_node(self.config, self.dbt, sql_node)
        return sql_node

    @lru_cache(maxsize=100)
    def get_macro_function(self, macro_name: str) -> Callable[[Dict[str, Any]], Any]:
        """Get macro as a function which takes a dict via argument named `kwargs`,
        ie: `kwargs={"relation": ...}`

        make_schema_fn = get_macro_function('make_schema')\n
        make_schema_fn({'name': '__test_schema_1'})\n
        make_schema_fn({'name': '__test_schema_2'})"""
        return partial(self.adapter.execute_macro, macro_name=macro_name, manifest=self.dbt)

    def adapter_execute(
        self, sql: str, auto_begin: bool = True, fetch: bool = False
    ) -> Tuple["AdapterResponse", agate.Table]:
        """Wraps adapter.execute. Execute SQL against database"""
        return self.adapter.execute(sql, auto_begin, fetch)

    def execute_macro(
        self,
        macro: str,
        kwargs: Optional[Dict[str, Any]] = None,
    ) -> Any:
        """Wraps adapter execute_macro. Execute a macro like a function."""
        return self.get_macro_function(macro)(kwargs=kwargs)

    def execute_sql(self, raw_sql: str) -> DbtAdapterExecutionResult:
        """Execute dbt SQL statement against database"""
        with self.adapter.connection_named("master"):
            # if no jinja chars then these are synonymous
            compiled_sql = raw_sql
            if has_jinja(raw_sql):
                # jinja found, compile it
                compilation_result = self.compile_sql(raw_sql)
                compiled_sql = compilation_result.compiled_sql
            
            return DbtAdapterExecutionResult(
                *self.adapter_execute(compiled_sql, fetch=True),
                raw_sql,
                compiled_sql,
            )

    def execute_node(self, node: "ManifestNode") -> DbtAdapterExecutionResult:
        """Execute dbt SQL statement against database from a"ManifestNode"""
        try:
            raw_sql: str = getattr(node, RAW_CODE)
            compiled_sql: Optional[str] = getattr(node, COMPILED_CODE, None)
            if compiled_sql:
                # node is compiled, execute the SQL
                return self.execute_sql(compiled_sql)
            # node not compiled
            if has_jinja(raw_sql):
                # node has jinja in its SQL, compile it
                compiled_sql = self.compile_node(node).compiled_sql
            # execute the SQL
            return self.execute_sql(compiled_sql or raw_sql)
        except Exception as e:
            raise Exception(str(e))

    @lru_cache(maxsize=SQL_CACHE_SIZE)
    def compile_sql(self, raw_sql: str) -> DbtAdapterCompilationResult:
        """Creates a node with a `dbt.parser.sql` class. Compile generated node."""
        try:
            temp_node_id = str("t_" + uuid.uuid4().hex)
            node = self.compile_node(self.get_server_node(raw_sql, temp_node_id))
            self._clear_node(temp_node_id)
            return node
        except Exception as e:
            raise Exception(str(e))

    def compile_node(self, node: "ManifestNode") -> Optional[DbtAdapterCompilationResult]:
        """Compiles existing node."""
        try:
            self.sql_compiler.node = node
            # this is essentially a convenient wrapper to adapter.get_compiler
            compiled_node = self.sql_compiler.compile(self.dbt)
            return DbtAdapterCompilationResult(
                getattr(compiled_node, RAW_CODE),
                getattr(compiled_node, COMPILED_CODE),
                compiled_node,
            )
        except Exception as e:
            raise Exception(str(e))

    def _clear_node(self, name="name"):
        """Removes the statically named node created by `execute_sql` and `compile_sql` in `dbt.lib`"""
        if self.dbt is not None:
            self.dbt.nodes.pop(f"{NodeType.SqlOperation}.{self.project_name}.{name}", None)

    def get_relation(self, database: str, schema: str, name: str) -> Optional["BaseRelation"]:
        """Wrapper for `adapter.get_relation`"""
        return self.adapter.get_relation(database, schema, name)

    def create_relation(self, database: str, schema: str, name: str) -> "BaseRelation":
        """Wrapper for `adapter.Relation.create`"""
        return self.adapter.Relation.create(database, schema, name)

    def create_relation_from_node(self, node: "ManifestNode") -> "BaseRelation":
        """Wrapper for `adapter.Relation.create_from`"""
        return self.adapter.Relation.create_from(self.config, node)

    def get_columns_in_relation(self, relation: "BaseRelation") -> List[str]:
        """Wrapper for `adapter.get_columns_in_relation`"""
        return self.adapter.get_columns_in_relation(relation)

    @lru_cache(maxsize=5)
    def get_columns(self, node: "ManifestNode") -> List["ColumnInfo"]:
        """Get a list of columns from a compiled node"""
        columns = []
        try:
            columns.extend(
                [c.name for c in self.get_columns_in_relation(self.create_relation_from_node(node))]
            )
        except Exception:
            original_sql = str(getattr(node, RAW_CODE))
            # TODO: account for `TOP` syntax
            setattr(node, RAW_CODE, f"select * from ({original_sql}) limit 0")
            result = self.execute_node(node)
            setattr(node, RAW_CODE, original_sql)
            delattr(node, COMPILED_CODE)
            columns.extend(result.table.column_names)
        return columns

    def get_or_create_relation(
        self, database: str, schema: str, name: str
    ) -> Tuple["BaseRelation", bool]:
        """Get relation or create if not exists. Returns tuple of relation and
        boolean result of whether it existed ie: (relation, did_exist)"""
        ref = self.get_relation(database, schema, name)
        return (ref, True) if ref else (self.create_relation(database, schema, name), False)

    def create_schema(self, node: "ManifestNode"):
        """Create a schema in the database"""
        return self.execute_macro(
            "create_schema",
            kwargs={"relation": self.create_relation_from_node(node)},
        )

    def materialize(
        self, node: "ManifestNode", temporary: bool = True
    ) -> Tuple["AdapterResponse", None]:
        """Materialize a table in the database"""
        return self.adapter_execute(
            # Returns CTAS string so send to adapter.execute
            self.execute_macro(
                "create_table_as",
                kwargs={
                    "sql": getattr(node, COMPILED_CODE),
                    "relation": self.create_relation_from_node(node),
                    "temporary": temporary,
                },
            ),
            auto_begin=True,
        )
