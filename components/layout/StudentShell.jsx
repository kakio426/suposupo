import { ArrowLeft } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { cx } from "../ui/styles";

const maxWidthClasses = {
  sm: "max-w-md",
  md: "max-w-3xl",
  lg: "max-w-5xl"
};

export function StudentShell({
  action = null,
  badge = null,
  children,
  className = "",
  eyebrow,
  maxWidth = "lg",
  onBack,
  title
}) {
  return (
    <section
      className={cx(
        "relative mx-auto min-h-screen w-full px-5 py-6 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth] || maxWidthClasses.lg,
        className
      )}
    >
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {onBack && (
            <IconButton ariaLabel="이전 화면으로 돌아가기" onClick={onBack}>
              <ArrowLeft className="h-6 w-6" />
            </IconButton>
          )}

          <div className="min-w-0">
            {eyebrow && (
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-600">
                {eyebrow}
              </p>
            )}
            <h1 className="truncate font-display text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>

        {badge}
      </header>

      <div className="space-y-5">{children}</div>

      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}
