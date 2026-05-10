import { cx } from "./styles";

const toneClasses = {
  brand: "from-lime-400 to-brand-500",
  success: "from-success-300 to-success-500",
  warning: "from-warning-200 to-warning-500"
};

export function ProgressBar({
  className = "",
  label = "진도",
  max = 100,
  tone = "brand",
  value = 0
}) {
  const safeMax = max > 0 ? max : 100;
  const percent = Math.min(Math.max((value / safeMax) * 100, 0), 100);

  return (
    <div
      aria-label={label}
      aria-valuemax={safeMax}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cx(
        "h-5 flex-1 overflow-hidden rounded-pill bg-white/80 shadow-inner",
        className
      )}
      role="progressbar"
    >
      <div
        className={cx(
          "h-full rounded-pill bg-gradient-to-r transition-all duration-slow ease-out",
          toneClasses[tone] || toneClasses.brand
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

