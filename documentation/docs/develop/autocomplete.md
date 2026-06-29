dbt-power user extension auto-completes model, macro, column names in the VSCode

## Models

a) Autocomplete model

![Autocomplete model](images/autocompleteModel.gif)

b) Go to model definition

![Go to model definition](images/definitionModel.gif)

## Macros

/// details | a) Autocomplete macro

![Autocomplete macro](images/autocompleteMacro.gif)

///

/// details | b) Go to macro definition

![Go to macro definition](images/definitionMacro.gif)

///

## Sources

/// details | a) Autocomplete source

![Autocomplete source](images/autocompleteSource.gif)

///

/// details | b) Go to source definition

![Go to source definition](images/definitionSource.gif)

///

## Doc blocks

/// details | a) Autocomplete doc block

![Autocomplete doc block](images/autocompleteDoc.gif)

///

/// details | b) Go to doc block definition

![Go to doc block definition](images/definitionDoc.gif)

///

## Hover actions

Hover tooltips expose **Altimate Code** action links so you can ask AI questions about whatever symbol you're inspecting without leaving the file. Clicking an action opens the Altimate Code chat beside the editor with a pre-filled prompt.

### Model hover — `ref('model_name')`

- ✨ **Explain transformation** — walks through selects, filters, joins, and aggregations step by step.

![Hover popup on a ref('model_name') showing the "Explain transformation" Altimate Code action](images/hoverActionsModel.png)

### Macro hover — `{{ macro_name(...) }}`

- ✨ **Explain what this macro does** — explains purpose, parameters, and usage.
- ⚠️ **Find risky usages** — analyzes missing args, wrong types, edge cases, and anti-patterns.

![Hover popup on a macro call showing "Explain what this macro does" and "Find risky usages"](images/hoverActionsMacro.png)

/// admonition | Looking for column-level hover actions?
    type: tip

When you hover a column's `name:` value in `schema.yml`, two more Altimate Code actions appear — ✏️ **Suggest description** and 🧪 **Suggest tests**. Those live with the doc-generation flow on the [Generate documentation](../document/generatedoc.md#single-column-hover-shortcut) page.
///

/// admonition | Hover actions delegate to the Datamates extension
    type: info

Like all Altimate Code surfaces, hover actions open the chat panel provided by the **Datamates** extension (`altimateai.vscode-altimate-mcp-server`), which is installed as a dependency of dbt Power User. The bundled chat handles BYOK or [Altimate LLM Gateway](../arch/llm-gateway.md) routing.
///
