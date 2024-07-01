import type { Meta } from "@storybook/react";
import QueryPanelProvider from "./QueryPanelProvider";
import { Button, Stack } from "@uicore";
import {
  QueryBookmarkFactory,
  QueryHistoryFactory,
} from "../../testUtils/queryResults";
import { TenantUserFactory } from "@testUtils";
import { panelLogger } from "@modules/logger";

const meta = {
  title: "Query Panel",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

const ActionButton = ({
  data,
  title,
}: {
  data: { command: string } & Record<string, unknown>;
  title: string;
}) => {
  const handleAction = () => {
    window.postMessage(data);
  };
  return <Button onClick={handleAction}>{title}</Button>;
};

const user = TenantUserFactory.build();
export const DefaultQueryPanelView = {
  render: (): JSX.Element => {
    return (
      <div>
        <Stack className="mb-4">
          <ActionButton
            data={{ command: "renderLoading" }}
            title="Start loading"
          />
          <ActionButton
            data={{
              command: "renderQuery",
              raw_sql: "select * from {{ref'users'}}",
              compiled_sql: "select * from users",
              rows: [{ x: 0, y: false, z: null }],
              columnNames: ["x", "y", "z"],
              columnTypes: ["Integer", "Boolean", "String"],
            }}
            title="Render query results"
          />
          <ActionButton
            data={{
              command: "renderError",
              error: {
                code: -1,
                message:
                  'Runtime Error\n  Binder Error: Referenced column "001234" not found in FROM clause!\n  Candidate bindings: "customers.last_name"',
                data: '"Error: Runtime Error\\n  Binder Error: Referenced column \\"001234\\" not found in FROM clause!\\n  Candidate bindings: \\"customers.last_name\\"\\n\\tat DBTCoreProjectIntegration.<anonymous> (/Users/saravanan/projects/altimate/vscode-dbt-power-user/dist/extension.js:43336:31)\\n\\tat Generator.throw (<anonymous>)\\n\\tat rejected (/Users/saravanan/projects/altimate/vscode-dbt-power-user/dist/extension.js:54735:65)"',
              },
              raw_sql:
                "with customers as (\n\n    select * from {{ ref('stg_customers') }}\n\n),\n\norders as (\n\n    select * from {{ ref('stg_orders') }}\n\n),\n\npayments as (\n\n    select * from {{ ref('stg_payments') }}\n\n),\n\ncustomer_orders as (\n\n        select\n        customer_id,\n\n        min(order_date) as first_order,\n        max(order_date) as most_recent_order,\n        count(order_id) as number_of_orders\n    from orders\n\n    group by customer_id\n\n),\n\ncustomer_payments as (\n\n    select\n        orders.customer_id,\n        sum(amount) as total_amount\n\n    from payments\n\n    left join orders on\n         payments.order_id = orders.order_id\n\n    group by orders.customer_id\n\n),\n\nfinal as (\n\n    select\n        \"001234\" as leading_zero,\n        214748364710 as positive_big_int, 214748364723*(-1) as negative_big_int, ROUND(12/9,3) as float_precision,\n        214748364710 as positive_big_int1, 214748364723*(-1) as negative_big_int1, ROUND(12/9,3) as float_precision1,\n        214748364710 as positive_big_int2, 214748364723*(-1) as negative_big_int2, ROUND(12/9,3) as float_precision2,\n        customers.customer_id,\n        customers.first_name,\n        customers.last_name,\n        customer_orders.first_order,\n        customer_orders.most_recent_order,\n        customer_orders.number_of_orders,\n        customer_payments.total_amount as customer_lifetime_value\n\n    from customers\n\n    left join customer_orders\n        on customers.customer_id = customer_orders.customer_id\n\n    left join customer_payments\n        on  customers.customer_id = customer_payments.customer_id\n\n)\n\nselect * from final\n",
              compiled_sql:
                '\n  \n    select *\n    from (\n        with customers as (\n\n    select * from "jaffle_shop"."main"."stg_customers"\n\n),\n\norders as (\n\n    select * from "jaffle_shop"."main"."stg_orders"\n\n),\n\npayments as (\n\n    select * from "jaffle_shop"."main"."stg_payments"\n\n),\n\ncustomer_orders as (\n\n        select\n        customer_id,\n\n        min(order_date) as first_order,\n        max(order_date) as most_recent_order,\n        count(order_id) as number_of_orders\n    from orders\n\n    group by customer_id\n\n),\n\ncustomer_payments as (\n\n    select\n        orders.customer_id,\n        sum(amount) as total_amount\n\n    from payments\n\n    left join orders on\n         payments.order_id = orders.order_id\n\n    group by orders.customer_id\n\n),\n\nfinal as (\n\n    select\n        "001234" as leading_zero,\n        214748364710 as positive_big_int, 214748364723*(-1) as negative_big_int, ROUND(12/9,3) as float_precision,\n        214748364710 as positive_big_int1, 214748364723*(-1) as negative_big_int1, ROUND(12/9,3) as float_precision1,\n        214748364710 as positive_big_int2, 214748364723*(-1) as negative_big_int2, ROUND(12/9,3) as float_precision2,\n        customers.customer_id,\n        customers.first_name,\n        customers.last_name,\n        customer_orders.first_order,\n        customer_orders.most_recent_order,\n        customer_orders.number_of_orders,\n        customer_payments.total_amount as customer_lifetime_value\n\n    from customers\n\n    left join customer_orders\n        on customers.customer_id = customer_orders.customer_id\n\n    left join customer_payments\n        on  customers.customer_id = customer_payments.customer_id\n\n)\n\nselect * from final\n\n    ) as model_limit_subq\n    limit 22\n',
            }}
            title="Render Error"
          />
          <ActionButton data={{ command: "resetState" }} title="Reset state" />
        </Stack>
        <div style={{ position: "relative" }}>
          <QueryPanelProvider />
        </div>
      </div>
    );
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getCurrentUser") {
          return user;
        }
        if (request.command === "getQueryPanelContext") {
          window.postMessage({
            command: "getContext",
            lastHintTimestamp: 0,
            queryBookmarksEnabled: true,
          });

          return;
        }
        if (request.command === "getQueryHistory") {
          window.postMessage({
            command: "queryHistory",
            args: { body: QueryHistoryFactory.buildList(5) },
          });
          return;
        }

        if (request.command === "fetch") {
          switch (request.endpoint) {
            case (request.endpoint as string).match(
              /query\/bookmark\?privacy=private/,
            )?.input:
              return {
                items: QueryBookmarkFactory.buildList(5, {
                  privacy: "private",
                  created_by_user: user,
                }),
                page: 1,
                pages: 1,
                size: 5,
                total: 5,
              };
            case (request.endpoint as string).match(
              /query\/bookmark\?privacy=public/,
            )?.input:
              return {
                items: QueryBookmarkFactory.buildList(5, {
                  privacy: "public",
                  created_by_user: user,
                }),
                page: 1,
                pages: 1,
                size: 5,
                total: 5,
              };

            case "query/bookmark/tags":
              panelLogger.info("Fetching tags");
              return [
                { id: 1, tag: "tag1" },
                { id: 2, tag: "tag2" },
                { id: 3, tag: "tag3" },
              ];
              break;

            default:
              break;
          }
        }
      },
      timer: 500,
    },
  },
};
