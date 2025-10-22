# Model Capitalization Issue - Analysis and Workaround

## Issue Description
When a dbt model file is renamed with only capitalization changes (e.g., `myModel.sql` → `MyModel.sql`), the dbt Power User extension may fail to run/compile the model because:

1. The extension correctly uses the new filename from the file system
2. However, dbt's manifest.json still contains the old model name with the old capitalization
3. dbt uses the manifest to find models, not the file system directly

## Root Cause
This is a limitation in how dbt handles model renames:
- dbt doesn't automatically detect file renames that only change capitalization
- The manifest.json needs to be rebuilt for dbt to recognize the new name
- The extension uses `basename(filepath, ".sql")` to extract model names, which gives the current filename, not the name in the manifest

## Current Workaround
When encountering this issue, users should:

1. Run `dbt parse` or `dbt compile` from the command line to rebuild the manifest
2. Or use the "dbt Power User: Rebuild Models" command in VS Code
3. The extension will then use the updated manifest with the correct model name

## Why a Code Fix is Complex
A proper fix would require:
1. The extension to maintain a mapping between file paths and manifest model names
2. Case-insensitive lookups when model names don't match exactly
3. Automatic manifest rebuilds when case-only renames are detected
4. Handling of models in subdirectories where the model name may include namespace prefixes

## Recommendation
For now, document this as a known limitation and educate users about the need to rebuild the manifest after renaming files with case-only changes.