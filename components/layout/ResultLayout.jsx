import { PartyPopper, Trophy } from "lucide-react";
import { Card } from "../ui/Card";

export function ResultLayout({
  actions,
  attempt,
  children,
  masteryState,
  message,
  title
}) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-8">
      <Card className="text-center" padding="lg" variant="result">
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-200 to-lime-200 shadow-lg">
          {masteryState === "mastered" ? (
            <Trophy className="h-16 w-16 motion-safe:animate-bounce text-amber-600" />
          ) : (
            <PartyPopper className="h-16 w-16 text-emerald-600" />
          )}
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
          더하기 숲 Lv. {attempt.level}
        </p>
        <h2 className="text-4xl font-black text-slate-900">{title}</h2>
        <p className="mx-auto mt-3 max-w-xs text-lg font-bold leading-relaxed text-slate-600">
          {message}
        </p>

        {children}
        <div className="mt-6 space-y-3">{actions}</div>
      </Card>
    </section>
  );
}
