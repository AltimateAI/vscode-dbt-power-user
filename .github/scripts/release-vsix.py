"""Hand a checked VSIX from the build job to the publish jobs.

Usage:
  release-vsix.py record <vsix>
      Write <vsix>.sha256 next to the VSIX, after check-vsix.py passed.
  release-vsix.py verify <dir> <vsce-target> <version> <pre-release: true|false>
      Find the single VSIX in <dir>, check it against its .sha256, and check that
      extension/package.json and extension.vsixmanifest carry <version>, the
      target platform and the pre-release flag. Writes `vsix=<path>` to
      GITHUB_OUTPUT. Exits 1 with `::error::` lines on any mismatch.
"""

import glob
import hashlib
import json
import os
import sys
import xml.etree.ElementTree as ET
import zipfile

VSX_NS = "{http://schemas.microsoft.com/developer/vsx-schema/2011}"
PRE_RELEASE_PROPERTY = "Microsoft.VisualStudio.Code.PreRelease"


def sha256(path):
    digest = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def record(vsix):
    digest = sha256(vsix)
    # newline="\n": the same `sha256sum -c` format on every runner, Windows too.
    with open(vsix + ".sha256", "w", newline="\n") as f:
        f.write(f"{digest}  {os.path.basename(vsix)}\n")
    print(f"{os.path.basename(vsix)}: sha256 {digest}")


def find_vsix(directory):
    found = glob.glob(os.path.join(directory, "*.vsix"))
    if len(found) != 1:
        return None, [f"expected one VSIX in {directory}, found {len(found)}"]
    return found[0], []


def check_digest(vsix):
    try:
        with open(vsix + ".sha256") as f:
            recorded = f.read().split()[0]
    except OSError as error:
        return [f"no recorded checksum for {vsix}: {error}"]
    actual = sha256(vsix)
    print(f"{os.path.basename(vsix)}: sha256 {actual}")
    if actual != recorded:
        return [f"sha256 {actual} differs from the checked VSIX's {recorded}"]
    return []


def check_identity(vsix, target, version, pre_release):
    z = zipfile.ZipFile(vsix)
    manifest = ET.fromstring(z.read("extension.vsixmanifest"))
    metadata = manifest.find(f"{VSX_NS}Metadata")
    identity = metadata.find(f"{VSX_NS}Identity")
    properties = metadata.iter(f"{VSX_NS}Property")
    package_json = json.loads(z.read("extension/package.json"))
    found = {
        "extension/package.json version": package_json["version"],
        "vsixmanifest Version": identity.get("Version"),
        "vsixmanifest TargetPlatform": identity.get("TargetPlatform"),
        "pre-release package": any(
            p.get("Id") == PRE_RELEASE_PROPERTY for p in properties
        ),
    }
    expected = dict(zip(found, [version, version, target, pre_release]))
    return [
        f"{key} is {found[key]}, expected {expected[key]}"
        for key in found
        if found[key] != expected[key]
    ]


def verify(directory, target, version, pre_release):
    vsix, errors = find_vsix(directory)
    if vsix:
        errors += check_digest(vsix)
        errors += check_identity(vsix, target, version, pre_release == "true")
    for error in errors:
        print(f"::error::{target}: {error}")
    if errors:
        sys.exit(1)
    print(f"{target}: {os.path.basename(vsix)} is version {version}, target {target}")
    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a") as f:
            f.write(f"vsix={vsix}\n")


def main():
    command, args = sys.argv[1], sys.argv[2:]
    if command == "record" and len(args) == 1:
        record(*args)
    elif command == "verify" and len(args) == 4:
        verify(*args)
    else:
        print(f"::error::usage: {__doc__}")
        sys.exit(2)


if __name__ == "__main__":
    main()
