Prevent issues from getting shipped to production! This feature lets you swiftly scan all dbt projects in your workspace, bringing any issues straight to the problems panel. Depending on your team's conventions, we've classified potential discrepancies as warnings or just informational pointers.

What the Scanner Checks For:

### Missing schema.yml Files:

If some models aren’t documented, they'll show up here.
Note: We give seeds or ephemeral models a pass, as they're often traditionally undocumented.

### Undocumented Columns:

For models with a schema.yml but with some columns left undocumented.
This typically points to a mismatch between the actual database model and its documentation. It's more of a heads-up than an error.

### Extra Columns:

Over time, columns might get dropped from models but linger in the schema.yml.Our scanner catches this. Or, maybe it's just a typo in the schema.yml

### Models Absent in the Database:

We'll flag seeds and models missing from the database.
Maybe it's an unused model ripe for removal, or perhaps it’s a fresh model that's yet to make its debut in the database.

<interactive demo of project health check>

<div style="position: relative; padding-bottom: calc(65.63414634146342% + 0px); height: 0;"><iframe src=https://app.supademo.com/embed/clo9cg9382ngfpe83jd8j74vy frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
