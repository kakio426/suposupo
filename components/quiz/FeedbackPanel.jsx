import { cx } from "../ui/styles";

const toneClasses = {
  success: "bg-success-100 text-success-700",
  repair: "bg-danger-100 text-danger-700",
  hint: "bg-warning-100 text-warning-900",
  reward: "bg-brand-100 text-brand-700",
  "sync-error": "bg-warning-100 text-warning-900"
};

export function FeedbackPanel({
  className = "",
  icon = null,
  message = "",
  title,
  tone = "hint"
}) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-2 rounded-pill px-5 py-3 text-lg font-black shadow-soft",
        toneClasses[tone] || toneClasses.hint,
        className
      )}
      role="status"
    >
      {icon}
      <span>
        {title}
        {message && (
          <span className="ml-2 text-sm font-bold opacity-80">{message}</span>
        )}
      </span>
    </div>
  );
}

