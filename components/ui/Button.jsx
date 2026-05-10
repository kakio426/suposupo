import { cx, focusRing } from "./styles";

const variantClasses = {
  primary: {
    brand:
      "border-brand-700 bg-brand-500 text-white shadow-control hover:bg-brand-400",
    warm:
      "border-warning-700 bg-warning-300 text-warning-900 shadow-control hover:bg-warning-200",
    neutral:
      "border-neutral-300 bg-white text-neutral-700 shadow-soft hover:bg-neutral-50",
    danger:
      "border-danger-700 bg-danger-500 text-white shadow-control hover:bg-danger-400"
  },
  secondary: {
    brand:
      "border-brand-200 bg-brand-50 text-brand-700 shadow-soft hover:bg-brand-100",
    warm:
      "border-warning-200 bg-warning-50 text-warning-900 shadow-soft hover:bg-warning-100",
    neutral:
      "border-neutral-200 bg-white text-neutral-700 shadow-soft hover:bg-neutral-50",
    danger:
      "border-danger-200 bg-danger-50 text-danger-700 shadow-soft hover:bg-danger-100"
  },
  quiet: {
    brand: "border-transparent bg-brand-50 text-brand-700 hover:bg-brand-100",
    warm: "border-transparent bg-warning-50 text-warning-900 hover:bg-warning-100",
    neutral: "border-transparent bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
    danger: "border-transparent bg-danger-50 text-danger-700 hover:bg-danger-100"
  }
};

const sizeClasses = {
  sm: "min-h-11 rounded-control px-4 py-2 text-sm",
  md: "min-h-12 rounded-control px-5 py-3 text-base",
  lg: "min-h-14 rounded-button px-6 py-4 text-lg",
  xl: "min-h-16 rounded-button px-6 py-5 text-xl"
};

export function Button({
  children,
  className = "",
  disabled = false,
  iconLeft = null,
  iconRight = null,
  loading = false,
  size = "lg",
  tone = "brand",
  type = "button",
  variant = "primary",
  ...props
}) {
  const isDisabled = disabled || loading;
  const visualClasses =
    variantClasses[variant]?.[tone] ||
    variantClasses[variant]?.brand ||
    variantClasses.primary.brand;

  return (
    <button
      className={cx(
        "inline-flex w-full items-center justify-center gap-3 border-b-[7px] font-black transition-all duration-fast motion-safe:active:translate-y-1 motion-safe:active:scale-95 motion-safe:active:border-b-2",
        focusRing,
        sizeClasses[size] || sizeClasses.lg,
        visualClasses,
        isDisabled && "cursor-not-allowed border-b-2 opacity-60",
        className
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {iconLeft}
      <span className={cx("inline-flex items-center", loading && "opacity-70")}>
        {loading ? "기다리는 중" : children}
      </span>
      {iconRight}
    </button>
  );
}

