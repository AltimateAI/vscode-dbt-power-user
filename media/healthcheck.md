#### Project Health Check - Before you commit changes to production, scan your entire dbt project to identify following issues:

- **Undocumented Models - Missing schema.yml files**
- **Undocumented Columns - Columns missing in schema.yml files**
- **Extra Columns - Columns no present in model but specified in schema.yml files**
- **Seeds and Models Absent in the Database**

![projectscan](./images/project-scan.gif)
