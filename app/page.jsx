"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Leaf,
  Map,
  Sparkles,
  X
} from "lucide-react";
import { FeedbackPanel } from "../components/quiz/FeedbackPanel";
import { QuizChoice } from "../components/quiz/QuizChoice";
import { RecentRecord } from "../components/home/RecentRecord";
import { SaveStatusPanel } from "../components/home/SaveStatusPanel";
import { TodayPanel } from "../components/home/TodayPanel";
import { AppBackground } from "../components/layout/AppBackground";
import { QuizLayout, QuizPromptCard } from "../components/layout/QuizLayout";
import { StudentShell } from "../components/layout/StudentShell";
import { WorldCard } from "../components/world/WorldCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  ADDITION_PATH,
  MAX_LEVEL,
  applyPlacementToProgress,
  describeMistake,
  evaluatePlacement,
  generatePlacementQuestions,
  getRepairHint,
  getLevelMeta
} from "../lib/addition";
import { ManipulativeStage } from "../components/learning/ManipulativeStage";
import { useLearningProgress } from "../lib/use-learning-progress";
import {
  canOpenWorld,
  getWorldProgressValue,
  getWorldState
} from "../lib/world-state";
import { getWorldById } from "../lib/worlds";

export default function MathApp() {
  const router = useRouter();
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionStartedAt, setQuestionStartedAt] = useState(null);
  const [placementResult, setPlacementResult] = useState(null);
  const {
    authMessage,
    authStatus,
    handleSignIn,
    handleSignOut,
    hasLoadedProgress,
    isSupabaseConfigured,
    progress,
    saveProgress,
    authUser,
    syncStatus
  } = useLearningProgress();

  const completedCount = progress.completedLevels.length;
  const progressPercent = Math.round((completedCount / MAX_LEVEL) * 100);
  const currentLevelMeta = getLevelMeta(progress.currentLevel);
  const activeWorld = getWorldById("addition");

  const openWorld = (worldId) => {
    router.push(`/worlds/${worldId}`);
  };

  const openMap = () => {
    openWorld("addition");
  };

  const startPlacement = () => {
    setQuestions(generatePlacementQuestions());
    setCurrentIndex(0);
    setScore(0);
    setAnswerLog([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setPlacementResult(null);
    setQuestionStartedAt(Date.now());
    setScreen("quiz");
  };

  useEffect(() => {
    if (!hasLoadedProgress || screen !== "home") return;

    const params = new URLSearchParams(window.location.search);
    const startLevelParam = params.get("startLevel");
    const startLevelNumber = Number(startLevelParam);

    if (!startLevelParam) return;

    window.history.replaceState(null, "", "/");
    if (
      Number.isInteger(startLevelNumber) &&
      startLevelNumber >= 1 &&
      startLevelNumber <= MAX_LEVEL
    ) {
      router.replace(`/play/addition/${startLevelNumber}`);
    }
  }, [hasLoadedProgress, screen]);

  const finishAttempt = (finalScore, finalAnswers) => {
    const placement = evaluatePlacement(finalAnswers);
    const updatedProgress = applyPlacementToProgress(progress, placement);

    setPlacementResult({
      ...placement,
      score: finalScore,
      total: questions.length
    });
    saveProgress(updatedProgress, {
      errorMessage: "진단 결과를 서버에 저장하지 못했어요. 로컬에는 저장됐어요."
    });
    setScreen("placement-result");
  };

  const handleSelectOption = (option) => {
    if (selectedOption !== null) return;

    const question = questions[currentIndex];
    const correct = option === question.correctAnswer;
    const nextScore = correct ? score + 1 : score;
    const nextAnswers = [
      ...answerLog,
      {
        questionId: question.id,
        question: question.question,
        selectedAnswer: option,
        correctAnswer: question.correctAnswer,
        isCorrect: correct,
        skillId: question.skillId,
        focus: question.focus,
        mistakeType: describeMistake(question, option),
        durationMs: Date.now() - questionStartedAt
      }
    ];

    setSelectedOption(option);
    setIsCorrect(correct);
    setScore(nextScore);
    setAnswerLog(nextAnswers);

    window.setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((previous) => previous + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setQuestionStartedAt(Date.now());
      } else {
        finishAttempt(nextScore, nextAnswers);
      }
    }, 1000);
  };

  return (
    <AppBackground>
      {screen === "home" && (
        <HomeView
          activeWorld={activeWorld}
          authMessage={authMessage}
          authStatus={authStatus}
          authUser={authUser}
          completedCount={completedCount}
          currentLevelMeta={currentLevelMeta}
          isSupabaseConfigured={isSupabaseConfigured}
          onOpenMap={openMap}
          onOpenWorld={openWorld}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onStartPlacement={startPlacement}
          onStart={() => router.push(`/play/addition/${progress.currentLevel}`)}
          progress={progress}
          progressPercent={progressPercent}
          syncStatus={syncStatus}
        />
      )}

      {screen === "quiz" && questions.length > 0 && (
        <QuizView
          activeLevel={1}
          currentIndex={currentIndex}
          isCorrect={isCorrect}
          mode="placement"
          onExit={() => setScreen("home")}
          onSelectOption={handleSelectOption}
          question={questions[currentIndex]}
          questionCount={questions.length}
          selectedOption={selectedOption}
        />
      )}

      {screen === "placement-result" && placementResult && (
        <PlacementResultView
          onOpenMap={openMap}
          onStart={() => router.push(`/play/addition/${placementResult.level}`)}
          result={placementResult}
        />
      )}
    </AppBackground>
  );
}

