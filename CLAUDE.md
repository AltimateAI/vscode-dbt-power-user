# Claude Code - dbt Power User VSCode Extension Architecture Guide

## Project Overview

**vscode-dbt-power-user** is a comprehensive VSCode extension that makes VSCode seamlessly work with dbt (data build tool). It's an open-source project published by Altimate AI that extends VSCode with advanced dbt features including auto-completion, query preview, lineage visualization, documentation generation, and AI-powered features.

### Key Statistics

- **Version**: 0.57.3
- **Project Type**: VSCode Extension (TypeScript/React)
- **License**: MIT
- **Architecture**: Multi-layered with webview panels, Python integrations, and MCP server

## High-Level Architecture

### 1. Core Extension Architecture

The extension follows a **dependency injection pattern** using Inversify container:

- **Entry Point**: `src/extension.ts` → `DBTPowerUserExtension`
- **DI Container**: `src/inversify.config.ts` manages all service dependencies
- **Main Extension Class**: `DBTPowerUserExtension` orchestrates all components

### 2. Multi-Process Architecture

The extension operates across multiple processes:

1. **Main Extension Process** (Node.js/TypeScript)

   - VSCode API integration
   - File system operations
   - dbt CLI interactions

2. **Webview Panels** (React/TypeScript)

   - Modern React-based UI components
   - Located in `webview_panels/` directory
   - Built with Vite, uses Antd for UI components

3. **Python Bridge Integration**

   - dbt core/cloud integration via Python scripts
   - Key files: `dbt_core_integration.py`, `dbt_cloud_integration.py`
   - Jupyter kernel for notebook functionality

4. **MCP Server** (Model Context Protocol)
   - AI integration and tool calling functionality
   - Located in `src/mcp/`

### 3. Key Module Organization

```
src/
├── manifest/           # dbt project parsing and management
├── dbt_client/        # dbt integration (core, cloud, fusion)
├── webview_provider/  # Webview panel management
├── autocompletion_provider/ # Language server features
├── services/          # Business logic services
├── commands/          # VSCode command implementations
├── mcp/              # Model Context Protocol server
└── telemetry/        # Analytics and tracking
```

## Core Functionality Areas

### 1. dbt Integration Support

**Multiple Integration Types**:

- **dbt Core**: Direct Python integration via Python bridge
- **dbt Cloud**: API-based integration with dbt Cloud services
- **dbt Fusion**: Command-line integration with dbt-fusion CLI
- **Core Command**: CLI wrapper integration for dbt core

**Key Integration Files**:

- `src/dbt_client/dbtCoreIntegration.ts` - dbt Core Python integration
- `src/dbt_client/dbtCloudIntegration.ts` - dbt Cloud API integration
- `src/dbt_client/dbtFusionCommandIntegration.ts` - dbt Fusion CLI integration
- `dbt_core_integration.py` - Python bridge for Core integration

### 2. Language Server Features

**Provider Architecture**: Each feature implemented as a separate provider:

- `autocompletion_provider/` - IntelliSense for dbt models, macros, sources
- `definition_provider/` - Go-to-definition functionality
- `hover_provider/` - Hover information
- `code_lens_provider/` - Inline actions
- `validation_provider/` - SQL validation

### 3. Webview Panel System

**Modern React Architecture** (`webview_panels/`):

- **Build System**: Vite + TypeScript + React 18
- **State Management**: Redux Toolkit
- **UI Framework**: Antd + custom components
- **Data Visualization**: Perspective.js, Plotly.js

**Key Panels**:

- `modules/dataPilot/` - AI chat interface
- `modules/queryPanel/` - Query results and analysis
- `modules/lineage/` - Data lineage visualization
- `modules/documentationEditor/` - Documentation management
- `modules/insights/` - Project insights and actions

### 4. AI and Advanced Features

**DataPilot AI Integration**:

- Chat-based interface for dbt assistance
- Query explanation and optimization
- Documentation generation
- Test suggestions

**MCP Server Integration**:

