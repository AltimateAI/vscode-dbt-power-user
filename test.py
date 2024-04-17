from dbt_core_integration import *
import os

os.environ["DBT_SCHEMA"] = "jaffle_shop_3"

project = DbtProject(project_dir="/Users/michieldesmet/src/altimate/sample_dbt_projects/jaffle_shop_altimate/dbt_project", profiles_dir="/Users/michieldesmet/.dbt", target_path="target")

project.init_project()


project.safe_parse_project()
compiled = project.compile_sql("SELECT * from {{ ref('orders') }}")
print(compiled.compiled_sql)

os.environ["DBT_SCHEMA"] = "jaffle_shop_2"
project.init_project()

project.safe_parse_project()
compiled = project.compile_sql("SELECT * from {{ ref('orders') }}")
print(compiled.compiled_sql)