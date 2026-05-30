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


def test_build_include_linux_has_fresh_plus_one_upgrade_per_baseline():
    baselines = ["0.55.5", "0.60.7", "0.61.4"]
    inc = bm.build_include(baselines)
    # exactly one linux fresh (stable)
    assert len([c for c in inc if c["osl"] == "linux" and c["vscode"] == "stable" and c["mode"] == "fresh"]) == 1
    # one linux upgrade per baseline, with matching "from"
    ups = _by(inc, "linux", "upgrade")
    assert sorted(c["from"] for c in ups) == sorted(baselines)


def test_build_include_mac_and_windows_have_one_representative_upgrade():
    baselines = ["0.55.5", "0.60.7", "0.61.4"]
    inc = bm.build_include(baselines)
    mac_up = _by(inc, "macos", "upgrade")
    win_up = _by(inc, "windows", "upgrade")
    assert len(mac_up) == 1 and len(win_up) == 1
    # representative = highest baseline (last after the popular+oldest selection)
    assert mac_up[0]["from"] == "0.61.4"
    assert win_up[0]["from"] == "0.61.4"
    # each of mac/windows also has a fresh cell
    assert len(_by(inc, "macos", "fresh")) == 1
    assert len(_by(inc, "windows", "fresh")) == 1


def test_build_include_has_insiders_fresh_only():
    inc = bm.build_include(["0.61.4"])
    ins = [c for c in inc if c["vscode"] == "insiders"]
    assert len(ins) == 1
    assert ins[0]["mode"] == "fresh" and ins[0]["osl"] == "linux"


def test_build_include_targets_match_os():
    inc = bm.build_include(["0.61.4"])
    want = {"linux": "linux-x64", "macos": "darwin-arm64", "windows": "win32-x64"}
    for c in inc:
        assert c["target"] == want[c["osl"]]


def test_build_include_empty_baselines_still_has_fresh_cells_no_upgrades():
    inc = bm.build_include([])
    assert _by(inc, "linux", "upgrade") == []
    assert _by(inc, "macos", "upgrade") == []
    assert _by(inc, "windows", "upgrade") == []
    # fresh cells for all three OSes + insiders remain
    assert len([c for c in inc if c["mode"] == "fresh"]) == 4


def test_fallback_baselines_are_semver_sorted_and_published_shaped():
    # the hardcoded fallback must be valid plain-semver and ascending
    import re
    for v in bm.FALLBACK_BASELINES:
        assert re.match(r"^\d+\.\d+\.\d+$", v)
    assert bm.FALLBACK_BASELINES == sorted(bm.FALLBACK_BASELINES, key=lambda x: tuple(int(p) for p in x.split(".")))
