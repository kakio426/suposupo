import { cx } from "./styles";

const variantClasses = {
  plain: "bg-white/80 shadow-soft",
  elevated: "border-4 border-white bg-white/84 shadow-jelly backdrop-blur",
  command: "border-4 border-white bg-white/84 shadow-jelly backdrop-blur",
  status: "bg-white/78 shadow-soft backdrop-blur",
  world: "border-2 bg-white/80 shadow-soft",
  result: "border-4 border-white bg-white/84 shadow-jelly backdrop-blur"
};

const toneClasses = {
  neutral: "border-white text-neutral-900",
  brand: "border-brand-200 bg-brand-50 text-neutral-900",
  warm: "border-warning-200 bg-warning-50 text-neutral-900",
  success: "border-success-200 bg-success-50 text-neutral-900",
  sky: "border-sky-200 bg-sky-50 text-neutral-900",
  locked: "border-neutral-100 bg-white/80 text-neutral-500 opacity-75"
};

const paddingClasses = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6"
};

export function Card({
  children,
  className = "",
  interactive = false,
  padding = "md",
  tone = "neutral",
  variant = "plain",
  ...props
}) {
  return (
    <div
      className={cx(
        "rounded-card",
        variantClasses[variant] || variantClasses.plain,
        toneClasses[tone] || toneClasses.neutral,
        paddingClasses[padding] || paddingClasses.md,
        interactive && "transition-all duration-fast motion-safe:hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

