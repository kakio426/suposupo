import { Map, Play, Sparkles } from "lucide-react";
import { QUESTION_COUNT } from "../../lib/addition";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function TodayPanel({
  levelMeta,
  primaryAction,
  progress,
  secondaryActions = [],
  syncState
}) {
  const placementDone = progress.placementCompleted;

  return (
    <Card className="space-y-5" padding="lg" variant="command">
      <div className="rounded-card bg-gradient-to-br from-emerald-100 via-lime-100 to-sky-100 p-5">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge className="bg-white px-4 py-2 text-lg" tone="brand">
            {placementDone ? `이어하기 Lv. ${progress.currentLevel}` : "처음이라면 진단부터"}
          </Badge>
          <Badge className="bg-brand-500 text-white" tone="brand">
            {QUESTION_COUNT}문제
          </Badge>
        </div>
        <p className="mb-2 text-sm font-black text-brand-700">오늘의 추천</p>
        <h2 className="font-display text-3xl font-black text-slate-950">
          {levelMeta.title}
        </h2>
        <p className="mt-3 text-lg font-bold leading-relaxed text-slate-600">
          {placementDone
            ? `${levelMeta.focus}을 게임처럼 톡톡 풀어봐요.`
            : "짧은 맞춤 찾기로 지금 맞는 숲길을 찾아요."}{" "}
          학교 단계는 숨기고, 지금 필요한 숫자 감각만 키워요.
        </p>
        {syncState === "error" && (
          <p className="mt-3 text-sm font-black text-warning-900">
            서버 저장은 잠시 쉬어도 이 기기 기록은 안전해요.
          </p>
        )}
      </div>

      <Button iconRight={<Play className="h-7 w-7 fill-white" />} onClick={primaryAction.onClick} size="xl">
        {primaryAction.label}
      </Button>

      {secondaryActions.map((action) => (
        <Button
          iconRight={action.icon === "sparkles" ? <Sparkles className="h-6 w-6" /> : <Map className="h-6 w-6" />}
          key={action.label}
          onClick={action.onClick}
          tone={action.tone}
          variant={action.variant}
        >
          {action.label}
        </Button>
      ))}
    </Card>
  );
}
