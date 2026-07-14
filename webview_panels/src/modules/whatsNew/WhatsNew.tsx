import { Spinner } from "@altimateai/ui-components/extension";
import "@altimateai/ui-components/styles.css";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { TelemetryEvents } from "@telemetryEvents";
import { useEffect, useMemo, useState } from "react";
import classes from "./whatsNew.module.scss";

interface WhatsNewItem {
  title: string;
  tag: "new" | "improved" | "fix";
  summary: string;
  anchor: string;
}

interface WhatsNewManifest {
  product: string;
  version: string;
  generated_at: string;
  base_url: string;
  items: WhatsNewItem[];
}

// Fixed product-discovery links — Power user for dbt stays the active editor;
// clicking opens the filtered website changelog in the browser.
const PRODUCT_LINKS = [
  {
    label: "Altimate Code",
    url: "https://www.altimate.ai/changelog#altimate-code",
  },
  { label: "Datamates", url: "https://www.altimate.ai/changelog#datamates" },
  { label: "Snowflake", url: "https://www.altimate.ai/changelog#snowflake" },
  { label: "Databricks", url: "https://www.altimate.ai/changelog#databricks" },
];

const TAG_ORDER: WhatsNewItem["tag"][] = ["new", "improved", "fix"];
const SECTION_LABEL: Record<WhatsNewItem["tag"], string> = {
  new: "New",
  improved: "Improved",
  fix: "Fixed",
};
const PILL_LABEL: Record<WhatsNewItem["tag"], string> = {
  new: "New",
  improved: "Improved",
  fix: "Fix",
};

const openUrl = (url: string): void => {
  executeRequestInAsync("openURL", { url });
};

const track = (eventName: string, properties: Record<string, string>): void => {
  executeRequestInAsync("sendTelemetryEvent", { eventName, properties });
};

const WhatsNew = (): JSX.Element => {
  const [manifest, setManifest] = useState<WhatsNewManifest | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    executeRequestInSync("getWhatsNewManifest", {})
      .then((response) => setManifest(response as WhatsNewManifest))
      .catch((err) => {
        panelLogger.error("failed to load What's New manifest", err);
        setError(true);
      });
  }, []);

  // Group items by tag, preserving manifest order (newest first) within a group.
  const groups = useMemo(() => {
    if (!manifest) {
      return [];
    }
    return TAG_ORDER.map((tag) => ({
      tag,
      items: manifest.items.filter((item) => item.tag === tag),
    })).filter((group) => group.items.length > 0);
  }, [manifest]);

  if (error) {
    return (
      <div className={classes.stateWrap}>
        <p>Couldn&apos;t load What&apos;s New right now.</p>
        <a
          href="https://www.altimate.ai/changelog"
          onClick={(e) => {
            e.preventDefault();
            openUrl("https://www.altimate.ai/changelog");
          }}
        >
          Open the full changelog →
        </a>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className={`${classes.stateWrap} al-tw-scope`}>
        <Spinner />
      </div>
    );
  }

  const onFullChangelog = (): void => {
    track(TelemetryEvents["WhatsNew/FullChangelogClicked"], {
      version: manifest.version,
    });
    openUrl(manifest.base_url);
  };

  const onItemClick = (item: WhatsNewItem): void => {
    track(TelemetryEvents["WhatsNew/ChangelogItemClicked"], {
      anchor: item.anchor,
      version: manifest.version,
      tag: item.tag,
    });
    openUrl(manifest.base_url + item.anchor);
  };

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <div className={classes.headerMain}>
          <h1 className={classes.title}>In this update</h1>
          <div className={classes.version}>
            <span className={classes.product}>Power user for dbt</span>
            <span className={classes.dot}>·</span>
            <span>{manifest.version}</span>
          </div>
          <a
            className={classes.fullChangelog}
            href={manifest.base_url}
            onClick={(e) => {
              e.preventDefault();
              onFullChangelog();
            }}
          >
            See full changelog →
          </a>
        </div>

        <aside className={classes.alsoFrom}>
          <div className={classes.alsoFromLabel}>Also from Altimate AI</div>
          {PRODUCT_LINKS.map((link) => (
            <a
              key={link.label}
              className={classes.productLink}
              href={link.url}
              onClick={(e) => {
                e.preventDefault();
                openUrl(link.url);
              }}
            >
              {link.label} <span className={classes.extArrow}>↗</span>
            </a>
          ))}
        </aside>
      </header>

      <hr className={classes.divider} />

      <div className={classes.body}>
        <nav className={classes.contents}>
          <div className={classes.contentsLabel}>Contents</div>
          {groups.map((group) => (
            <a
              key={group.tag}
              className={classes.contentsLink}
              href={`#${group.tag}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(group.tag)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {PILL_LABEL[group.tag]}
            </a>
          ))}
        </nav>

        <main className={classes.entries}>
          {groups.map((group) => (
            <section key={group.tag} id={group.tag} className={classes.section}>
              <h2 className={classes.sectionTitle}>
                {SECTION_LABEL[group.tag]}
              </h2>
              {group.items.map((item) => (
                <div key={item.anchor} className={classes.entry}>
                  <a
                    className={classes.entryTitle}
                    href={manifest.base_url + item.anchor}
                    onClick={(e) => {
                      e.preventDefault();
                      onItemClick(item);
                    }}
                  >
                    {item.title} <span className={classes.extArrow}>↗</span>
                  </a>
                  <p className={classes.entrySummary}>{item.summary}</p>
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default WhatsNew;
