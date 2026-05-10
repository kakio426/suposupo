import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { cx, focusRing } from "../ui/styles";

const stateTone = {
  completed: "success",
  current: "success",
  locked: "locked",
  open: "success",
  preview: "sky",
  review: "warning"
};

const stateLabels = {
  completed: "완료",
  current: "진행 중",
  locked: "잠김",
  open: "열림",
  preview: "맛보기",
  review: "복습 추천"
};

export function WorldCard({
  onSelect,
  progressValue,
  state = "preview",
  world
}) {
  const locked = state === "locked";
  const actionable = Boolean(onSelect) && !locked;

  const handleKeyDown = (event) => {
    if (!actionable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <Card
      className={cx(
        "h-full rounded-[1.3rem] border-2 text-left transition-all duration-fast",
        actionable &&
          "cursor-pointer motion-safe:hover:-translate-y-0.5",
        actionable && focusRing
      )}
      onClick={actionable ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      padding="sm"
      role={actionable ? "button" : undefined}
      tabIndex={actionable ? 0 : undefined}
      tone={stateTone[state] || "neutral"}
      variant="world"
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm",
            locked && "bg-slate-100 grayscale"
          )}
        >
          {world.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h4 className="truncate text-lg font-black text-slate-900">
              {world.title}
            </h4>
            <Badge tone={locked ? "locked" : state === "preview" ? "neutral" : "brand"}>
              {progressValue || stateLabels[state] || stateLabels.preview}
            </Badge>
          </div>

          <p className="text-sm font-bold leading-relaxed text-slate-600">
            {world.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>핵심 {world.stageCount}단계</Badge>
            <Badge>앱 {world.levelCount}레벨</Badge>
          </div>
          <p className="mt-2 text-xs font-black leading-relaxed text-slate-400">
            {world.unlockHint} · {world.interactionMode}
          </p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-slate-500">
            {world.keyLeap}
          </p>
        </div>
      </div>
    </Card>
  );
}
