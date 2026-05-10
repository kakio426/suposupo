"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { AppBackground } from "../../components/layout/AppBackground";
import { StudentShell } from "../../components/layout/StudentShell";
import { WorldsOverview } from "../../components/world/WorldsOverview";
import { useLearningProgress } from "../../lib/use-learning-progress";

export default function WorldsPage() {
  const router = useRouter();
  const { progress } = useLearningProgress();

  return (
    <AppBackground>
      <StudentShell
        badge={
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-emerald-500 shadow-md">
            <Home className="h-6 w-6" />
          </div>
        }
        eyebrow="Worlds"
        onBack={() => router.push("/")}
        title="전체 월드 지도"
      >
        <WorldsOverview
          onOpenWorld={(worldId) => router.push(`/worlds/${worldId}`)}
          progress={progress}
        />
      </StudentShell>
    </AppBackground>
  );
}
