import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { User } from "@modules/app/types";

export const TenantUserFactory = Sync.makeFactory<User>({
  display_name: each(() => faker.person.fullName()),
  first_name: each(() => faker.person.fullName()),
  last_name: each(() => faker.person.fullName()),
  id: each((i) => i),
});
