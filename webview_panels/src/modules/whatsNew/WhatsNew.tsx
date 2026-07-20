import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { TelemetryEvents } from "@telemetryEvents";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./fonts.scss";
import {
  AltimateWordmark,
  ArrowIcon,
  ExternalArrowIcon,
  FunnelIcon,
  TagIcon,
} from "./icons";
import classes from "./whatsNew.module.scss";

// Tag vocabulary is the changelog source's, not ours — see
// altimate-website `src/data/changelog-taxonomy.js`. Keeping them identical
// means a new source tag renders instead of silently collapsing into
// "improved".
const TAG_ORDER = ["new", "improved", "beta", "fixed"] as const;
type Tag = (typeof TAG_ORDER)[number];

const TAG_LABEL: Record<Tag, string> = {
  new: "New",
  improved: "Improved",
  beta: "Beta",
  fixed: "Fixed",
};

const TAG_COLOR: Record<Tag, string> = {
  new: "var(--accent-success)",
  improved: "var(--accent-teal)",
  beta: "var(--accent-purple)",
  fixed: "var(--text-dim)",
};

interface WhatsNewItem {
  title: string;
  tag: Tag;
  summary: string;
  anchor: string;
  // YYYY-MM-DD — drives both the month grouping and the date stamp.
  date: string;
  // Optional until the changelog source carries a per-product version; the
  // chip simply doesn't render until then.
  version?: string;
}

interface WhatsNewManifest {
  product: string;
  version: string;
  generated_at: string;
  base_url: string;
  items: WhatsNewItem[];
}

interface MonthGroup {
  key: string;
  label: string;
  entries: WhatsNewItem[];
}

// Fixed product-discovery links — Power User for dbt stays the active editor;
// clicking opens the filtered website changelog in the browser.
const PRODUCT_LINKS = [
  {
    label: "Altimate Code",
    url: "https://altimate.ai/products/altimate-code",
  },
  { label: "Datamates", url: "https://altimate.ai/datamates" },
  { label: "Snowflake", url: "https://altimate.ai/altimate-on-snowflake" },
  {
    label: "Databricks",
    url: "https://altimate.ai/use-cases/altimate-for-databricks",
  },
];

const FULL_CHANGELOG_URL = "https://altimate.ai/changelog";

const monthKey = (iso: string): string => iso.slice(0, 7);

const monthLabel = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

const shortDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

// The feed regularly carries a single entry for this product, so the count
// line has to read "1 update", not "1 updates".
const pluralize = (count: number, word: string): string =>
  count === 1 ? word : `${word}s`;

const openUrl = (url: string): void => {
  executeRequestInAsync("openURL", { url });
};

const track = (eventName: string, properties: Record<string, string>): void => {
  executeRequestInAsync("sendTelemetryEvent", { eventName, properties });
};