- Tool calling for dbt operations
- Integration with Claude and other AI models
- Located in `src/mcp/server.ts`

## Build System and Tooling

### 1. Multi-Stage Build Process

**Main Extension Build** (Webpack):

```bash
npm run webpack        # Development build
npm run vscode:prepublish  # Production build
```

**Webview Panels Build** (Vite):

```bash
npm run panel:webviews  # Build React components
```

### 2. Development Workflow

**Key Scripts**:

- `npm run compile` - Compile the code
- `npm run watch` - Development with hot reload
- `npm run test` - Jest-based testing
- `npm run lint` - ESLint + Prettier
- `npm run build-vsix` - Package extension

**Development Environment**:

- Uses VSCode's built-in debugger ("Launch Extension")
- Hot reload for webview panels
- Python environment auto-detection

### 3. Testing Strategy

**Test Configuration** (`jest.config.js`):

- **Unit Tests**: Jest + ts-jest
- **Mock System**: Custom VSCode API mocks
- **Coverage**: Istanbul-based coverage reporting
- **Test Location**: `src/test/` with mock infrastructure

## Key Dependencies and Integrations

### 1. VSCode Extension Dependencies

**Required Extensions**:

- `samuelcolvin.jinjahtml` - Jinja templating support
- `ms-python.python` - Python environment integration
- `altimateai.vscode-altimate-mcp-server` - MCP server

### 2. Major Technical Dependencies

**Backend (Node.js)**:

- `inversify` - Dependency injection
- `python-bridge` - Python process communication
- `zeromq` - Jupyter kernel communication
- `@modelcontextprotocol/sdk` - MCP protocol

**Frontend (React)**:

- `react` 18 + `react-dom`
- `@reduxjs/toolkit` - State management
- `antd` - UI component library
- `@finos/perspective` - Data grid and visualization

### 3. Python Integration

**Python Scripts**:

- `dbt_core_integration.py` - Core dbt operations
- `dbt_cloud_integration.py` - Cloud API operations
- `dbt_healthcheck.py` - Project health analysis
- `altimate_notebook_kernel.py` - Jupyter integration

## Configuration and Extensibility

### 1. Extension Configuration

**Comprehensive Settings** (190+ configuration options):

- dbt integration mode selection
- Query limits and templates
- AI features and endpoints
- Lineage visualization options
- Defer-to-production configuration

### 2. Language Support

**File Type Associations**:

- `jinja-sql` - Primary dbt model files
- `jinja-yaml` - dbt configuration files
- `jinja-md` - Documentation files
- Custom notebook format (`.notebook`)

### 3. Command System

**80+ Commands Available**:

- Model execution (`dbtPowerUser.runCurrentModel`)
- Documentation generation (`dbtPowerUser.generateSchemaYML`)
- Query analysis (`dbtPowerUser.sqlLineage`)
- AI assistance (`dbtPowerUser.openDatapilotWithQuery`)

## Deployment and Distribution

### 1. Multi-Platform Distribution

**CI/CD Pipeline** (`.github/workflows/ci.yml`):

- **Build Matrix**: macOS, Ubuntu, Windows
- **Visual Studio Marketplace**: Primary distribution
- **OpenVSX Registry**: Open-source alternative
- **Platform-specific builds**: Architecture-aware packaging

### 2. Release Process

**Automated Release**:

- Git tag triggers release pipeline
- Pre-release and stable channel support
- Slack notifications for release status
- VSIX package generation

## Development Guidelines

### 1. Code Organization Principles

- **Dependency Injection**: All services use Inversify DI
- **Provider Pattern**: Language features as modular providers
- **Event-Driven**: Manifest changes trigger updates across components
- **Separation of Concerns**: Clear boundaries between UI, business logic, and dbt integration

### 2. Adding New Features

**For Language Features**:

1. Create provider in appropriate `*_provider/` directory
2. Register in `inversify.config.ts`
3. Wire up in `DBTPowerUserExtension`

**For UI Features**:

