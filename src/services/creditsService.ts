import { ExecutionsExhaustedException } from "@altimateai/dbt-integration";
import { env, Uri, window } from "vscode";
import { AltimateRequest } from "../altimate";

export interface CreditsInfo {
  available_executions: number;
  total_executions: number;
  // Grant fields are optional: they're only known after a real `payment/credits`
  // fetch. The header-driven balance seed leaves them undefined ("unknown")
  // rather than fabricating `false`, which would wrongly deny the grant offer to
  // an eligible user.
  feedback_grant_eligible?: boolean;
  feedback_grant_claimed?: boolean;
  feedback_grant_url?: string;
}

const BILLING_URL = "https://app.myaltimate.com/settings/credits?tab=plans";

let cachedCredits: CreditsInfo | null = null;
// `null` broadcasts a cleared balance (e.g. on sign-out) so open panels hide the
// chip instead of keeping a stale value.
const panelBroadcasters: Array<(available: number | null) => void> = [];

export function registerCreditsBroadcaster(
  fn: (available: number | null) => void,
): () => void {
  panelBroadcasters.push(fn);
  return () => {
    const idx = panelBroadcasters.indexOf(fn);
    if (idx >= 0) {
      panelBroadcasters.splice(idx, 1);
    }
  };
}

function broadcastCredits(available: number | null): void {
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
    // Cache may be empty if the initial fetch hasn't completed yet; seed the
    // balance only and leave grant fields unknown (undefined) so a real fetch
    // can fill them — never fabricate `feedback_grant_eligible: false`.
    cachedCredits = {
      available_executions: remaining,
      total_executions: 0,
    };
  }
  broadcastCredits(remaining);
}

/** Clear the cached credits (e.g. on sign-out) and broadcast the cleared state
 * so already-open panels hide the chip instead of showing a stale balance. */
export function clearCachedCredits(): void {
  cachedCredits = null;
  broadcastCredits(null);
}

const CREDITS_TITLE = "Need more credits?";
const FEEDBACK_OFFER =
  "We shape Power User for dbt around what users tell us — share how you use it on a 30-min call and we'll add 200 credits as thanks. No pitch, just learning.";
const LETS_TALK = "Let's talk";
const BUY_CREDITS = "I'll buy credits";

function creditsStatusLine(balance: number): string {
  if (balance <= 0) {
    return "You're out of credits.";
  }
  return `You have ${balance} credit${balance === 1 ? "" : "s"} left.`;
}

// Guard so overlapping 402s (e.g. bulk generation) present a single popup.
let isExhaustedPopupOpen = false;

export async function handleExecutionsExhausted(
  altimateRequest?: AltimateRequest,
): Promise<void> {
  if (isExhaustedPopupOpen) {
    return;
  }
  isExhaustedPopupOpen = true;
  try {
    let credits = getCachedCredits();
    // If grant eligibility is unknown (activation fetch failed/raced), fetch once
    // so an eligible user isn't shown the stripped "buy only" popup. Only on the
    // unknown path, so the common case pays no extra round-trip.
    if (credits?.feedback_grant_eligible === undefined && altimateRequest) {
      credits = (await fetchAndCacheCredits(altimateRequest)) ?? credits;
    }
    const canTalk = Boolean(
      credits?.feedback_grant_eligible && credits.feedback_grant_url,
    );

    // Balance-aware copy: the chip can open this popup at any balance, so the
    // wording reflects the actual remaining credits (real 402s report 0).
    const status = creditsStatusLine(credits?.available_executions ?? 0);
    const detail = canTalk ? `${status} ${FEEDBACK_OFFER}` : status;

    // Non-modal toast in the usual bottom-right position. Corner notifications
    // collapse newlines, so the title and description are one well-formed line.
    const buttons = canTalk ? [LETS_TALK, BUY_CREDITS] : [BUY_CREDITS];
    const choice = await window.showInformationMessage(
      `${CREDITS_TITLE} ${detail}`,
      ...buttons,
    );

    if (choice === LETS_TALK && credits?.feedback_grant_url) {
      await env.openExternal(Uri.parse(credits.feedback_grant_url));
    } else if (choice === BUY_CREDITS) {
      await env.openExternal(Uri.parse(BILLING_URL));
    }
  } finally {
    isExhaustedPopupOpen = false;
  }
}

// Re-export for convenience in catch blocks
export { ExecutionsExhaustedException };
