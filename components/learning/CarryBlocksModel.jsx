import { ArrowUp, Check, CircleHelp, X } from "lucide-react";

const stateStyles = {
  idle: {
    frame: "border-brand-100 bg-white/85",
    group: "border-brand-100 bg-brand-50",
    chip: "bg-white text-brand-700"
  },
  correct: {
    frame: "border-success-200 bg-success-50",
    group: "border-success-200 bg-white",
    chip: "bg-success-100 text-success-700"
  },
  incorrect: {
    frame: "border-warning-200 bg-warning-50",
    group: "border-warning-200 bg-white",
    chip: "bg-warning-100 text-warning-800"
  }
};

export function CarryBlocksModel({ label, model, state = "idle" }) {
  const styles = stateStyles[state] || stateStyles.idle;
  const statusIcon = getStatusIcon(state);
  const accessibleLabel =
    label ||
    [
      "받아올림 조각 모델.",
      `일의 자리 ${model.ones.left} 더하기 ${model.ones.right}은 ${model.ones.sum}.`,
      `${model.ones.carry}개가 십의 자리로 올라가고 일의 자리는 ${model.ones.remainder}.`,
      `십의 자리는 ${model.tens.left}, ${model.tens.right}, 올라간 ${model.tens.carried}을 더해 ${model.tens.sum}.`,
      `전체 합은 ${model.total}.`
    ].join(" ");

  return (
    <section
      aria-label={accessibleLabel}
      className={`rounded-card border-2 p-4 shadow-soft ${styles.frame}`}
      role="group"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-400">받아올림 조각</p>
          <p className="text-lg font-black leading-tight text-slate-900">
            일의 자리 10개가 십의 자리 1개로 올라가요
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
          {statusIcon}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <PlacePanel label="일의 자리" styles={styles}>
          <div className="flex items-center justify-center gap-2 text-2xl font-black text-slate-900">
            <span>{model.ones.left}</span>
            <span className="text-slate-400">+</span>
            <span>{model.ones.right}</span>
            <span className="text-slate-400">=</span>
            <span>{model.ones.sum}</span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: model.ones.sum }, (_, index) => (
              <UnitBlock
                carried={index < model.ones.carry * 10}
                key={index}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm font-black text-slate-600">
            <ArrowUp className="h-5 w-5 text-emerald-600" />
            <span>10개 묶음 {model.ones.carry}개 올라감</span>
          </div>
          <div className="mt-2 text-center text-sm font-black text-slate-500">
            남은 일의 자리 {model.ones.remainder}
          </div>
        </PlacePanel>

        <PlacePanel label="십의 자리" styles={styles}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <CarryChip label="처음" styles={styles} value={model.tens.left} />
            <CarryChip label="더함" styles={styles} value={model.tens.right} />
            <CarryChip
              label="올라감"
              styles={styles}
              value={model.tens.carried}
            />
          </div>
          <div className="mt-4 rounded-control bg-white/70 p-3 text-center">
            <p className="text-xs font-black text-slate-400">십의 자리 합</p>
            <p className="text-3xl font-black text-emerald-600">
              {model.tens.sum}
            </p>
          </div>
          <div className="mt-3 rounded-control bg-emerald-100 p-3 text-center">
            <p className="text-xs font-black text-emerald-700">전체 합</p>
            <p className="text-4xl font-black text-emerald-700">
              {model.total}
            </p>
          </div>
        </PlacePanel>
      </div>
    </section>
  );
}

function PlacePanel({ children, label, styles }) {
  return (
    <div className={`rounded-card border-2 p-3 ${styles.group}`}>
      <p className="mb-3 text-center text-sm font-black text-slate-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function CarryChip({ label, styles, value }) {
  return (
    <div className={`rounded-control px-2 py-3 ${styles.chip}`}>
      <p className="text-[0.7rem] font-black text-slate-400">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}

function UnitBlock({ carried }) {
  return (
    <span
      aria-hidden="true"
      className={`h-4 w-4 rounded-[0.35rem] border ${
        carried
          ? "border-emerald-500 bg-emerald-400"
          : "border-amber-400 bg-amber-200"
      }`}
    />
  );
}

function getStatusIcon(state) {
  if (state === "correct") return <Check className="h-6 w-6" />;
  if (state === "incorrect") return <X className="h-6 w-6" />;
  return <CircleHelp className="h-6 w-6" />;
}
