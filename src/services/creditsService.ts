import { ExecutionsExhaustedException } from "@altimateai/dbt-integration";
import { env, Uri, window } from "vscode";
import { AltimateRequest } from "../altimate";

export interface CreditsInfo {
  available_executions: number;
  total_executions: number;
  feedback_grant_eligible: boolean;
  feedback_grant_claimed: boolean;
  feedback_grant_url: string;
}

const BILLING_URL = "https://app.myaltimate.com/settings/credits?tab=plans";

let cachedCredits: CreditsInfo | null = null;
const panelBroadcasters: Array<(available: number) => void> = [];

export function registerCreditsBroadcaster(
  fn: (available: number) => void,
): () => void {
  panelBroadcasters.push(fn);
  return () => {
    const idx = panelBroadcasters.indexOf(fn);
    if (idx >= 0) {
      panelBroadcasters.splice(idx, 1);
    }
  };
}

function broadcastCredits(available: number): void {
  for (const fn of panelBroadcasters) {
    try {
      fn(available);
    } catch {
      // broadcaster failures must not break core flow
    }
  }
}

export async function fetchAndCacheCredits(
  altimateRequest: AltimateRequest,
): Promise<CreditsInfo | null> {
  try {
    const data = await altimateRequest.fetch<
      CreditsInfo & { total_available_executions?: number }
    >("payment/credits");
    cachedCredits = {
      // Backend (`GET /payment/credits`) returns `total_available_executions`.
      // Fall back to `available_executions` for compatibility.
      available_executions:
        data.total_available_executions ?? data.available_executions ?? 0,
      total_executions: data.total_executions ?? 0,
      feedback_grant_eligible: data.feedback_grant_eligible ?? false,
      feedback_grant_claimed: data.feedback_grant_claimed ?? false,
      feedback_grant_url: data.feedback_grant_url ?? "",
    };
    broadcastCredits(cachedCredits.available_executions);
    return cachedCredits;
  } catch {
    // Silently fail — credits fetch is best-effort
    return null;
  }
}

export function getCachedCredits(): CreditsInfo | null {
  return cachedCredits;
}

export function updateCachedAvailableExecutions(remaining: number): void {
  if (cachedCredits) {
    cachedCredits.available_executions = remaining;
  } else {
    // Cache may be empty if the initial fetch hasn't completed yet; seed it so
    // header-driven and focus-driven updates still reflect in the panels.
    cachedCredits = {
      available_executions: remaining,
      total_executions: 0,
      feedback_grant_eligible: false,
      feedback_grant_claimed: false,
      feedback_grant_url: "",
    };
  }
  broadcastCredits(remaining);
}

export async function handleExecutionsExhausted(): Promise<void> {
  const credits = getCachedCredits();

  if (credits?.feedback_grant_eligible && credits.feedback_grant_url) {
    const choice = await window.showInformationMessage(
      "You've run out of credits.",
      "Let's talk",
      "Buy credits",
    );
    if (choice === "Let's talk") {
      await env.openExternal(Uri.parse(credits.feedback_grant_url));
      window.showInformationMessage(
        "Once you complete your booking, 200 credits will be added to your account automatically.",
      );
    } else if (choice === "Buy credits") {
      await env.openExternal(Uri.parse(BILLING_URL));
    }
  } else {
    const choice = await window.showInformationMessage(
      "You've run out of credits.",
      "Buy credits",
    );
    if (choice === "Buy credits") {
      await env.openExternal(Uri.parse(BILLING_URL));
    }
  }
}

// Re-export for convenience in catch blocks
export { ExecutionsExhaustedException };
