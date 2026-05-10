import { cx, focusRing } from "./styles";

const variantClasses = {
  default: "bg-white/90 text-neutral-600 shadow-soft hover:text-neutral-800",
  brand: "bg-white/90 text-brand-600 shadow-soft hover:text-brand-700",
  quiet: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
  danger: "bg-danger-50 text-danger-700 hover:bg-danger-100"
};

const sizeClasses = {
  md: "h-12 w-12 rounded-control",
  lg: "h-14 w-14 rounded-button"
};

export function IconButton({
  ariaLabel,
  children,
  className = "",
  disabled = false,
  size = "md",
  type = "button",
  variant = "default",
  ...props
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        "inline-flex shrink-0 items-center justify-center transition-all duration-fast motion-safe:active:scale-95",
        focusRing,
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.default,
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

