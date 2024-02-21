try:
    from dbt.version import get_installed_version

    dbt_installed = True
except ImportError:
    dbt_installed = False
import os
import sys
import platform
from typing import Dict
import colorama

USE_COLORS = True
COLORS: Dict[str, str] = {
    "red": colorama.Fore.RED,
    "green": colorama.Fore.GREEN,
    "yellow": colorama.Fore.YELLOW,
    "reset_all": colorama.Style.RESET_ALL,
}


COLOR_FG_RED = COLORS["red"]
COLOR_FG_GREEN = COLORS["green"]
COLOR_FG_YELLOW = COLORS["yellow"]
COLOR_RESET_ALL = COLORS["reset_all"]


def color(text: str, color_code: str) -> str:
    if USE_COLORS:
        return "{}{}{}".format(color_code, text, COLOR_RESET_ALL)
    else:
        return text


def green(text: str) -> str:
    return color(text, COLOR_FG_GREEN)


def yellow(text: str) -> str:
    return color(text, COLOR_FG_YELLOW)


def red(text: str) -> str:
    return color(text, COLOR_FG_RED)


if not dbt_installed:
    dbt_version = red("not installed")
else:
    dbt_version: str = get_installed_version().to_version_string(skip_matcher=True)
    dbt_version = green(dbt_version)
print("**** BEGIN SUPPORT INFO ****")
print("Please share the following information with dbt Power User maintainers:\r\n")
print("dbt version: {}".format(dbt_version))
print("python version: {}".format(green(sys.version.split()[0])))
print("python path: {}".format(sys.executable))
print("os info: {}".format(platform.platform()))
print(
    "Profiles Directory in extension: {}".format(
        green(os.environ.get("DBTPU__PROFILES_DIR", ""))
    )
)
print("\r\n")
print("**** END SUPPORT INFO ****")
