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
- **dbt Core**: Direct Python integration
- **dbt Cloud**: API-based integration  
- **dbt Fusion**: Command-line integration
- **Core Command**: CLI wrapper integration

**Key Integration Files**:
- `src/dbt_client/dbtCoreIntegration.ts`
- `src/dbt_client/dbtCloudIntegration.ts`
- `dbt_core_integration.py` (Python bridge)

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