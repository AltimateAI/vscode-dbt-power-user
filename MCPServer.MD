# MCP (Model Context Protocol) Server Integration

## Overview
The MCP (Model Context Protocol) server integration enables seamless communication between Cursor IDE's AI capabilities and dbt functionality. This integration allows AI-powered features to interact with dbt projects programmatically through a standardized protocol.

## System Architecture Overview

### High-Level Components
1. **Cursor IDE**: The client application that initiates requests through AI interactions
2. **MCP Server**: The bridge between Cursor IDE and dbt functionality
3. **dbt Power User Extension**: Provides dbt-specific functionality and tools
4. **dbt Project**: The underlying dbt project being managed

### Communication Flow
1. User interacts with Cursor IDE's AI features
2. AI generates tool requests through MCP protocol
3. MCP Server processes requests using registered tools
4. Tools interact with dbt project through dbt Power User Extension
5. Results are sent back to Cursor IDE through SSE transport

### Architecture Diagram
```mermaid
graph TD
    A[Cursor IDE] <--> |MCP Protocol| B[MCP Server]
    B <--> |Internal API| C[dbt Power User Extension]
    C <--> |dbt Commands| D[dbt Project]
    
    subgraph MCP Server Components
        E[SSE Server Transport]
        F[Express Server]
        G[Tool Registry]
        L[Event Emitter]
        M[State Management]
    end
    
    B --> E
    B --> F
    B --> G
    G --> L
    G --> M
    
    subgraph Tools
        H[Project Management]
        I[Model Operations]
        J[Query Execution]
        K[Package Management]
    end
    
    G --> H
    G --> I
    G --> J
    G --> K

    subgraph Event System
        N[Telemetry Service]
        O[Error Handler]
        P[State Updates]
    end

    L --> N
    L --> O
    M --> P
```

### Core Features
1. **Tool Registry**: Exposes dbt functionality through standardized tools
2. **Real-time Communication**: Uses SSE for live updates and responses
3. **State Management**: Maintains server and connection state
4. **Error Handling**: Comprehensive error management and telemetry
5. **Security**: Local-only communication with request validation

### Available Tool Categories
1. **Project Management**: Project discovery and configuration
2. **Model Operations**: Compilation, running, and testing models
3. **Query Execution**: SQL execution and data retrieval
4. **Package Management**: Managing dbt packages and dependencies

## Technical Implementation Details

### 1. MCP Server (DbtPowerUserMcpServer)
- **Core Implementation**:
  ```typescript
  @provideSingleton(DbtPowerUserMcpServer)
  export class DbtPowerUserMcpServer implements Disposable {
    private mcpServer: Server;
    private mcpTransport: SSEServerTransport;
    private port: number;

    constructor(
      private dbtPowerUserMcpServerTools: DbtPowerUserMcpServerTools,
      private dbtTerminal: DBTTerminal,
      private altimate: AltimateRequest,
      private emitterService: SharedStateService,
      private telemetry: TelemetryService,
      private dbtProjectContainer: DBTProjectContainer,
    ) {
      // Server initialization logic
    }
  }
  ```

- **Key Features**:
  - **Dynamic Port Allocation**: Uses port-finder utility to avoid conflicts
  - **Lifecycle Management**: Implements Disposable interface for cleanup
  - **Configuration Management**: Handles `.cursor/mcp.json` updates
  - **SSE Transport**: Implements Server-Sent Events for real-time communication

### 2. Tool Registry (DbtPowerUserMcpServerTools)
- **Implementation Details**:
  ```typescript
  @provideSingleton(DbtPowerUserMcpServerTools)
  export class DbtPowerUserMcpServerTools implements Disposable {
    private tools: Map<string, Tool>;
    
    constructor() {
      this.registerTools();
    }

    private registerTools() {
      // Tool registration logic
    }
  }
  ```

### 3. Communication Protocol

#### Request Format
```typescript
interface ToolRequest {
  name: string;
  arguments: Record<string, unknown>;
  requestId: string;
}
```

#### Response Format
```typescript
interface ToolResponse {
  content: Array<{
    type: "text" | "error";
    text: string;
  }>;
  isError?: boolean;
  error?: Error;
}
```

## Tool Implementations

### 1. Project Information Tools

#### `get_projects`
**Description**: Returns list of available dbt project root paths  
**Parameters**: None  
**Example**:
```json
{"name": "get_projects"}
```

#### `get_project_name`
**Description**: Get project name  
**Parameters**:
- `projectRoot` (string) - Path to project root

#### `get_selected_target`
**Description**: Get currently selected target  
**Parameters**:
- `projectRoot` (string)

#### `get_target_names`
**Description**: List available target names  
**Parameters**:
- `projectRoot` (string)

### 2. Schema Inspection Tools

#### `get_columns_of_model`
**Description**: Get column metadata for a model  
**Parameters**:
- `projectRoot` (string)
- `modelName` (string)

#### `get_columns_of_source`
**Description**: Get column metadata for a source  
**Parameters**:
- `projectRoot` (string)
- `sourceName` (string)
- `tableName` (string)

#### `get_column_values`
**Description**: Get distinct values from a column  
**Parameters**:
- `projectRoot` (string)
- `model` (string)
- `column` (string)

### 3. Compilation & Execution Tools

#### `compile_model`
**Description**: Compile a model to raw SQL  
**Parameters**:
- `projectRoot` (string) 
- `modelName` (string)

#### `execute_sql_with_limit`
**Description**: Execute SQL query with row limit  
**Parameters**:
- `projectRoot` (string)
- `query` (string)
- `modelName` (string)
- `limit` (number)

