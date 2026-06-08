import importlib.util
import pathlib

_spec = importlib.util.spec_from_file_location(
    "build_matrix",
    pathlib.Path(__file__).resolve().parents[2] / "test-matrix" / "build-matrix.py",
)
bm = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bm)


def _by(inc, osl, mode):
    return [c for c in inc if c["osl"] == osl and c["mode"] == mode]


def test_every_baseline_tested_on_all_three_oses():
    baselines = ["0.60.7", "0.61.2", "0.61.4"]
    inc = bm.build_include(baselines)
    for osl in ("linux", "macos", "windows"):
        ups = sorted(c["from"] for c in _by(inc, osl, "upgrade"))
        assert ups == sorted(baselines), f"{osl} upgrade-from versions must be all baselines"


def test_each_os_has_exactly_one_fresh_stable_cell():
    inc = bm.build_include(["0.61.4"])
    for osl in ("linux", "macos", "windows"):
        fresh = [c for c in inc if c["osl"] == osl and c["vscode"] == "stable" and c["mode"] == "fresh"]
        assert len(fresh) == 1


def test_insiders_fresh_linux_only():
    inc = bm.build_include(["0.61.4"])
    ins = [c for c in inc if c["vscode"] == "insiders"]
    assert len(ins) == 1
    assert ins[0]["mode"] == "fresh" and ins[0]["osl"] == "linux"


def test_targets_match_os():
    inc = bm.build_include(["0.61.4", "0.60.7"])
    want = {"linux": "linux-x64", "macos": "darwin-arm64", "windows": "win32-x64"}
    for c in inc:
        assert c["target"] == want[c["osl"]]


def test_cell_count_is_three_oses_times_baselines_plus_fresh_plus_insiders():
    baselines = ["0.60.7", "0.61.0", "0.61.1", "0.61.2", "0.61.3", "0.61.4"]
    inc = bm.build_include(baselines)
    # 3 OSes * (1 fresh + N upgrades) + 1 insiders
    assert len(inc) == 3 * (1 + len(baselines)) + 1  # = 3*7 + 1 = 22


def test_empty_baselines_keeps_fresh_cells_no_upgrades():
    inc = bm.build_include([])
    assert _by(inc, "linux", "upgrade") == []
    assert _by(inc, "macos", "upgrade") == []
    assert _by(inc, "windows", "upgrade") == []
    assert len([c for c in inc if c["mode"] == "fresh"]) == 4  # 3 stable + insiders


def test_fallback_is_valid_semver_ascending():
    import re
    for v in bm.FALLBACK_BASELINES:
        assert re.match(r"^\d+\.\d+\.\d+$", v)
    assert bm.FALLBACK_BASELINES == sorted(
        bm.FALLBACK_BASELINES, key=lambda x: tuple(int(p) for p in x.split("."))
    )
