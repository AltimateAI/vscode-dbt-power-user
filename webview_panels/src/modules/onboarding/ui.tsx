import { ReactNode } from "react";
import { Icon } from "./icons";
import classes from "./onboarding.module.scss";

export type CheckStatus = "pending" | "checking" | "ok" | "warning" | "error";

interface ButtonProps {
  variant?: "primary" | "secondary";
  nav?: boolean;
  disabled?: boolean;
  external?: boolean;
  /** Renders a link instead, which VS Code opens in the browser. */
  href?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  nav,
  disabled,
  external,
  href,
  className,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const buttonClass = [
    classes.btn,
    variant === "primary" ? classes.btnPrimary : classes.btnSecondary,
    nav ? classes.btnNav : "",
    className ?? "",
  ].join(" ");
  const content = (
    <>
      {children}
      {external && <Icon name="external-link" size={15} />}
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const StatusIcon = ({
  status,
}: {
  status: CheckStatus;
}): JSX.Element => (
  <div className={classes.checkStatus}>
    {status === "checking" && <span className={classes.spinner} />}
    {status === "ok" && (
      <Icon name="circle-check" size={20} className={classes.statusOk} />
    )}
    {status === "warning" && (
      <Icon name="alert-triangle" size={19} className={classes.statusWarn} />
    )}
    {status === "error" && <span className={classes.statusError} />}
    {status === "pending" && <span className={classes.statusPending} />}
  </div>
);

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export const ExternalLink = ({
  href,
  className,
  children,
}: ExternalLinkProps): JSX.Element => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={[classes.linkAction, className ?? ""].join(" ")}
  >
    {children}
    <Icon name="external-link" size={14} />
  </a>
);
