"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, Map } from "lucide-react";
import { ADDITION_PATH, MAX_LEVEL } from "../../lib/addition";
import { getWorldById } from "../../lib/worlds";
import { AppBackground } from "../layout/AppBackground";
import { StudentShell } from "../layout/StudentShell";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AdditionPlaySession } from "./AdditionPlaySession";

export function PlayRouteView({ levelParam, worldId }) {
  const router = useRouter();
  const level = Number(levelParam);
  const world = getWorldById(worldId);
  const validLevel = Number.isInteger(level) && level >= 1 && level <= MAX_LEVEL;

  if (!world || world.id !== ADDITION_PATH.id) {
    return (
      <SafePlayFallback
        message={
          world
            ? `${world.title} 플레이는 아직 준비 중이에요. 먼저 열려 있는 더하기 숲을 걸어볼게요.`
            : "이 월드는 아직 수포수포 지도에 없어요. 전체 지도에서 다시 골라볼게요."
        }
        onPrimary={() => router.push("/worlds")}
        primaryLabel="전체 월드 지도 보기"
        title="아직 준비 중인 길이에요"
      />
    );
  }

  if (!validLevel) {
    return (
      <SafePlayFallback
        message="레벨 주소가 조금 어긋났어요. 더하기 숲 지도에서 다시 안전하게 시작해요."
        onPrimary={() => router.push("/worlds/addition")}
        primaryLabel="더하기 숲 지도 보기"
        title="숲길을 다시 고를게요"
      />
    );
  }

  return (
    <AppBackground>
      <AdditionPlaySession
        key={level}
        level={level}
        onExit={() => router.push("/")}
        onMap={() => router.push("/worlds/addition")}
      />
    </AppBackground>
  );
}

function SafePlayFallback({ message, onPrimary, primaryLabel, title }) {
  return (
    <AppBackground>
      <StudentShell
        badge={
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-warning-600 shadow-md">
            <AlertTriangle className="h-6 w-6" />
          </div>
        }
        eyebrow="Play"
        maxWidth="sm"
        title={title}
      >
        <Card className="space-y-5 text-center" padding="lg" variant="result">
          <Badge className="mx-auto" tone="warning">
            안전 안내
          </Badge>
          <p className="text-lg font-bold leading-relaxed text-slate-600">
            {message}
          </p>
          <Button iconLeft={<Map className="h-6 w-6" />} onClick={onPrimary}>
            {primaryLabel}
          </Button>
        </Card>
      </StudentShell>
    </AppBackground>
  );
}
