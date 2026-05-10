import { Check, CircleHelp, X } from "lucide-react";

const stateStyles = {
  idle: {
    frame: "border-brand-100 bg-white/85",
    filled: "border-emerald-500 bg-emerald-400 text-emerald-950",
    empty: "border-dashed border-amber-300 bg-amber-50 text-amber-700"
  },
  correct: {
    frame: "border-success-200 bg-success-50",
    filled: "border-success-600 bg-success-400 text-success-950",
    empty: "border-dashed border-success-400 bg-white text-success-700"
  },
  incorrect: {
    frame: "border-warning-200 bg-warning-50",
    filled: "border-emerald-500 bg-emerald-400 text-emerald-950",
    empty: "border-dashed border-warning-500 bg-white text-warning-800"
  }
};

export function TenFrameModel({
  filledSlots,
  label,
  missingSlots,
  state = "idle",
  totalSlots
}) {
  const safeTotal = Math.max(1, Number(totalSlots) || 10);
  const safeFilled = clamp(Number(filledSlots) || 0, 0, safeTotal);
  const safeMissing = clamp(
    Number(missingSlots) || safeTotal - safeFilled,
    0,
    safeTotal
  );
  const styles = stateStyles[state] || stateStyles.idle;
  const slots = Array.from({ length: safeTotal }, (_, index) => ({
    index,
    filled: index < safeFilled
  }));
  const firstFrame = slots.slice(0, 10);
  const extension = slots.slice(10);
  const statusIcon = getStatusIcon(state);

  return (
    <section
      aria-label={
        label ||
        `텐 프레임: ${safeTotal}칸 중 ${safeFilled}칸이 채워지고 ${safeMissing}칸이 비어 있어요.`
      }
      className={`rounded-card border-2 p-4 shadow-soft ${styles.frame}`}
      role="group"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-400">텐 프레임</p>
          <p className="text-lg font-black leading-tight text-slate-900">
            빈칸 {safeMissing}개를 채우면 {safeTotal}이 돼요
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
          {statusIcon}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {firstFrame.map((slot) => (
          <TenFrameSlot key={slot.index} slot={slot} styles={styles} />
        ))}
      </div>

      {extension.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-xs font-black text-slate-400">
            10을 넘는 확장 칸
          </p>
          <div className="grid grid-cols-5 gap-2">
            {extension.map((slot) => (
              <TenFrameSlot key={slot.index} slot={slot} styles={styles} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-sm font-black">
        <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-700">
          채운 칸 {safeFilled}
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-700">
          빈칸 {safeMissing}
        </span>
      </div>
    </section>
  );
}

function TenFrameSlot({ slot, styles }) {
  return (
    <div
      aria-hidden="true"
      className={`flex aspect-square min-h-10 items-center justify-center rounded-control border-2 text-sm font-black ${
        slot.filled ? styles.filled : styles.empty
      }`}
    >
      {slot.filled ? "●" : "?"}
    </div>
  );
}

function getStatusIcon(state) {
  if (state === "correct") return <Check className="h-6 w-6" />;
  if (state === "incorrect") return <X className="h-6 w-6" />;
  return <CircleHelp className="h-6 w-6" />;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
