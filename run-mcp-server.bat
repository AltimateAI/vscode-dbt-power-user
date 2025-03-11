@echo off
REM run-mcp-server.bat - Helper script to launch the dbt Power User MCP server on Windows

REM Check if required arguments are provided
if "%~1"=="" (
  echo Usage: %0 ^<dbt_project_path^> [dbt_profiles_path] [altimate_api_key] [altimate_instance]
  echo.
  echo Arguments:
  echo   dbt_project_path   - Path to your dbt project ^(required^)
  echo   dbt_profiles_path  - Path to your dbt profiles.yml file ^(optional^)
  echo   altimate_api_key   - Your Altimate API key for AI features ^(optional^)
  echo   altimate_instance  - Your Altimate instance name ^(optional^)
  exit /b 1
)

REM Set environment variables from command line arguments
set DBT_PROJECT_PATH=%~1

if not "%~2"=="" (
  set DBT_PROFILES_PATH=%~2
)

if not "%~3"=="" (
  set ALTIMATE_API_KEY=%~3
)

if not "%~4"=="" (
  set ALTIMATE_INSTANCE=%~4
)

REM Set logging options (optional)
set DBT_MCP_LOG_LEVEL=INFO
set DBT_MCP_LOG_TO_FILE=true
set DBT_MCP_LOG_FILE_PATH=.\dbt-mcp-server.log

REM Print config
echo Starting dbt Power User MCP server with:
echo - Project path: %DBT_PROJECT_PATH%
if defined DBT_PROFILES_PATH (
  echo - Profiles path: %DBT_PROFILES_PATH%
)
if defined ALTIMATE_API_KEY (
  echo - Altimate API key: [REDACTED]
)
if defined ALTIMATE_INSTANCE (
  echo - Altimate instance: %ALTIMATE_INSTANCE%
)
echo.

REM Run the MCP server
call npm run mcp-server 