const WhatsNew = (): JSX.Element => {
  const [manifest, setManifest] = useState<WhatsNewManifest | null>(null);
  const [error, setError] = useState(false);
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  useEffect(() => {
    executeRequestInSync("getWhatsNewManifest", {})
      .then((response) => setManifest(response as WhatsNewManifest))
      .catch((err) => {
        panelLogger.error("failed to load What's New manifest", err);
        setError(true);
      });
  }, []);

  // Newest first — the month grouping below relies on this order.
  const items = useMemo(() => {
    if (!manifest) {
      return [];
    }
    return [...manifest.items].sort((a, b) => b.date.localeCompare(a.date));
  }, [manifest]);

  // Counts are over every item, not the filtered set, so the pills keep
  // showing what's available while a filter is on.
  const counts = useMemo(() => {
    const out = {} as Record<Tag, number>;
    for (const tag of TAG_ORDER) {
      out[tag] = items.filter((item) => item.tag === tag).length;
    }
    return out;
  }, [items]);

  const groups = useMemo((): MonthGroup[] => {
    const shown = activeTags.length
      ? items.filter((item) => activeTags.includes(item.tag))
      : items;
    const out: MonthGroup[] = [];
    const byKey: Record<string, MonthGroup> = {};
    for (const item of shown) {
      const key = monthKey(item.date);
      if (!byKey[key]) {
        byKey[key] = { key, label: monthLabel(item.date), entries: [] };
        out.push(byKey[key]);
      }
      byKey[key].entries.push(item);
    }
    return out;
  }, [items, activeTags]);

  // Scrollspy: highlight the month whose section is currently in view.
  useEffect(() => {
    if (!groups.length) {
      return;
    }
    setActiveMonth(groups[0].key);
    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topmost) {
          setActiveMonth(topmost.target.getAttribute("data-month-key"));
        }
      },
      { rootMargin: "-90px 0px -70% 0px" },
    );
    for (const group of groups) {
      const el = document.querySelector(`[data-month-key="${group.key}"]`);
      if (el) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [groups]);

  const toggleTag = useCallback((tag: Tag): void => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const onFullChangelog = useCallback((): void => {
    track(TelemetryEvents["WhatsNew/FullChangelogClicked"], {
      version: manifest?.version ?? "",
    });
    openUrl(manifest?.base_url ?? FULL_CHANGELOG_URL);
  }, [manifest]);

  if (error) {
    return (
      <div className={classes.page}>
        <div className={classes.stateWrap}>
          <p>Couldn&apos;t load What&apos;s New right now.</p>
          <a
            href={FULL_CHANGELOG_URL}
            title={`Open ${FULL_CHANGELOG_URL} in your browser`}
            onClick={(e) => {
              e.preventDefault();
              openUrl(FULL_CHANGELOG_URL);
            }}
          >
            Open the full changelog →
          </a>
        </div>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className={classes.page}>
        <div className={classes.stateWrap}>
          <div className={classes.spinner} role="status" aria-label="Loading" />
        </div>
      </div>
    );
  }

  const shownCount = groups.reduce((n, g) => n + g.entries.length, 0);

  return (
    <div className={classes.page}>
      <div className={classes.topbar}>
        <a
          className={classes.topbarLogo}
          href="https://altimate.ai"
          aria-label="Altimate AI"
          title="Open altimate.ai in your browser"
          onClick={(e) => {
            e.preventDefault();
            openUrl("https://altimate.ai");
          }}
        >
          <AltimateWordmark />
        </a>
        <div className={classes.topbarLinks}>
          <a
            className={classes.topbarLink}
            href={FULL_CHANGELOG_URL}
            title={`Open ${FULL_CHANGELOG_URL} in your browser`}
            onClick={(e) => {
              e.preventDefault();
              onFullChangelog();
            }}
          >
            Full changelog
          </a>
          <a
            className={classes.topbarLink}
            href="https://altimate.ai"
            title="Open altimate.ai in your browser"
            onClick={(e) => {
              e.preventDefault();
              openUrl("https://altimate.ai");
            }}
          >
            altimate.ai
          </a>
        </div>
      </div>

      <header className={classes.header}>
        <div className={classes.headerMain}>
          <p className={classes.eyebrow}>Extension release notes</p>
          <h1 className={classes.title}>What&apos;s New</h1>
          <p className={classes.sub}>
            Every shipped update to <strong>Power User for dbt</strong>
            {manifest.version ? (
              <> — you&apos;re on {manifest.version}.</>
            ) : (
              "."
            )}
          </p>
          <a
            className={classes.cta}
            href={manifest.base_url}
            title={`Open ${manifest.base_url} in your browser`}
            onClick={(e) => {
              e.preventDefault();
              onFullChangelog();
            }}
          >
            View full changelog
            <ArrowIcon />
          </a>
        </div>

        <aside className={classes.aside} aria-label="Also from Altimate AI">
          <span className={classes.asideLegend}>Also from Altimate AI</span>
          <nav className={classes.asideLinks}>
            {PRODUCT_LINKS.map((link) => (
              <a
                key={link.label}
                className={classes.asideLink}
                href={link.url}
                title={`Open ${link.url} in your browser`}
                onClick={(e) => {
                  e.preventDefault();
                  openUrl(link.url);
                }}
              >
                {link.label}
                <ExternalArrowIcon className={classes.asideArrow} />
              </a>
            ))}
          </nav>
        </aside>
      </header>

      <div className={classes.toolbar}>
        <div
          className={classes.filters}
          role="group"
          aria-label="Filter by change type"
        >
          <span className={classes.filtersLabel}>
            <FunnelIcon />
            Filter by type
          </span>
          {TAG_ORDER.map((tag) => (
            <button
              key={tag}
              className={classes.filter}
              type="button"
              data-active={activeTags.includes(tag)}
              aria-pressed={activeTags.includes(tag)}
              disabled={counts[tag] === 0}
              onClick={() => toggleTag(tag)}
            >
              <span
                className={classes.filterDot}
                style={{ background: TAG_COLOR[tag] }}
              />
              {TAG_LABEL[tag]}
              <span className={classes.filterCount}>{counts[tag]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={classes.shell}>
        <aside className={classes.timeline} aria-label="Changelog timeline">
          <span className={classes.timelineLegend}>Timeline</span>
          <nav className={classes.timelineNav}>
            {groups.map((group) => (
              <button
                key={group.key}
                className={classes.timelineLink}
                type="button"
                data-active={activeMonth === group.key}
                onClick={() => {
                  setActiveMonth(group.key);
                  document
                    .querySelector(`[data-month-key="${group.key}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {group.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className={classes.feed}>
          <div className={classes.feedHead}>
            <span className={classes.resultsCount}>
              {shownCount === items.length
                ? `${items.length} ${pluralize(items.length, "update")}`
                : `Showing ${shownCount} of ${items.length} ${pluralize(
                    items.length,
                    "update",
                  )}`}
            </span>
          </div>

          {groups.map((group) => (
            <section
              key={group.key}
              className={classes.month}
              data-month-key={group.key}
            >
              <h2 className={classes.monthHead}>{group.label}</h2>
              <ol className={classes.entries}>
                {group.entries.map((item) => (
                  <li key={item.anchor} className={classes.entry}>
                    <span
                      className={classes.entryDot}
                      style={{ background: TAG_COLOR[item.tag] }}
                    />
                    <div className={classes.entryBody}>
                      <div className={classes.entryBadges}>
                        <span
                          className={classes.tag}
                          style={{ color: TAG_COLOR[item.tag] }}
                        >
                          <TagIcon tag={item.tag} />
                          {TAG_LABEL[item.tag]}
                        </span>
                        {item.version ? (
                          <span
                            className={`${classes.chip} ${classes.chipVer}`}
                          >
                            v{item.version}
                          </span>
                        ) : null}
                        <span className={classes.entryDate}>
                          {shortDate(item.date)}
                        </span>
                      </div>
                      {/*
                        Deliberately not a link. `base_url + anchor` resolves to
                        the entry on the public changelog, but that entry holds
                        the same tag/date/title/description rendered here — so
                        the click is a round trip to text the reader just read.
                        The "View full changelog" CTA covers the case that does
                        earn a trip out: other products and older releases.
                        `anchor` stays as the stable key.
                      */}
                      <h3 className={classes.entryTitle}>{item.title}</h3>
                      <p className={classes.entryDesc}>{item.summary}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {shownCount === 0 ? (
            <div className={classes.empty}>
              <p>No updates match these filters.</p>
              <button
                type="button"
                className={classes.emptyButton}
                onClick={() => setActiveTags([])}
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <footer className={classes.foot}>
        Altimate AI ·{" "}
        <a
          href={FULL_CHANGELOG_URL}
          title={`Open ${FULL_CHANGELOG_URL} in your browser`}
          onClick={(e) => {
            e.preventDefault();
            onFullChangelog();
          }}
        >
          See the full platform changelog →
        </a>
      </footer>
    </div>
  );
};

export default WhatsNew;
