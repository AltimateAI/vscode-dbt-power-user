import { describe, expect, it } from "@jest/globals";
import { Position, Range, TextDocument } from "vscode";
import { DbtDocumentSymbolProvider } from "../../document_symbol_provider/dbtDocumentSymbolProvider";

describe("DbtDocumentSymbolProvider", () => {
  const provider = new DbtDocumentSymbolProvider();

  // Helper function to create a mock TextDocument
  const createMockDocument = (
    content: string,
    languageId = "jinja-sql",
  ): TextDocument => {
    const lines = content.split("\n");

    const positionAt = (offset: number): Position => {
      let currentOffset = 0;
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const lineLength = lines[lineIndex].length;
        if (currentOffset + lineLength >= offset) {
          const character = offset - currentOffset;
          return new Position(lineIndex, character);
        }
        currentOffset += lineLength + 1;
      }
      return new Position(lines.length - 1, lines[lines.length - 1].length);
    };

    return {
      getText: () => content,
      positionAt,
      languageId,
      uri: { fsPath: "/test/model.sql" },
    } as any;
  };

  describe("provideDocumentSymbols", () => {
    it("should return empty for non-SQL files", () => {
      const doc = createMockDocument("SELECT 1", "python");
      const symbols = provider.provideDocumentSymbols(doc, {} as any);
      expect(symbols).toEqual([]);
    });

    it("should return empty for SQL without CTEs", () => {
      const doc = createMockDocument("SELECT * FROM table1");
      const symbols = provider.provideDocumentSymbols(doc, {} as any);
      expect(symbols).toEqual([]);
    });

    it("should detect a single CTE", () => {
      const sql = `WITH cte_orders AS (
  SELECT id, customer_id, amount
  FROM orders
)
SELECT * FROM cte_orders`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      expect(symbols[0].name).toBe("cte_orders");
    });

    it("should detect multiple CTEs", () => {
      const sql = `WITH
  orders AS (
    SELECT id, amount FROM raw_orders
  ),
  customers AS (
    SELECT id, name FROM raw_customers
  )
SELECT * FROM orders JOIN customers ON orders.id = customers.id`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(2);
      expect(symbols[0].name).toBe("orders");
      expect(symbols[1].name).toBe("customers");
    });

    it("should detect columns from SELECT clause", () => {
      const sql = `WITH cte AS (
  SELECT id, name, t.amount AS total_amount
  FROM orders t
)
SELECT * FROM cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      const children = symbols[0].children;
      expect(children.map((c) => c.name)).toEqual([
        "id",
        "name",
        "total_amount",
      ]);
    });

    it("should handle CTEs with comments between them", () => {
      const sql = `WITH
  -- First CTE
  first_cte AS (
    SELECT 1 AS id
  ),
  /* Second CTE */
  second_cte AS (
    SELECT 2 AS id
  )
SELECT * FROM first_cte, second_cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(2);
      expect(symbols[0].name).toBe("first_cte");
      expect(symbols[1].name).toBe("second_cte");
    });

    it("should handle nested subqueries in CTE body", () => {
      const sql = `WITH cte AS (
  SELECT id, (SELECT MAX(amount) FROM payments WHERE payments.order_id = orders.id) AS max_payment
  FROM orders
)
SELECT * FROM cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      expect(symbols[0].name).toBe("cte");
    });

    it("should handle Jinja expressions in SELECT", () => {
      const sql = `WITH cte AS (
  SELECT id, {{ var('column_name') }}, name AS alias_name
  FROM {{ ref('model') }}
)
SELECT * FROM cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      // Jinja column can't be resolved, so only id and alias_name
      const colNames = symbols[0].children.map((c) => c.name);
      expect(colNames).toContain("id");
      expect(colNames).toContain("alias_name");
    });

    it("should handle SELECT *", () => {
      const sql = `WITH cte AS (
  SELECT *
  FROM orders
)
SELECT * FROM cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      expect(symbols[0].children.map((c) => c.name)).toEqual(["*"]);
    });

    it("should handle case-insensitive WITH and AS", () => {
      const sql = `with CTE as (
  select id from orders
)
select * from CTE`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      expect(symbols[0].name).toBe("CTE");
    });

    it("should handle Jinja comments", () => {
      const sql = `WITH
  {# this is a jinja comment #}
  my_cte AS (
    SELECT id FROM orders
  )
SELECT * FROM my_cte`;
      const doc = createMockDocument(sql);
      const symbols = provider.provideDocumentSymbols(doc, {} as any);

      expect(symbols).toHaveLength(1);
      expect(symbols[0].name).toBe("my_cte");
    });
  });

  describe("extractColumnsFromSelect", () => {
    it("should extract simple columns", () => {
      const body = "SELECT id, name, email FROM users";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual(["id", "name", "email"]);
    });

    it("should extract aliased columns", () => {
      const body =
        "SELECT u.id, u.first_name AS name, COUNT(*) AS total FROM users u";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual(["id", "name", "total"]);
    });

    it("should handle quoted aliases", () => {
      const body = 'SELECT id, name AS "Full Name" FROM users';
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual(["id", "Full Name"]);
    });

    it("should handle SELECT DISTINCT", () => {
      const body = "SELECT DISTINCT id, name FROM users";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual(["id", "name"]);
    });

    it("should handle expressions without alias", () => {
      const body = "SELECT COUNT(*), name FROM users";
      const cols = provider.extractColumnsFromSelect(body);
      // COUNT(*) has no alias and isn't a simple column, so only name
      expect(cols).toContain("name");
    });

    it("should handle nested function calls", () => {
      const body =
        "SELECT COALESCE(a.name, b.name) AS full_name, id FROM users";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual(["full_name", "id"]);
    });

    it("should return empty for no SELECT", () => {
      const body = "INSERT INTO orders VALUES (1, 2)";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toEqual([]);
    });

    it("should handle strings with commas", () => {
      const body = "SELECT id, 'hello, world' AS greeting, name FROM users";
      const cols = provider.extractColumnsFromSelect(body);
      expect(cols).toContain("id");
      expect(cols).toContain("greeting");
      expect(cols).toContain("name");
    });
  });
});
