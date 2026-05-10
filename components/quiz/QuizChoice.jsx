import { Check, X } from "lucide-react";
import { cx, focusRing } from "../ui/styles";

const stateClasses = {
  idle:
    "border-neutral-200 bg-white text-neutral-800 shadow-control hover:-translate-y-0.5 hover:bg-neutral-50",
  selected:
    "border-brand-600 bg-brand-100 text-brand-800 ring-4 ring-brand-200 shadow-control",
  correct:
    "border-success-600 bg-success-100 text-success-800 ring-4 ring-success-300 shadow-control",
  incorrect:
    "motion-safe:animate-shake border-danger-600 bg-danger-100 text-danger-800 ring-4 ring-danger-300 shadow-control",
  "revealed-correct":
    "border-success-600 bg-success-100 text-success-800 opacity-90 shadow-control",
  disabled: "border-neutral-100 bg-white/80 text-neutral-400 opacity-60 shadow-soft"
};

export function QuizChoice({
  disabled = false,
  onSelect,
  state = "idle",
  value
}) {
  const finalState = disabled && state === "idle" ? "disabled" : state;
  const showCheck = finalState === "correct" || finalState === "revealed-correct";
  const showX = finalState === "incorrect";

  return (
    <button
      aria-label={`${value} 선택지, ${getStateLabel(finalState)}`}
      className={cx(
        "relative flex min-h-32 items-center justify-center rounded-choice border-b-[7px] px-5 py-8 text-5xl font-black transition-all duration-fast motion-safe:active:translate-y-1 motion-safe:active:scale-95 motion-safe:active:border-b-2",
        focusRing,
        stateClasses[finalState] || stateClasses.idle
      )}
      disabled={disabled}
      onClick={() => onSelect(value)}
      type="button"
    >
      {value}
      {showCheck && (
        <Check className="absolute right-4 top-4 h-7 w-7 text-success-600" />
      )}
      {showX && <X className="absolute right-4 top-4 h-7 w-7 text-danger-600" />}
    </button>
  );
}

function getStateLabel(state) {
  if (state === "correct") return "정답";
  if (state === "incorrect") return "선택한 오답";
  if (state === "revealed-correct") return "정답 보기";
  if (state === "disabled") return "비활성";
  if (state === "selected") return "선택됨";
  return "선택 가능";
}