1. Add React component in `webview_panels/src/modules/`
2. Update routing in `AppRoutes.tsx`
3. Add state management slice if needed

**For dbt Integration**:

1. Extend appropriate dbt client (`dbtCoreIntegration.ts` etc.)
2. Add Python bridge function if needed
3. Update MCP server tools if AI-accessible

### 3. Testing Approach

- **Unit Tests**: Mock VSCode APIs and dependencies
- **Integration Tests**: Test with real dbt projects
- **Manual Testing**: Use "Launch Extension" debug configuration
- **Webview Testing**: Storybook for component development

## Common Development Patterns

### 1. Manifest-Driven Architecture

The extension heavily relies on dbt's `manifest.json` for understanding project structure. Most features key off manifest parsing events.

### 2. Multi-Integration Support

Always consider how features work across dbt core, cloud, and other integration types. Use strategy pattern for integration-specific behavior.

### 3. Webview Communication

Uses VSCode's webview messaging system with typed message contracts. State is synchronized between extension and webview contexts.

### 4. Python Bridge Pattern

For dbt operations requiring Python, use the established bridge pattern with JSON serialization and error handling.

This architecture enables the extension to provide comprehensive dbt development support while maintaining modularity and extensibility for future enhancements.

---

# User Guide

## Core Features Overview

The dbt Power User extension accelerates dbt and SQL development by 3x through three key phases:

### 🔧 DEVELOP

- **SQL Visualizer**: Visual query builder and analyzer
- **Query Explanation**: AI-powered SQL query explanation
- **Auto-generation**: Generate dbt models from sources or raw SQL
- **Auto-completion**: IntelliSense for dbt models, macros, sources, and doc blocks
- **Click to Run**: Execute models directly from editor
- **Query Translation**: Translate SQL between different dialects
- **Compiled SQL Preview**: View compiled dbt code before execution

### 🧪 TEST

- **Query Results Preview**: Execute and analyze query results with export capabilities
- **Test Generation**: AI-powered test generation for dbt models
- **Column Lineage**: Detailed data lineage with code visibility
- **Defer to Production**: Run models without rebuilding dependencies
- **SQL Validation**: Validate SQL without execution
- **Model Lineage**: Visual representation of model dependencies

### 🤝 COLLABORATE

- **Documentation Generation**: AI-powered documentation creation
- **Code Collaboration**: Discussion threads on code and documentation
- **Project Governance**: Automated checks for code quality and standards
- **SaaS UI Integration**: Web-based interface for dbt docs and lineage
- **Query History & Bookmarks**: Track and share query executions
- **Export Workflows**: Share lineage and documentation externally

## DataMates AI Integration

The extension includes **AI Teammates** through the DataMates Platform:

- **Coaching**: Personalize AI teammates for specific requirements
- **Query Assistance**: AI-powered query explanation and optimization
- **Documentation**: Automated documentation generation
- **Test Suggestions**: Smart test recommendations
- **SQL Translation**: Cross-dialect SQL conversion

## Feature Availability

**Free Extension Features**:

- SQL Visualizer, Model-level lineage, Auto-generation from sources
- Auto-completion, Click to Run, Compiled SQL preview
- Query results preview, Defer to production, SQL validation

