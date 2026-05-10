import { Leaf } from "lucide-react";
import { ADDITION_LEVELS, getLevelMeta } from "../../lib/addition";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import { SkillNode } from "./SkillNode";

const CLUSTERS = [
  { id: "compose", levels: [1, 2, 3], title: "작은 수 모으기" },
  { id: "make-10", levels: [4, 5, 6], title: "10 만들기" },
  { id: "one-digit", levels: [7, 8, 9], title: "한 자리 덧셈" },
  { id: "carry-start", levels: [10, 11, 12, 13], title: "받아올림 입구" },
  { id: "two-digit-one", levels: [14, 15, 16, 17], title: "두 자리와 한 자리" },
  { id: "single-carry", levels: [18, 19, 20, 21, 22], title: "받아올림 한 번" },
  { id: "large-number", levels: [23, 24, 25, 26, 27], title: "큰 수 덧셈" },
  { id: "three-addends", levels: [28, 29, 30], title: "세 수 더하기" }
];

export function AdditionWorldMap({
  onSelectLevel,
  progress,
  selectedLevel
}) {
  const completedCount = progress.completedLevels.length;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
      <div className="space-y-5">
        <Card padding="sm" variant="status">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-slate-400">현재 추천</p>
              <p className="text-2xl font-black text-slate-900">
                Lv. {progress.currentLevel} · {getLevelMeta(progress.currentLevel).title}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-emerald-500 shadow-md">
              <Leaf className="h-7 w-7" />
            </div>
          </div>
          <ProgressBar
            className="mt-4"
            label="더하기 숲 진행률"
            max={ADDITION_LEVELS.length}
            value={completedCount}
          />
        </Card>

        <div className="space-y-4">
          {CLUSTERS.map((cluster) => (
            <Card className="space-y-3" key={cluster.id} padding="sm" variant="plain">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-900">
                  {cluster.title}
                </h2>
                <Badge tone="brand">
                  Lv. {cluster.levels[0]}-{cluster.levels.at(-1)}
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cluster.levels.map((level) => {
                  const node = ADDITION_LEVELS[level - 1];
                  const nodeState = getNodeState(level, progress);

                  return (
                    <SkillNode
                      key={level}
                      label={node.title}
                      level={level}
                      onSelect={onSelectLevel}
                      state={level === selectedLevel && nodeState !== "locked" ? "current" : nodeState}
                    />
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <aside className="space-y-3 lg:sticky lg:top-6">
        <Card padding="sm" variant="status">
          <p className="text-sm font-black text-slate-400">지도 표시</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">추천</Badge>
            <Badge tone="success">완료</Badge>
            <Badge tone="warning">복습</Badge>
            <Badge tone="locked">잠김</Badge>
          </div>
        </Card>
      </aside>
    </div>
  );
}

export function getNodeState(level, progress) {
  if (level > progress.highestUnlockedLevel) return "locked";
  if (progress.currentLevel === level) return "current";
  if (progress.completedLevels.includes(level)) return "complete";

  const recentAttempt = progress.recentAttempts.find(
    (attempt) => attempt.level === level
  );

  if (recentAttempt && !recentAttempt.canAdvance) return "review";

  return "open";
}
