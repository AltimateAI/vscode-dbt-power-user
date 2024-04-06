import { AltimateRequest } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { provideSingleton } from "../utils";

export interface TenantUser {
  id: string;
  uuid: string;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  is_invited: boolean;
  is_onboarded: boolean;
  created_at: string;
  role_title: string;
}

/**
 * Service to load and store users in tenant and current user
 */
@provideSingleton(UsersService)
export class UsersService {
  // Local cache of users in tenant
  private tenantUsers: Record<string, TenantUser> = {};
  // Local cache of current user
  private tenantUser: TenantUser | undefined;

  public constructor(
    private dbtTerminal: DBTTerminal,
    private altimateRequest: AltimateRequest,
  ) {
    this.loadUsersInTenant();
    this.loadCurrentUser();
  }

  private async loadUsersInTenant() {
    if (this.altimateRequest.getCredentialsMessage()) {
      this.dbtTerminal.debug(
        "UsersService:loadUsersInTenant",
        "Missing credentials. skipping loadUsersInTenant",
      );
      return;
    }
    this.dbtTerminal.debug("UsersService", "loading tenant users");
    const users = await this.altimateRequest.fetch<TenantUser[]>("/users/");
    this.tenantUsers = users.reduce((acc: Record<string, TenantUser>, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
    this.dbtTerminal.debug("UsersService", "loaded tenant users", users.length);
  }

  private async loadCurrentUser() {
    if (this.altimateRequest.getCredentialsMessage()) {
      this.dbtTerminal.debug(
        "UsersService:loadCurrentUser",
        "Missing credentials. skipping loadCurrentUser",
      );
      return;
    }
    this.dbtTerminal.debug("UsersService", "loading current user");
    const user = await this.altimateRequest.fetch<TenantUser>(
      "/dbt/dbt_docs_share/user/details",
    );
    this.tenantUser = user;
    this.dbtTerminal.debug("UsersService", "loaded current user", user);
  }

  public getUserById(userId: TenantUser["id"]) {
    return this.tenantUsers[userId];
  }

  get user() {
    return this.tenantUser;
  }

  get users() {
    return Object.values(this.tenantUsers);
  }
}
