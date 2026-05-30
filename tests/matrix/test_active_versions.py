import importlib.util
import pathlib

_spec = importlib.util.spec_from_file_location(
    "active_versions",
    pathlib.Path(__file__).resolve().parents[2] / "test-matrix" / "active-versions.py",
)
av = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(av)

# A realistic live distribution incl. a junk/fork version (1.2.16) and a
# pre-release tag, mirroring what App Insights actually returns.
_DIST = [
    ("0.61.5", 19685, 41.3), ("0.61.4", 9904, 20.8), ("0.61.2", 4803, 10.1),
    ("0.60.7", 3565, 7.5), ("0.61.3", 3226, 6.8), ("0.61.0", 938, 1.97),
    ("0.61.1", 789, 1.66), ("0.55.5", 562, 1.18), ("0.49.0", 100, 0.21),
    ("1.2.16", 89, 0.19), ("0.34.2003", 88, 0.18),
]
# Open VSX publishes the real releases; junk/fork versions are absent.
_PUBLISHED = {"0.61.5", "0.61.4", "0.61.3", "0.61.2", "0.61.1", "0.61.0",
              "0.60.7", "0.55.5", "0.49.0"}


def test_semver_key_orders_numerically():
    assert av._semver_key("0.9.0") < av._semver_key("0.55.5") < av._semver_key("0.61.4")


def test_pick_target_is_highest_published_semver_not_junk():
    # 1.2.16 has a higher numeric semver than 0.61.5 but is NOT a real release,
    # so the target must resolve to 0.61.5 (publish-filtered).
    assert av.pick_target(_DIST, _PUBLISHED) == "0.61.5"


def test_pick_baselines_popular_plus_oldest():
    b = av.pick_baselines(_DIST, target="0.61.5", min_share=1.0, max_baselines=6,
                          include_oldest_above=0.5, published=_PUBLISHED)
    assert "0.61.5" not in b                       # never upgrade-from the target itself
    assert {"0.61.4", "0.61.2", "0.60.7", "0.61.3", "0.61.0"} <= set(b)  # top-run older versions
    assert "0.55.5" in b                            # oldest >=0.5% kept for big-gap coverage
    assert "1.2.16" not in b and "0.34.2003" not in b  # junk excluded by publish filter
    assert "0.49.0" not in b                         # below include-oldest-above threshold
    assert len(b) <= 6
    assert b == sorted(b, key=av._semver_key)        # output is semver-sorted


def test_pick_baselines_excludes_unpublished_and_prerelease():
    dist = [("0.61.5", 100, 50.0), ("0.61.4", 50, 25.0),
            ("1.2.16", 30, 15.0), ("0.61.0-pre", 20, 10.0)]
    published = {"0.61.5", "0.61.4"}
    b = av.pick_baselines(dist, target="0.61.5", min_share=1.0, max_baselines=6,
                          include_oldest_above=0.5, published=published)
    assert b == ["0.61.4"]


def test_pick_baselines_respects_max():
    # Realistic shape: newer versions have MORE installs than older ones, so the
    # oldest version is not also the most-popular. With max_baselines=3 the result
    # is the 2 most-installed older versions plus the oldest eligible one.
    dist = [(f"0.60.{i}", 100 + 10 * i, 5.0) for i in range(10)]  # 0.60.9 most installed
    published = {v for v, _, _ in dist}
    b = av.pick_baselines(dist, target="0.61.5", min_share=1.0, max_baselines=3,
                          include_oldest_above=0.5, published=published)
    assert len(b) == 3
    assert "0.60.9" in b and "0.60.8" in b  # two most-installed
    assert "0.60.0" in b                     # oldest eligible, for big-gap coverage
    assert b == sorted(b, key=av._semver_key)
