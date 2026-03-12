# Preview CTEs (Common Table Expressions)

dbt Power User allows you to preview individual CTEs (Common Table Expressions) within your dbt models, making it easier to debug and understand complex queries by examining each component separately.

<div style="position: relative; box-sizing: content-box; max-height: 80vh; max-height: 80svh; width: 100%; aspect-ratio: 1.5470008952551477; padding: 40px 0 40px 0;"><iframe src="https://app.supademo.com/embed/cmc2e5dnokjiqsn1rupca8l9o?embed_v=2" loading="lazy" title="Preview CTE Results using Power User for dbt Extension" allow="clipboard-write" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## What are CTEs?

Common Table Expressions (CTEs) are temporary named result sets that exist within the execution scope of a single SQL statement. They help break down complex queries into more manageable, readable pieces. In dbt, CTEs are often used to organize complex transformations into logical steps.

## Preview Individual CTEs

### Using the CTE Preview Feature

You can preview the results of individual CTEs within your dbt model:

1. **Open your dbt model** in the editor
2. **Locate the CTE** you want to preview
3. **Click on Execute CTE** right above the CTE
