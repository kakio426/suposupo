import { ArrowRight, Lock, RotateCcw, X } from "lucide-react";
import { QUESTION_COUNT } from "../../lib/addition";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { IconButton } from "../ui/IconButton";

export function LevelDetailPanel({
  level,
  meta,
  onClose,
  onStart,
  state = "open"
}) {
  const locked = state === "locked";
  const review = state === "review";

  return (
    <Card className="space-y-4" padding="lg" tone={locked ? "locked" : "warm"} variant="elevated">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone={locked ? "locked" : review ? "warning" : "brand"}>
            {getStateText(state)}
          </Badge>
          <h3 className="mt-3 text-3xl font-black text-slate-950">
            더하기 숲 Lv. {level}
          </h3>
          <p className="mt-2 text-base font-black leading-relaxed text-slate-600">
            {meta.title}
          </p>
        </div>
        <IconButton ariaLabel="레벨 상세 닫기" onClick={onClose} variant="quiet">
          <X className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="rounded-card bg-white/70 p-4">
        <p className="text-sm font-black text-slate-400">레벨 목표</p>
        <p className="mt-1 text-lg font-black leading-relaxed text-slate-800">
          {meta.focus}을 짧은 문제로 확인해요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MiniSpec label="문제 수" value={`${QUESTION_COUNT}문제`} />
        <MiniSpec label="조작 방식" value={getInteractionMode(meta.skillId)} />
      </div>

      {locked ? (
        <p className="rounded-control bg-white/70 p-4 text-sm font-black text-slate-500">
          앞 숲길을 조금 더 걷고 나면 열려요.
        </p>
      ) : (
        <Button
          iconRight={review ? <RotateCcw className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
          onClick={() => onStart(level)}
          tone={review ? "warm" : "brand"}
        >
          {review ? "비슷한 문제로 복습하기" : "시작하기"}
        </Button>
      )}
    </Card>
  );
}

function MiniSpec({ label, value }) {
  return (
    <div className="rounded-control bg-white/70 p-4">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-1 text-base font-black text-slate-800">{value}</p>
    </div>
  );
}

function getStateText(state) {
  if (state === "complete") return "완료";
  if (state === "current") return "추천";
  if (state === "locked") return "잠김";
  if (state === "review") return "복습 추천";
  return "열림";
}

function getInteractionMode(skillId) {
  if (skillId === "make_10") return "텐 프레임";
  if (skillId === "two_digit_with_carry") return "받아올림 조각";
  if (skillId === "missing_addend") return "숨은 조각";
  return "4지선다";
}
