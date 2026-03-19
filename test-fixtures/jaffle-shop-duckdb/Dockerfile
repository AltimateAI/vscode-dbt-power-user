FROM mcr.microsoft.com/vscode/devcontainers/python:3.13

ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID vscode && usermod --uid $USER_UID --gid $USER_GID vscode; fi

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
COPY pyproject.toml uv.lock /tmp/
RUN uv pip install --system --requirement /tmp/pyproject.toml
