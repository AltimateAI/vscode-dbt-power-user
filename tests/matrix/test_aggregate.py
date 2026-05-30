import importlib.util
import json
import pathlib
import subprocess
import sys

_spec = importlib.util.spec_from_file_location(
    "aggregate", pathlib.Path(__file__).resolve().parents[2] / "test-matrix" / "aggregate.py"
)
aggregate = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(aggregate)


def _cell(**kw):
    base = dict(
        runtime="vscode", os="linux", scenario="fresh", **{"from": None},
        to="0.61.5", install_ok=True, deps_resolved={}, activation_ok=True,
        dbt_flow_ok=True, status="pass", reason="", duration_s=10, log_artifact="x.log",
    )
    base.update(kw)
    return base


def test_blocking_failure_when_vscode_fails():
    results = [_cell(status="fail", activation_ok=False, reason="no activate")]
    out = aggregate.build_matrices(results)
    assert out["has_blocking_failure"] is True


def test_no_blocking_failure_when_only_codeserver_fails():
    results = [
        _cell(),
        _cell(runtime="code-server", status="fail", dbt_flow_ok=False, reason="boom"),
    ]
    out = aggregate.build_matrices(results)
    assert out["has_blocking_failure"] is False


def test_insiders_is_non_blocking():
    results = [_cell(runtime="vscode-insiders", status="fail", reason="upstream churn")]
    out = aggregate.build_matrices(results)
    assert out["has_blocking_failure"] is False


def test_install_matrix_has_a_row_per_runtime_os():
    results = [
        _cell(os="linux"), _cell(os="windows"), _cell(os="macos"),
        _cell(runtime="code-server", os="linux"),
    ]
    md = aggregate.build_matrices(results)["install_md"]
    assert "vscode" in md and "code-server" in md
    assert "linux" in md and "windows" in md and "macos" in md
    assert "✅" in md


def test_update_matrix_groups_by_baseline():
    results = [
        _cell(scenario="upgrade", **{"from": "0.61.4"}),
        _cell(scenario="upgrade", **{"from": "0.55.5"}, status="fail", dbt_flow_ok=False),
    ]
    md = aggregate.build_matrices(results)["update_md"]
    assert "0.61.4" in md and "0.55.5" in md
    assert "✅" in md and "❌" in md


def test_fork_failure_renders_warning_not_cross():
    # In P1 there are no forks, but a non-blocking runtime failure must render as ⚠️
    results = [_cell(runtime="code-server", status="fail", reason="x")]
    md = aggregate.build_matrices(results)["install_md"]
    assert "⚠️" in md


def test_skip_cell_renders_skip_symbol():
    results = [_cell(status="skip", reason="not applicable")]
    md = aggregate.build_matrices(results)["install_md"]
    assert "⏭️" in md


def test_cli_writes_files_and_exit_code(tmp_path):
    rdir = tmp_path / "results"
    rdir.mkdir()
    (rdir / "a.json").write_text(json.dumps(_cell()))
    (rdir / "b.json").write_text(
        json.dumps(
            _cell(runtime="vscode", os="windows", status="fail", activation_ok=False, reason="x")
        )
    )
    odir = tmp_path / "out"
    root = pathlib.Path(__file__).resolve().parents[2]
    proc = subprocess.run(
        [sys.executable, str(root / "test-matrix" / "aggregate.py"),
         "--results-dir", str(rdir), "--out-dir", str(odir), "--target", "0.61.5"],
        capture_output=True, text=True,
    )
    assert proc.returncode == 1  # a blocking vscode cell failed
    assert (odir / "matrix.md").exists()
    assert (odir / "slack.json").exists()
    slack = json.loads((odir / "slack.json").read_text())
    assert "blocks" in slack and len(slack["blocks"]) == 2
