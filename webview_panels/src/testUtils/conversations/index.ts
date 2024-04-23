import { Sync } from "factory.ts";
import { faker } from "@faker-js/faker";
import { Conversation, ConversationGroup } from "@lib";

export const ConversationFactory = Sync.makeFactory<Conversation>({
  conversation_id: faker.number.int(),
  user_id: faker.number.int(),
  message: faker.lorem.lines(),
  timestamp: faker.date.past().toISOString(),
});
export const ConversationGroupFactory = Sync.makeFactory<ConversationGroup>({
  conversation_group_id: faker.number.int(),
  owner: faker.number.int(),
  meta: {
    filePath: faker.system.filePath(),
    range: {
      end: { line: 10, character: 2 },
      start: { line: 6, character: 0 },
    },
    uniqueId: "model.jaffle_shop.customers",
    highlight: "orders as (\n\n    select * from {{ ref('stg_orders') }}\n\n),",
    resource_type: "model",
  },
  status: "Pending",
  conversations: [],
});
