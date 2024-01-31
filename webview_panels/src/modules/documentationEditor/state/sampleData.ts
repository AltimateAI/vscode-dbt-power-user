export const DATA = {
  aiEnabled: true,
  name: "customers",
  patchPath: "jaffle_shop2://models/schema.yml",
  description:
    "This table has basic information about a customer, as well as some derived facts based on a customer's orders",
  generated: false,
  columns: [
    {
      name: "customer_id",
      description: "This is a unique identifier for a customer",
      generated: false,
      source: "YAML",
    },
    {
      name: "first_name",
      description: "Customer's first name. PII.",
      generated: false,
      source: "YAML",
    },
    {
      name: "last_name",
      description: "Customer's last name. PII.",
      generated: false,
      source: "YAML",
    },
    {
      name: "first_order",
      description: "Date (UTC) of a customer's first order",
      generated: false,
      source: "YAML",
    },
    {
      name: "most_recent_order",
      description: "Date (UTC) of a customer's most recent order",
      generated: false,
      source: "YAML",
    },
    {
      name: "number_of_orders",
      description: "Count of the number of orders a customer has placed",
      generated: false,
      source: "YAML",
    },
    {
      name: "customer_lifetime_value",
      description: "",
      generated: false,
      source: "YAML",
    },
  ],
};
export const PROJECT = "jaffle_shop";
