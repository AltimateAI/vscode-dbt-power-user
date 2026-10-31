import { executeRequestInAsync } from "@modules/app/requestExecutor";
import DbtMessageBlock from "./DbtMessageBlock";
import styles from "./lineageBanner.module.scss";
import {
  LineageBannerAction,
  LineageBanner as LineageBannerState,
} from "./types";

const runAction = (action: LineageBannerAction) =>
  executeRequestInAsync("lineageBannerAction", {
    args: { action: action.id, params: action.args },
  });

// Says the drawn graph is out of date and why, with the error's one line, dbt's
// message behind a toggle, and buttons that wrap as whole buttons when the
// panel is narrow.
const LineageBanner = ({
  banner,
}: {
  banner: LineageBannerState;
}): JSX.Element => (
  <section
    className={`${styles.banner} ${styles[banner.severity]}`}
    role="status"
    data-testid="lineage-banner"
  >
    <div className={styles.bannerMessage}>
      <i className={`codicon codicon-history ${styles.icon}`} />
      <div className={styles.bannerText}>
        <p className={styles.bannerTitle}>{banner.title}</p>
        <p className={styles.detail}>{banner.detail}</p>
        <DbtMessageBlock message={banner.dbtMessage} collapsed />
      </div>
    </div>
    <div className={styles.actions}>
      {banner.actions.map((action, index) => (
        <button
          key={action.id}
          type="button"
          className={
            index === 0 ? styles.primaryButton : styles.secondaryButton
          }
          onClick={() => runAction(action)}
        >
          {action.label}
        </button>
      ))}
    </div>
  </section>
);

export default LineageBanner;
