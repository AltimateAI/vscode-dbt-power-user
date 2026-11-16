"""Fail when a platform VSIX is over its size budget or ships files it doesn't need.

Usage: check-vsix.py <vsix> <vsce-target>

Checks the packaged zip only, so it also covers targets the runner can't load:
  - the VSIX is within the target's size budget;
  - no README GIFs (media/images/*.gif) and no source maps under dist/node_modules;
  - zeromq ships no prebuilds/, only the addons of ZEROMQ_RUNTIMES[target]
    under build/, and a build/manifest.json that lists exactly those;
  - cmake-ts ships its runtime loader.
"""

import json
import os
import re
import sys
import zipfile

MIB = 1024 * 1024

# Compressed VSIX size budget per target, in MiB: the size after slimming plus
# headroom for normal growth, so that a regression of a few MiB fails the build.
BUDGET_MIB = {
    "darwin-arm64": 35,
    "darwin-x64": 37,
    "linux-arm64": 37,
    "linux-x64": 39,
    "win32-x64": 38,
}

# vsce target -> the zeromq addon runtimes it ships, as (os, arch, libc) in the
# terms of zeromq's build/manifest.json. Windows on Arm and Alpine have no VSIX
# of their own, so the win32-x64 and linux VSIXes also carry their addons.
ZEROMQ_RUNTIMES = {
    "darwin-arm64": {("darwin", "arm64", "libc")},
    "darwin-x64": {("darwin", "x64", "libc")},
    "linux-arm64": {("linux", "arm64", "glibc"), ("linux", "arm64", "musl")},
    "linux-x64": {("linux", "x64", "glibc"), ("linux", "x64", "musl")},
    "win32-x64": {("win32", "x64", "msvc"), ("win32", "arm64", "msvc")},
}

NODE_MODULES = "extension/dist/node_modules/"
ZEROMQ = NODE_MODULES + "zeromq/"
ZEROMQ_BUILD = ZEROMQ + "build/"
MANIFEST = ZEROMQ_BUILD + "manifest.json"
CMAKE_TS_LOADER = NODE_MODULES + "cmake-ts/build/loader.js"


def check_unneeded_files(names):
    errors = []
    gifs = [n for n in names if re.match(r"extension/media/images/.*\.gif$", n)]
    if gifs:
        errors.append(f"ships {len(gifs)} README GIFs, e.g. {gifs[0]}")
    maps = [n for n in names if n.startswith(NODE_MODULES) and n.endswith(".map")]
    if maps:
        errors.append(f"ships {len(maps)} source maps, e.g. {maps[0]}")
    prebuilds = [n for n in names if n.startswith(ZEROMQ + "prebuilds/")]
    if prebuilds:
        errors.append(f"ships zeromq prebuilds/, e.g. {prebuilds[0]}")
    if CMAKE_TS_LOADER not in names:
        errors.append(f"missing {CMAKE_TS_LOADER}")
    return errors


def check_zeromq_addons(z, addons, target):
    """The manifest must list exactly the addons shipped, for the target's runtimes."""
    if MANIFEST not in z.namelist():
        return [f"missing {MANIFEST}"]
    errors = []
    listed = set()
    found = set()
    for key, addon_path in json.loads(z.read(MANIFEST)).items():
        config = json.loads(key)
        runtime = (config["os"], config["arch"], config["libc"])
        found.add(runtime)
        if runtime not in ZEROMQ_RUNTIMES[target]:
            errors.append(f"manifest lists another platform's addon: {addon_path}")
        listed.add(ZEROMQ_BUILD + addon_path.replace("\\", "/"))
    for runtime in sorted(ZEROMQ_RUNTIMES[target] - found):
        errors.append(f"manifest lists no zeromq addon for {'/'.join(runtime)}")
    for path in sorted(listed - addons):
        errors.append(f"manifest lists an addon the VSIX doesn't ship: {path}")
    for path in sorted(addons - listed):
        errors.append(f"ships a zeromq addon the manifest doesn't list: {path}")
    return errors


def check(vsix, target):
    errors = []
    size_mib = os.path.getsize(vsix) / MIB
    budget = BUDGET_MIB[target]
    if size_mib > budget:
        errors.append(f"VSIX is {size_mib:.1f} MiB, over the {budget} MiB budget")

    z = zipfile.ZipFile(vsix)
    names = z.namelist()
    addons = {n for n in names if n.startswith(ZEROMQ_BUILD) and n.endswith(".node")}
    errors += check_unneeded_files(names)
    errors += check_zeromq_addons(z, addons, target)
    return size_mib, budget, sorted(addons), errors


def main():
    vsix, target = sys.argv[1], sys.argv[2]
    size_mib, budget, addons, errors = check(vsix, target)
    print(f"{target}: {size_mib:.1f} MiB (budget {budget} MiB)")
    for addon in addons:
        print(f"  zeromq addon: {addon[len(ZEROMQ_BUILD):]}")
    for error in errors:
        print(f"::error::{target}: {error}")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
