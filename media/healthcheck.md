#### Prevent issues from getting shipped to production!

Scan your entire dbt project to identify issues like missing documentation, missing columns / models in the database and many other configuration issues. Our new feature lets you swiftly scan all dbt projects in your workspace, bringing any issues straight to the problems panel. Depending on your team's conventions, we've classified potential discrepancies as warnings or just informational pointers.

#### What the Scanner Checks For:

- **Missing schema.yml Files**:

  - If some models aren’t documented, they'll show up here.
  - _Note_: We give seeds or ephemeral models a pass, as they're often traditionally undocumented.

- **Undocumented Columns**:

  - For models with a schema.yml but with some columns left undocumented.
  - This typically points to a mismatch between the actual database model and its documentation. It's more of a heads-up than an error.

- **Extra Columns**:

  - Over time, columns might get dropped from models but linger in the schema.yml.
  - Our scanner catches this. Or, maybe it's just a typo in the schema.yml

- **Models Absent in the Database**:
  - We'll flag seeds and models missing from the database.
  - Maybe it's an unused model ripe for removal, or perhaps it’s a fresh model that's yet to make its debut in the database.

![projectscan](./images/project-scan.gif)