function HomeView({
  activeWorld,
  authMessage,
  authStatus,
  authUser,
  completedCount,
  currentLevelMeta,
  isSupabaseConfigured,
  onOpenMap,
  onOpenWorld,
  onSignIn,
  onSignOut,
  onStartPlacement,
  onStart,
  progress,
  progressPercent,
  syncStatus
}) {
  const recentAttempt = progress.recentAttempts[0];

  return (
    <StudentShell
      badge={
        <div className="flex h-14 w-14 items-center justify-center rounded-button bg-white shadow-jelly">
          <Leaf className="h-8 w-8 text-emerald-500" />
        </div>
      }
      eyebrow={ADDITION_PATH.englishTitle}
      title={activeWorld.title}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:items-start">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <TodayPanel
            levelMeta={currentLevelMeta}
            primaryAction={{
              label: progress.placementCompleted
                ? "이어서 시작하기"
                : "Lv.1부터 시작하기",
              onClick: onStart
            }}
            progress={progress}
            secondaryActions={[
              ...(!progress.placementCompleted
                ? [
                    {
                      icon: "sparkles",
                      label: "1분 맞춤 찾기",
                      onClick: onStartPlacement,
                      tone: "warm",
                      variant: "primary"
                    }
                  ]
                : []),
              {
                icon: "map",
                label: "숲길 지도 보기",
                onClick: onOpenMap,
                tone: "neutral",
                variant: "secondary"
              }
            ]}
            syncState={syncStatus}
          />

          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatCard label="완료" value={`${completedCount}/${MAX_LEVEL}`} />
            <StatCard
              label="열린 길"
              value={`Lv.${progress.highestUnlockedLevel}`}
            />
            <StatCard label="진도" value={`${progressPercent}%`} />
          </div>

          <SaveStatusPanel
            authMessage={authMessage}
            authStatus={authStatus}
            authUser={authUser}
            isSupabaseConfigured={isSupabaseConfigured}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            syncStatus={syncStatus}
          />

          <RecentRecord recentAttempt={recentAttempt} />
        </div>

        <WorldPreviewRail onOpenWorld={onOpenWorld} progress={progress} />
      </div>
    </StudentShell>
  );
}