**With Altimate AI Key** (free signup at [app.myaltimate.com](https://app.myaltimate.com)):

- Column-level lineage, Query explanation AI, Query translation AI
- Auto-generation from SQL, Test generation AI, Documentation generation AI
- Code/documentation collaboration, Lineage export, SaaS UI
- Project governance, Query history & bookmarks

---

# Installation and Setup

## Installation Methods

### Native Installation

Install directly from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user) or via VS Code:

1. Open VS Code Extensions panel (`Ctrl+Shift+X`)
2. Search for "dbt Power User"
3. Click Install
4. Reload VS Code if prompted

### Dev Container Installation

Add to your `.devcontainer/devcontainer.json`:

```json
{
  "customizations": {
    "vscode": {
      "files.associations": {
        "*.yaml": "jinja-yaml",
        "*.yml": "jinja-yaml",
        "*.sql": "jinja-sql",
        "*.md": "jinja-md"
      },
      "extensions": ["innoverio.vscode-dbt-power-user"]
    }
  }
}
```

### Cursor IDE Support

The extension is also available for [Cursor IDE](https://www.cursor.com/how-to-install-extension). Install the same way as VS Code.

## Required Configuration

### 1. dbt Integration Setup

Configure how the extension connects to dbt:

- **dbt Core**: For local dbt installations with Python bridge (default)
- **dbt Cloud**: For dbt Cloud API integration
- **dbt Fusion**: For dbt-fusion CLI integration
- **dbt Core Command**: For CLI-based dbt core integration

Set via `dbt.dbtIntegration` setting.

#### dbt Fusion Integration

dbt Fusion is a command-line interface that provides enhanced dbt functionality. When using fusion integration:

- Requires dbt-fusion CLI to be installed in your environment
- Extension automatically detects fusion installation via `dbt --version` output
- Provides full feature support including query execution, compilation, and catalog operations
- Uses JSON log format for structured command output parsing

### 2. Python Environment

Ensure Python and dbt are properly installed and accessible. The extension will auto-detect your Python environment through the VS Code Python extension.

### 3. Optional: Altimate AI Key

For advanced AI features, get a free API key:

1. Sign up at [app.myaltimate.com/register](https://app.myaltimate.com/register)
2. Add API key to `dbt.altimateAiKey` setting
3. Set instance name in `dbt.altimateInstanceName` setting

## Project Setup

1. Open your dbt project folder in VS Code
2. Run the setup wizard: Select "dbt" in bottom status bar → "Setup Extension"
3. The extension will auto-install dbt dependencies if enabled
4. Verify setup via Command Palette → "dbt Power User: Diagnostics"

---

# Troubleshooting for Developers

## Quick Diagnostics

### 1. Setup Wizard

Use the built-in setup wizard for automated issue detection:

- Click "dbt" or "dbt is not installed" in bottom status bar
- Select "Setup Extension"
- Follow guided setup process

### 2. Diagnostics Command

Run comprehensive system diagnostics:

- Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
- Type "diagnostics" → Select "dbt Power User: Diagnostics"
- Review output for environment issues, Python/dbt installation status, and connection problems

### 3. Problems Panel

Check VS Code Problems panel for dbt project issues:

- View → Problems (or `Ctrl+Shift+M`)
- Look for dbt-related validation errors

## Debug Logging

Enable detailed logging for troubleshooting:

1. Command Palette → "Set Log Level" → "Debug"
2. View logs: Output panel → "Log" dropdown → "dbt"
3. Reproduce the issue to capture debug information

## Developer Tools

For advanced debugging:

- Help → Toggle Developer Tools
- Check console for JavaScript errors and detailed logs

## Common Issues

**Extension not recognizing dbt project**:

- Verify `dbt_project.yml` exists in workspace root
- Check Python environment has dbt installed
- Run diagnostics command for detailed analysis

**Python/dbt not found**:

- Configure Python interpreter via VS Code Python extension
- Verify dbt is installed in selected Python environment
- Set `dbt.dbtPythonPathOverride` if using custom Python path

**Connection issues**:

- Verify database connection in dbt profiles
- Check firewall/network settings
- Review connection details in diagnostics output

## Getting Help

- Join [#tools-dbt-power-user](https://getdbt.slack.com/archives/C05KPDGRMDW) in dbt Community Slack
- Contact support at [altimate.ai/support](https://www.altimate.ai/support)
- Use in-extension feedback widgets for feature-specific issues

---

# Core Development Features

## Auto-completion and Navigation

### Model Auto-completion

- **Smart IntelliSense**: Auto-complete model names with `ref()` function
- **Go-to-Definition**: Navigate directly to model files
- **Hover Information**: View model details on hover

### Macro Support

- **Macro Auto-completion**: IntelliSense for custom and built-in macros
- **Parameter Hints**: Auto-complete macro parameters
- **Definition Navigation**: Jump to macro definitions

### Source Integration

- **Source Auto-completion**: IntelliSense for configured sources
- **Column Awareness**: Auto-complete source column names
- **Schema Navigation**: Navigate to source definitions

### Documentation Blocks

- **Doc Block Auto-completion**: IntelliSense for documentation references
- **Definition Linking**: Navigate to doc block definitions

## Query Development

### SQL Compilation and Preview

- **Compiled Code View**: See final SQL before execution
- **Template Resolution**: Preview Jinja templating results
- **Syntax Highlighting**: Enhanced SQL syntax highlighting for dbt files

### Query Execution

- **Preview Results**: Execute queries with `Cmd+Enter` / `Ctrl+Enter`
- **Result Analysis**: Export results as CSV, copy as JSON
- **Query History**: Track executed queries
- **Configurable Limits**: Set row limits for query previews (default: 500 rows)

### SQL Formatting

- **Auto-formatting**: Integration with sqlfmt
- **Custom Parameters**: Configure formatting rules
- **Batch Processing**: Format multiple files

## AI-Powered Development

### Query Explanation

- **Natural Language**: Get plain English explanations of complex SQL
- **Step-by-step Analysis**: Breakdown of query logic
- **Performance Insights**: Query optimization suggestions

### Code Generation

- **Model from Source**: Generate base models from source tables
- **Model from SQL**: Convert raw SQL to dbt models
- **Test Generation**: AI-powered test suggestions
- **Documentation Generation**: Auto-generate model documentation

### Query Translation

- **Cross-dialect Support**: Translate SQL between database dialects
- **Syntax Adaptation**: Handle dialect-specific functions and syntax

## Documentation

This is a MkDocs-based documentation site for the dbt Power User VSCode Extension by Altimate AI. The site uses the Material theme and is organized around user workflows: Develop, Test, and Collaborate.

### Development Commands

- **Install dependencies**: `pip install --requirement documentation/requirements.txt`
- **Start development server**: `cd documentation; mkdocs serve` (serves at http://127.0.0.1:8000)
- **Build site**: `cd documentation; mkdocs build`
- **Deploy to GitHub Pages**: `cd documentation; mkdocs gh-deploy`

### Architecture

#### Content Organization

- `documentation/docs/` contains all documentation content in Markdown format
- Content is organized by feature areas: `setup/`, `develop/`, `test/`, `document/`, `govern/`, `discover/`, `teammates/`, `datamates/`, `arch/`
- Images and assets are stored within feature-specific directories
- `documentation/mkdocs.yml` contains all site configuration

#### Key Configuration Files

- `documentation/mkdocs.yml`: Main site configuration including navigation, theme settings, and plugins
- `documentation/requirements.txt`: Python dependencies for MkDocs and plugins
- `documentation/docs/overrides/`: Custom theme overrides (currently empty)
- `documentation/docs/javascripts/`: Custom JavaScript for enhanced functionality

#### Theme Configuration

The site uses Material theme with:

- Custom Altimate AI branding and colors
- Google Analytics integration (G-LXRSS3VK5N)
- Git revision date tracking via plugin
- Built-in feedback system
- Dark/light mode support

#### Navigation Structure

Navigation follows a three-phase user journey:

1. **Setup**: Installation and configuration
2. **Develop**: Core development features
3. **Test**: Testing and validation tools
4. **Additional**: Documentation, collaboration, discovery, and AI features

### Working with Content

#### Adding New Pages

1. Create `.md` files in the appropriate `docs/` subdirectory
2. Update the `nav` section in `mkdocs.yml` to include the new page
3. Follow existing naming conventions for consistency

#### Images and Assets

- Store images in the same directory as the referencing markdown file
- Use relative paths for image references
- Common assets go in `docs/assets/`

#### Internal Links

Use relative markdown links to reference other pages. The site has extensive cross-referencing between related features.

### Testing Changes

Always test locally with `mkdocs serve` before deploying. The development server provides live reload for content changes.
