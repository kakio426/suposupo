import { X } from "lucide-react";
import { ADDITION_PATH } from "../../lib/addition";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { IconButton } from "../ui/IconButton";
import { ProgressBar } from "../ui/ProgressBar";

export function QuizLayout({
  children,
  choices = null,
  feedback = null,
  levelLabel,
  onExit,
  progress,
  prompt
}) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <header className="flex items-center gap-4 pt-2">
        <IconButton ariaLabel="홈으로 돌아가기" onClick={onExit}>
          <X className="h-7 w-7" />
        </IconButton>
        <ProgressBar label="퀴즈 진행률" value={progress} />
        <Badge className="bg-white/90 px-3 py-2 shadow-soft" tone="brand">
          {levelLabel}
        </Badge>
      </header>

      <div className="flex flex-1 flex-col justify-center pb-8 pt-10">
        <div className="mb-8 flex justify-center">
          <Badge className="px-5 py-2 text-base shadow-soft" tone="brand">
            {prompt}
          </Badge>
        </div>

        {children}

        <div className="mt-5 min-h-12 text-center">{feedback}</div>
      </div>

      {choices}
    </section>
  );
}

export function QuizPromptCard({ mode, activeLevel, question }) {
  return (
    <Card className="text-center" padding="lg" variant="elevated">
      <p className="mb-5 text-lg font-black text-slate-400">
        {mode === "placement"
          ? "맞춤 숲길 찾기"
          : `${ADDITION_PATH.title} Lv. ${activeLevel}`}
      </p>
      <h2 className="font-display text-6xl font-black tracking-tight text-slate-900">
        {question}
      </h2>
    </Card>
  );
}
