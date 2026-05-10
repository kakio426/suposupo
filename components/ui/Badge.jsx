import { cx } from "./styles";

const toneClasses = {
  neutral: "bg-white/85 text-neutral-500",
  brand: "bg-brand-100 text-brand-700",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-900",
  danger: "bg-danger-100 text-danger-700",
  locked: "bg-neutral-100 text-neutral-500",
  synced: "bg-success-100 text-success-700"
};

export function Badge({ children, className = "", tone = "neutral" }) {
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center rounded-pill px-3 py-1 text-xs font-black",
        toneClasses[tone] || toneClasses.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

