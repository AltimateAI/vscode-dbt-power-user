To specify project folders explicitly and control which projects are included in the build process, you can configure the `dbt.allowListFolders` setting.

This can be particularly useful when you have a large number of projects in the same workspace. You can define workspace-relative paths to include as follows:

```json
"dbt.allowListFolders": [
  "folder1",
  "folder2"
]

```

If this setting is not specified or is left empty, no filtering will be applied, and all projects will be parsed.
