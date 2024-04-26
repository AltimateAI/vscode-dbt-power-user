import { Disposable } from "vscode";
import { AltimateRequest, TenantUser } from "../altimate";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTInstallationVerificationEvent } from "../dbt_client/dbtVersionEvent";

/**
 * Service to load and store users in tenant and current user
 */
@provideSingleton(UsersService)
export class UsersService implements Disposable {
  // Local cache of users in tenant
  private tenantUsers: Record<string, TenantUser> = {};
  // Local cache of current user
  private tenantUser: TenantUser | undefined;
  private disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
    private altimateRequest: AltimateRequest,
  ) {
    this.disposables.push(
      this.dbtProjectContainer.onDBTInstallationVerification((e) =>
        this.onDBTInstallationVerification(e),
      ),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private onDBTInstallationVerification(
    event: DBTInstallationVerificationEvent,
  ) {
    if (event.installed) {
      // this.loadCurrentUser();
      // this.loadUsersInTenant();
    }
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
    const users = await this.altimateRequest.getUsersInTenant();
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
    const user = await this.altimateRequest.getCurrentUser();
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