**Example**:
```json
{
  "name": "execute_sql_with_limit",
  "arguments": {
    "projectRoot": "/path/to/project",
    "query": "SELECT * FROM customers",
    "modelName": "dim_customers",
    "limit": 100
  }
}
```

#### `compile_query`
**Description**: Compile raw query with Jinja  
**Parameters**:
- `projectRoot` (string)
- `query` (string)
- `originalModelName` (string, optional)

### 4. Model Operations

#### `run_model`
**Description**: Run model with dependency selection  
**Parameters**:
- `projectRoot` (string)
- `plusOperatorLeft` ("" or "+")
- `modelName` (string) 
- `plusOperatorRight` ("" or "+")

#### `build_model`
**Description**: Build model with dependencies  
**Parameters**: Same as `run_model`

### 5. Testing Tools

#### `run_test`
**Description**: Run specific test by name  
**Parameters**:
- `projectRoot` (string)
- `testName` (string)

#### `run_model_test`
**Description**: Run tests for a model  
**Parameters**:
- `projectRoot` (string)
- `modelName` (string)

### 6. Dependency Management

#### `install_dbt_packages`
**Description**: Install specified packages  
**Parameters**:
- `projectRoot` (string)
- `packages` (array of strings)

#### `install_deps`
**Description**: Install all dependencies  
**Parameters**:
- `projectRoot` (string)

### 7. Lineage Tools

#### `get_children_models`
**Description**: Get downstream dependencies  
**Parameters**:
- `projectRoot` (string)
- `table` (string)

#### `get_parent_models`
**Description**: Get upstream dependencies  
**Parameters**:
- `projectRoot` (string)
- `table` (string)

### 8. Path Information

Tools for retrieving project paths (`get_target_path`, `get_manifest_path`, etc.) share similar parameters:
- `projectRoot` (string)
- Returns: String path

**Available Path Tools**:
- `get_target_path`
- `get_package_install_path` 
- `get_model_paths`
- `get_seed_paths`
- `get_macro_paths`
- `get_manifest_path`
- `get_catalog_path`

### 9. Environment Info

#### `get_dbt_version`
**Description**: Get installed dbt version  
**Parameters**:
- `projectRoot` (string)

#### `get_adapter_type`
**Description**: Get database adapter type  
**Parameters**: 
- `projectRoot` (string)

## Setup and Configuration

### 1. Server Initialization
```typescript
// Server initialization
const port = await findAvailablePort();
const app = express();
app.listen(port, () => {
  this.port = port;
  this.updatePortInCursorMcpSettings(port);
});
```

### 2. Configuration File
```json
{
  "mcpServers": {
    "dbtPowerUser": {
      "url": "http://localhost:3000/sse",
      "capabilities": ["tools", "prompts", "resources"]
    }
  }
}
```

## Security and Error Handling

### 1. Security Implementation
```typescript
const isLocalRequest = (req: express.Request): boolean => {
  return req.hostname === 'localhost' || req.hostname === '127.0.0.1';
};

const validateRequest = (req: ToolRequest): void => {
  if (!req.name || typeof req.name !== 'string') {
    throw new MCPError('Invalid tool name', 'INVALID_TOOL');
  }
  // Additional validation
};
```

### 2. Error Management
```typescript
enum MCPErrorCode {
  SERVER_START_FAILED = 'SERVER_START_FAILED',
  TOOL_NOT_FOUND = 'TOOL_NOT_FOUND',
  INVALID_REQUEST = 'INVALID_REQUEST',
  EXECUTION_ERROR = 'EXECUTION_ERROR'
}

private logError(error: MCPError): void {
  this.telemetry.sendTelemetryEvent(TelemetryEvents["MCP/Error"], {
    code: error.code,
    message: error.message,
    details: JSON.stringify(error.details)
  });
}
```

## Performance and Best Practices

### 1. Caching Strategy
```typescript
class ToolCache {
  private cache: Map<string, CacheEntry>;
  private readonly TTL: number = 5 * 60 * 1000; // 5 minutes
  
  public get(key: string): CacheEntry | undefined {
    // Cache retrieval logic
  }
}
```

### 2. Request Batching
```typescript
class RequestBatcher {
  private queue: ToolRequest[] = [];
  private batchSize: number = 10;
  
  public async processBatch(): Promise<void> {
    // Batch processing logic
  }
}
```

## Testing and Quality Assurance

### 1. Unit Testing
```typescript
describe('MCPServer', () => {
  it('should start server on available port', async () => {
    // Test implementation
  });
});
```

### 2. Integration Testing
```typescript
describe('Tool Execution', () => {
  it('should execute dbt commands', async () => {
    // Test implementation
  });
});
```

## API Reference

### Tool Registry API
```typescript
interface ToolRegistry {
  registerTool(tool: Tool): void;
  getTool(name: string): Tool | undefined;
  listTools(): Tool[];
}
```

### Server API
```typescript
interface MCPServer {
  start(): Promise<number>;
  stop(): Promise<void>;
  handleRequest(req: ToolRequest): Promise<ToolResponse>;
}
```

### Event System
```typescript
interface EventSystem {
  emit(event: string, data: unknown): void;
  on(event: string, handler: (data: unknown) => void): void;
}
```

## Contributing Guidelines

### 1. Code Style
```typescript
class NewTool extends BaseTool {
  public readonly name = 'new_tool';
  
  public async execute(params: unknown): Promise<ToolResponse> {
    // Implementation
  }
}
```

### 2. Documentation Requirements
- API documentation using TypeDoc
- Inline comments for complex logic
- Update README.md with new features

### 3. Testing Requirements
- Unit tests for new tools
- Integration tests for new features
- Performance benchmarks for optimizations 
