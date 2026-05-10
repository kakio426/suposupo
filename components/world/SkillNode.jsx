import { CheckCircle2, Lock, RotateCcw } from "lucide-react";
import { cx, focusRing } from "../ui/styles";

const stateClasses = {
  complete:
    "border-emerald-700 bg-emerald-500 text-white motion-safe:active:translate-y-1 motion-safe:active:border-b-2 motion-safe:active:scale-95",
  current:
    "border-amber-600 bg-amber-300 text-amber-950 ring-4 ring-amber-100 motion-safe:active:translate-y-1 motion-safe:active:border-b-2 motion-safe:active:scale-95",
  locked: "border-slate-300 bg-slate-100 text-slate-400",
  open:
    "border-white bg-white text-slate-700 motion-safe:active:translate-y-1 motion-safe:active:border-b-2 motion-safe:active:scale-95",
  review:
    "border-orange-600 bg-orange-200 text-orange-950 ring-4 ring-orange-100 motion-safe:active:translate-y-1 motion-safe:active:border-b-2 motion-safe:active:scale-95"
};

export function SkillNode({
  label,
  level,
  onSelect,
  state = "open"
}) {
  const locked = state === "locked";

  return (
    <button
      aria-label={`더하기 숲 Lv.${level}, ${label}, ${getStateLabel(state)}`}
      className={cx(
        "relative flex min-h-20 w-full items-center gap-4 rounded-[1.6rem] border-b-[6px] px-4 py-3 text-left shadow-lg transition-all",
        focusRing,
        stateClasses[state] || stateClasses.open
      )}
      disabled={locked}
      onClick={() => onSelect(level)}
      type="button"
    >
      <span
        className={cx(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
          locked
            ? "bg-white/70"
            : state === "complete"
              ? "bg-white/20"
              : state === "current"
                ? "bg-white/70"
                : "bg-emerald-100 text-emerald-700"
        )}
      >
        {locked ? (
          <Lock className="h-6 w-6" />
        ) : state === "complete" ? (
          <CheckCircle2 className="h-7 w-7" />
        ) : state === "review" ? (
          <RotateCcw className="h-6 w-6" />
        ) : (
          <span className="text-lg font-black">{level}</span>
        )}
      </span>
      <span>
        <span className="block text-lg font-black">Lv. {level}</span>
        <span className="block text-sm font-black opacity-75">{label}</span>
      </span>
    </button>
  );
}

function getStateLabel(state) {
  if (state === "complete") return "완료";
  if (state === "current") return "현재 레벨";
  if (state === "locked") return "잠김";
  if (state === "review") return "복습 추천";
  return "열림";
}
