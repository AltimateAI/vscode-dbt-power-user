import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisType,
  QueryExplainResult,
} from "@modules/dataPilot/components/queryAnalysis/types";

export const DatapilotQueryAnalysisFactory =
  Sync.makeFactory<DatapilotQueryAnalysisChat>({
    id: each(() => faker.string.uuid()),
    query: faker.lorem.sentence(),
    requestType: RequestTypes.QUERY_ANALYSIS,
    state: RequestState.LOADING,
    actions: [],
    meta: {},
    response: undefined,
    updatedAt: faker.date.past(),
    fileName: faker.system.commonFileName("sql"),
    analysisType: faker.helpers.enumValue(QueryAnalysisType),
  });

export const DatapilotQueryExplainFactory =
  DatapilotQueryAnalysisFactory.extend({
    analysisType: QueryAnalysisType.EXPLAIN,
  });

export const DatapilotQueryExplainResultFactory =
  Sync.makeFactory<QueryExplainResult>({
    datapilot_title: "Query explanation",
    response: each(() =>
      [
        "### Storybook",

        `- ${faker.lorem.sentence()}`,
        `- ${faker.lorem.sentence()}:`,
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
    session_id: each(() => faker.string.uuid()),
    state: RequestState.COMPLETED,
  });
