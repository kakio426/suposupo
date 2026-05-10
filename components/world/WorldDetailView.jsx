"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Leaf, Lock, Map } from "lucide-react";
import { ADDITION_PATH, getLevelMeta } from "../../lib/addition";
import { useLearningProgress } from "../../lib/use-learning-progress";
import { getWorldState, getWorldProgressValue } from "../../lib/world-state";
import { getWorldById } from "../../lib/worlds";
import { AppBackground } from "../layout/AppBackground";
import { StudentShell } from "../layout/StudentShell";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AdditionWorldMap, getNodeState } from "./AdditionWorldMap";
import { LevelDetailPanel } from "./LevelDetailPanel";

export function WorldDetailView({ worldId }) {
  const router = useRouter();
  const { progress } = useLearningProgress();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const world = getWorldById(worldId);

  if (!world) return null;

  const worldState = getWorldState(world, progress);

  if (world.id !== ADDITION_PATH.id) {
    return (
      <AppBackground>
        <StudentShell
          badge={<WorldBadge emoji={world.emoji} />}
          eyebrow={getWorldProgressValue(world, progress)}
          onBack={() => router.push("/worlds")}
          title={world.title}
        >
          <LockedOrPreviewWorld world={world} state={worldState} />
        </StudentShell>
      </AppBackground>
    );
  }

  const activeLevel = selectedLevel || progress.currentLevel;
  const selectedMeta = getLevelMeta(activeLevel);
  const selectedState = getNodeState(activeLevel, progress);

  return (
    <AppBackground>
      <StudentShell
        badge={<WorldBadge emoji={world.emoji || "➕"} />}
        eyebrow="Skill Tree"
        onBack={() => router.push("/worlds")}
        title="숲길 지도"
      >
        <LevelDetailPanel
          level={activeLevel}
          meta={selectedMeta}
          onClose={() => setSelectedLevel(null)}
          onStart={(level) => router.push(`/play/addition/${level}`)}
          state={selectedState}
        />

        <AdditionWorldMap
          onSelectLevel={setSelectedLevel}
          progress={progress}
          selectedLevel={activeLevel}
        />
      </StudentShell>
    </AppBackground>
  );
}

function WorldBadge({ emoji }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-3xl shadow-md">
      {emoji || <Leaf className="h-7 w-7 text-emerald-500" />}
    </div>
  );
}

function LockedOrPreviewWorld({ state, world }) {
  const isLocked = state === "locked";

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <Card className="space-y-5" padding="lg" variant="elevated">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-soft">
            {world.emoji}
          </div>
          <div>
            <Badge tone={isLocked ? "locked" : "brand"}>
              {isLocked ? "잠김" : "맛보기"}
            </Badge>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {world.title}
            </h2>
            <p className="mt-2 text-base font-bold leading-relaxed text-slate-600">
              {world.summary}
            </p>
          </div>
        </div>

        <div className="rounded-card bg-white/70 p-4">
          <p className="text-sm font-black text-slate-400">열림 안내</p>
          <p className="mt-1 text-lg font-black leading-relaxed text-slate-800">
            {world.unlockHint}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MiniInfo label="핵심 단계" value={`${world.stageCount}단계`} />
          <MiniInfo label="앱 레벨" value={`${world.levelCount}레벨`} />
          <MiniInfo label="조작 방식" value={world.interactionMode} />
          <MiniInfo label="상태" value={isLocked ? "조금 뒤에 열려요" : "둘러볼 수 있어요"} />
        </div>

        <Button
          iconLeft={isLocked ? <Lock className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
          tone={isLocked ? "neutral" : "brand"}
          variant={isLocked ? "secondary" : "primary"}
          disabled={isLocked}
        >
          {isLocked ? "아직 잠겨 있어요" : "맛보기 준비 중"}
        </Button>
      </Card>

      <Card className="space-y-3" padding="sm" variant="status">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-emerald-600" />
          <p className="font-black text-slate-900">앞으로 만날 조각</p>
        </div>
        <div className="space-y-2">
          {world.stages.slice(0, 4).map((stage) => (
            <div className="rounded-control bg-white/70 p-3" key={stage.stage}>
              <p className="text-sm font-black text-slate-400">
                Step {stage.stage}
              </p>
              <p className="font-black text-slate-800">{stage.title}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-control bg-white/70 p-4">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-1 text-base font-black text-slate-800">{value}</p>
    </div>
  );
}
