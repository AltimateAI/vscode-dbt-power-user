import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisType,
  QueryAnalysisFollowup,
} from "@modules/dataPilot/components/queryAnalysis/types";

export const DatapilotQueryAnalysisFactory =
  Sync.makeFactory<DatapilotQueryAnalysisChat>({
    id: each(() => faker.string.uuid()),
    query: `
    /*
      some comments here
    */
    select * from users 
    where provider='google' and name='john'
    group by city`,
    requestType: RequestTypes.QUERY_ANALYSIS,
    state: RequestState.LOADING,
    actions: [],
    meta: {},
    response: undefined,
    updatedAt: faker.date.past(),
    fileName: faker.system.commonFileName("sql"),
  });

export const DatapilotQueryExplainFactory =
  DatapilotQueryAnalysisFactory.extend({
    analysisType: QueryAnalysisType.EXPLAIN,
  });

export const DatapilotQueryExplainResultFactory =
  Sync.makeFactory<QueryAnalysisFollowup>({
    id: each(() => faker.string.uuid()),
    datapilot_title: "Query explanation",
    response: each(() =>
      [
        "### Query Explanation",

        `This SQL query is using Common Table Expressions (CTEs) to create temporary views or tables for use within the query. The database type is DuckDB, which is an in-memory analytical database written in C++.         `,
        `The query is broken down into several parts:        `,
        "1. The first three CTEs (`customers`, `orders`, `payments`) are simply selecting all records from the respective tables in the `jaffle_shop.main` schema.",

        "2. The `customer_orders` CTE is aggregating the `orders` table by `customer_id` to find the earliest (`MIN`) order date, the most recent (`MAX`) order date, and the total number of orders (`COUNT`) for each customer.",

        "3. The `customer_payments` CTE is joining the `payments` and `orders` tables on `order_id`, then aggregating by `customer_id` to find the total payment amount (`SUM`) for each customer.",

        "4. The `final` CTE is joining the `customers`, `customer_orders`, and `customer_payments` CTEs on `customer_id` to create a final table that includes the customer's first and last name, the date of their first and most recent orders, the total number of their orders, and their total payment amount (referred to as `customer_lifetime_value`).",

        "5. The final `SELECT` statement is selecting all records from the `final` CTE.",

        "The result of this query would be a table that provides a summary of each customer's order history and total payment amount.",
        " ```",
        "",
        "with",
        '    orders as (select * from {{ ref("stg_orders") }}),',
        "",
        '    payments as (select * from {{ ref("stg_payments") }}),',
        "",
        "    order_payments as (",
        "",
        "        select",
        "            order_id,",
        "",
        "            {% for payment_method in payment_methods -%}",
        "                sum(",
        "                    case",
        "                        when payment_method = '{{ payment_method }}' then amount else 0",
        "                    end",
        "                ) as {{ payment_method }}_amount,",
        "            {% endfor -%}",
        "",
        "            sum(amount) as total_amount",
        "",
        "        from payments",
        "",
        "        group by order_id",
        "",
        "    ),",
        "",
        "    final as (",
        "",
        "        select",
        "            orders.order_id,",
        "            orders.customer_id,",
        "            orders.order_date,",
        "            orders.status,",
        "",
        "            {% for payment_method in payment_methods -%}",
        "",
        "                order_payments.{{ payment_method }}_amount,",
        "",
        "            {% endfor -%}",
        "",
        "            order_payments.total_amount as amount",
        "",
        "        from orders",
        "",
        "        left join order_payments on orders.order_id = order_payments.order_id",
        "",
        "    )",
        "",
        "select *",
        "from final",
        "```",
      ].join("\n"),
    ),
    user_prompt: "Explain the query",
    state: RequestState.COMPLETED,
  });
