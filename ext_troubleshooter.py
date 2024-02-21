import os
import platform
import sys
from typing import Dict, Optional

import colorama


class ColorManager:
    COLORS: Dict[str, str] = {
        "red": colorama.Fore.RED,
        "green": colorama.Fore.GREEN,
        "yellow": colorama.Fore.YELLOW,
        "reset_all": colorama.Style.RESET_ALL,
    }

    def __init__(self, use_colors: bool = True):
        self.use_colors = use_colors

    def color(self, text: str, color_code: str) -> str:
        if self.use_colors:
            return f"{color_code}{text}{self.COLORS['reset_all']}"
        else:
            return text

    def green(self, text: str) -> str:
        return self.color(text, self.COLORS["green"])

    def yellow(self, text: str) -> str:
        return self.color(text, self.COLORS["yellow"])

    def red(self, text: str) -> str:
        return self.color(text, self.COLORS["red"])


class SupportInfo:
    def __init__(self, color_manager: ColorManager):
        self.color_manager = color_manager
        self.dbt_installed, self.dbt_version = self.check_dbt_installation()

    def check_dbt_installation(self) -> (bool, str):
        try:
            from dbt.version import get_installed_version

            return True, get_installed_version().to_version_string(skip_matcher=True)
        except ImportError:
            return False, "not installed"

    def print_env_variables(self):
        print("Environment Variables:")
        for key, value in sorted(os.environ.items()):
            print(f"{self.color_manager.green(key)}: {value}")

    def print_support_info(self):
        dbt_version = (
            self.dbt_installed
            and self.color_manager.green(self.dbt_version)
            or self.color_manager.red("not installed")
        )
        print(f"{colorama.Fore.RED}This should be red{colorama.Style.RESET_ALL}")
        print("**** BEGIN SUPPORT INFO ****")
        print(
            "Please share the following information with dbt Power User maintainers:\r\n"
        )
        print(f"dbt version: {dbt_version}")
        print(f"python version: {self.color_manager.green(sys.version.split()[0])}")
        print(f"python path: {sys.executable}")
        print(f"os info: {platform.platform()}")
        print(
            f"Profiles Directory in extension: {self.color_manager.green(os.environ.get('DBTPU__PROFILES_DIR', ''))}"
        )
        print("\r\n")
        self.print_env_variables()
        print("**** END SUPPORT INFO ****")


def main():
    color_manager = ColorManager()
    support_info = SupportInfo(color_manager)
    support_info.print_support_info()


if __name__ == "__main__":
    colorama.init()
    print(f"{colorama.Fore.RED}This should be red{colorama.Style.RESET_ALL}")
    main()
