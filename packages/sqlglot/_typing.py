from __future__ import annotations

import typing as t

import packages.sqlglot as sqlglot

E = t.TypeVar("E", bound="sqlglot.exp.Expression")
T = t.TypeVar("T")
