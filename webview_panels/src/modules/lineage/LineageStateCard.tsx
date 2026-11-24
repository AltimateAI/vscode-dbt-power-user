import { executeRequestInAsync } from "@modules/app/requestExecutor";
import DbtMessageBlock from "./DbtMessageBlock";
import styles from "./lineageStateCard.module.scss";
import chipStyles from "./staleGraphChip.module.scss";
import { LineageCard, LineageCardAction } from "./types";

// Fills the canvas when no graph can be drawn: the problem in plain words, what
// to do, dbt's message, and the buttons.
const LineageStateCard = ({ card }: { card: LineageCard }): JSX.Element => {
  const run = (action: Pick<LineageCardAction, "id" | "args">) =>
    executeRequestInAsync("lineageCardAction", {
      args: { kind: card.kind, action: action.id, params: action.args },
    });

  return (
    <div className={styles.canvas}>
      <section
        className={`${styles.card} ${styles[card.severity]}`}
        role={card.severity === "info" ? "status" : "alert"}
        data-testid="lineage-state-card"
        data-kind={card.kind}
      >
        <header className={styles.header}>
          <i className={`codicon codicon-${card.severity} ${styles.icon}`} />
          <h2 className={styles.title}>{card.title}</h2>
        </header>
        <p className={styles.detail}>{card.detail}</p>
        <DbtMessageBlock message={card.dbtMessage} />
        <div className={chipStyles.actions}>
          {card.actions.map((action, index) => (
            <button
              key={`${action.id}-${action.label}`}
              type="button"
              className={
                index === 0
                  ? chipStyles.primaryButton
                  : chipStyles.secondaryButton
              }
              onClick={() => run(action)}
            >
              {action.label}
            </button>
          ))}
          {card.setup ? (
            <button
              type="button"
              className={chipStyles.linkButton}
              onClick={() => run({ id: "getStarted" })}
            >
              Get Started guide
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default LineageStateCard;