function WorldPreviewRail({ onOpenWorld, progress }) {
  const previewWorlds = ["addition", "shapes", "subtraction"]
    .map((id) => getWorldById(id))
    .filter(Boolean);

  return (
    <section className="mx-auto w-full max-w-md space-y-4 lg:max-w-none">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-black text-emerald-600">월드 지도</p>
          <h2 className="font-display text-2xl font-black text-slate-950">
            오늘 열어볼 수학 왕국
          </h2>
        </div>
        <Badge>단계 숨김</Badge>
      </div>

      <Card className="space-y-3 bg-white/70" padding="sm" variant="plain">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-black text-slate-900">추천 월드</h3>
            <Badge tone="brand">짧게 보기</Badge>
          </div>
          <p className="mt-1 text-sm font-bold leading-relaxed text-slate-500">
            전체 커리큘럼은 유지하되, 홈에서는 지금 필요한 길만 먼저 보여줘요.
          </p>
        </div>

        <div className="grid gap-3">
          {previewWorlds.map((world) => {
            const state = getWorldState(world, progress);
            return (
              <WorldCard
                key={world.id}
                onSelect={
                  canOpenWorld(world, state)
                    ? () => onOpenWorld(world.id)
                    : undefined
                }
                progressValue={getWorldProgressValue(world, progress)}
                state={state}
                world={world}
              />
            );
          })}
        </div>
      </Card>
    </section>
  );
}

function QuizView({
  activeLevel,
  currentIndex,
  isCorrect,
  mode,
  onExit,
  onSelectOption,
  question,
  questionCount,
  selectedOption
}) {
  const answered = selectedOption !== null;
  const progress = ((currentIndex + (answered ? 1 : 0)) / questionCount) * 100;

  return (
    <QuizLayout
      choices={
        <div className="grid grid-cols-2 gap-4 pb-6">
          {question.options.map((option, index) => {
            const selected = selectedOption === option;
            const shouldRevealCorrect =
              answered && option === question.correctAnswer && !selected;
            let choiceState = "idle";

            if (selected && isCorrect) {
              choiceState = "correct";
            } else if (selected && !isCorrect) {
              choiceState = "incorrect";
            } else if (shouldRevealCorrect) {
              choiceState = "revealed-correct";
            } else if (answered) {
              choiceState = "disabled";
            }

            return (
              <QuizChoice
                disabled={answered}
                key={`${question.id}-${option}-${index}`}
                onSelect={onSelectOption}
                state={choiceState}
                value={option}
              />
            );
          })}
        </div>
      }
      feedback={
        answered && (
          <FeedbackPanel
            icon={
              isCorrect ? (
                <Check className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )
            }
            message={isCorrect ? "" : getRepairHint(question)}
            title={isCorrect ? "좋아요, 정답!" : "괜찮아요, 정답을 확인해요"}
            tone={isCorrect ? "success" : "repair"}
          />
        )
      }
      levelLabel={`${currentIndex + 1}/${questionCount}`}
      manipulative={
        <ManipulativeStage
          answered={answered}
          isCorrect={isCorrect}
          question={question}
        />
      }
      onExit={onExit}
      progress={progress}
      prompt={question.prompt}
    >
      <QuizPromptCard
        activeLevel={activeLevel}
        mode={mode}
        question={question.question}
      />
    </QuizLayout>
  );
}

function PlacementResultView({ onOpenMap, onStart, result }) {
  return (
    <StudentShell maxWidth="sm" title="맞춤 숲길">
      <Card className="text-center" padding="lg" variant="result">
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-200 to-emerald-200 shadow-lg">
          <Sparkles className="h-16 w-16 text-emerald-600" />
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
          Placement Complete
        </p>
        <h2 className="text-4xl font-black text-slate-900">{result.title}</h2>
        <p className="mx-auto mt-3 max-w-xs text-lg font-bold leading-relaxed text-slate-600">
          {result.message}
        </p>

        <div className="my-7 rounded-[1.6rem] bg-slate-50 p-5">
          <p className="text-sm font-black text-slate-400">추천 시작점</p>
          <div className="text-6xl font-black text-emerald-500">
            Lv. {result.level}
          </div>
          <p className="mt-2 text-base font-black text-slate-500">
            진단 결과 {result.score}/{result.total}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            iconRight={<ArrowRight className="h-6 w-6" />}
            onClick={onStart}
          >
            맞춤 레벨 시작하기
          </Button>
          <Button
            iconLeft={<Map className="h-6 w-6" />}
            onClick={onOpenMap}
            tone="neutral"
            variant="secondary"
          >
            숲길 지도 보기
          </Button>
        </div>
      </Card>
    </StudentShell>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.4rem] bg-white/82 p-4 text-center shadow-lg backdrop-blur">
      <p className="text-sm font-black text-slate-400">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
