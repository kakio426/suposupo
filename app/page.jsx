"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Flame,
  Home,
  Leaf,
  Map,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from "lucide-react";
import { FeedbackPanel } from "../components/quiz/FeedbackPanel";
import { QuizChoice } from "../components/quiz/QuizChoice";
import { RecentRecord } from "../components/home/RecentRecord";
import { SaveStatusPanel } from "../components/home/SaveStatusPanel";
import { TodayPanel } from "../components/home/TodayPanel";
import { QuizLayout, QuizPromptCard } from "../components/layout/QuizLayout";
import { ResultLayout } from "../components/layout/ResultLayout";
import { StudentShell } from "../components/layout/StudentShell";
import { AdditionWorldMap, getNodeState } from "../components/world/AdditionWorldMap";
import { LevelDetailPanel } from "../components/world/LevelDetailPanel";
import { WorldCard } from "../components/world/WorldCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  ADDITION_PATH,
  MAX_LEVEL,
  QUESTION_COUNT,
  STORAGE_KEY,
  applyPlacementToProgress,
  applyAttemptToProgress,
  buildAttempt,
  createInitialProgress,
  describeMistake,
  evaluateAttempt,
  evaluatePlacement,
  generateAdditionQuestions,
  generatePlacementQuestions,
  getLevelMeta,
  normalizeProgress
} from "../lib/addition";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import {
  migrateLocalProgressToSupabase,
  saveAttemptToSupabase,
  saveRemoteProgress
} from "../lib/supabase-progress";
import { getWorldById } from "../lib/worlds";

export default function MathApp() {
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState(createInitialProgress);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);
  const [activeLevel, setActiveLevel] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState("level");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizStartedAt, setQuizStartedAt] = useState(null);
  const [questionStartedAt, setQuestionStartedAt] = useState(null);
  const [resultAttempt, setResultAttempt] = useState(null);
  const [placementResult, setPlacementResult] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("checking");
  const [syncStatus, setSyncStatus] = useState("local");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setProgress(normalizeProgress(JSON.parse(saved)));
    }

    setHasLoadedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedProgress) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hasLoadedProgress, progress]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthStatus("disabled");
      setSyncStatus("local");
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;

      const user = data.session?.user || null;
      setAuthUser(user);
      setAuthStatus(user ? "authenticated" : "anonymous");
      setSyncStatus(user ? "syncing" : "local");
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null;
      setAuthUser(user);
      setAuthStatus(user ? "authenticated" : "anonymous");
      setSyncStatus(user ? "syncing" : "local");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedProgress || !authUser || !isSupabaseConfigured) return;

    let cancelled = false;

    async function syncInitialProgress() {
      setAuthMessage("");
      setSyncStatus("syncing");

      const { progress: syncedProgress, error } =
        await migrateLocalProgressToSupabase(authUser.id, progress);

      if (cancelled) return;

      if (error) {
        setAuthMessage("서버 저장을 확인하지 못해서 로컬 기록으로 계속할게요.");
        setSyncStatus("error");
        return;
      }

      setProgress(syncedProgress);
      setSyncStatus("synced");
    }

    syncInitialProgress();

    return () => {
      cancelled = true;
    };
  }, [hasLoadedProgress, authUser?.id]);

  const completedCount = progress.completedLevels.length;
  const progressPercent = Math.round((completedCount / MAX_LEVEL) * 100);
  const currentLevelMeta = getLevelMeta(progress.currentLevel);
  const activeWorld = getWorldById("addition");

  const openMap = () => {
    setSelectedLevel(progress.currentLevel);
    setScreen("map");
  };

  const startLevel = (level) => {
    const safeLevel = Math.min(
      Math.max(1, level),
      progress.highestUnlockedLevel
    );

    setActiveLevel(safeLevel);
    setSelectedLevel(null);
    setQuizMode("level");
    setQuestions(generateAdditionQuestions(safeLevel, QUESTION_COUNT));
    setCurrentIndex(0);
    setScore(0);
    setAnswerLog([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setResultAttempt(null);
    setQuizStartedAt(Date.now());
    setQuestionStartedAt(Date.now());
    setScreen("quiz");
  };

  const startPlacement = () => {
    setActiveLevel(1);
    setSelectedLevel(null);
    setQuizMode("placement");
    setQuestions(generatePlacementQuestions());
    setCurrentIndex(0);
    setScore(0);
    setAnswerLog([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setResultAttempt(null);
    setPlacementResult(null);
    setQuizStartedAt(Date.now());
    setQuestionStartedAt(Date.now());
    setScreen("quiz");
  };

  const handleSignIn = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthMessage(".env.local에 Supabase URL과 key를 넣으면 로그인을 켤 수 있어요.");
      return;
    }

    setAuthMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      setAuthMessage("Google 로그인을 시작하지 못했어요. Supabase 설정을 확인해 주세요.");
    }
  };

  const handleSignOut = async () => {
    if (!isSupabaseConfigured || !supabase) return;

    await supabase.auth.signOut();
    setAuthUser(null);
    setAuthStatus("anonymous");
    setSyncStatus("local");
    setAuthMessage("");
  };

  const finishAttempt = (finalScore, finalAnswers) => {
    if (quizMode === "placement") {
      const placement = evaluatePlacement(finalAnswers);
      const updatedProgress = applyPlacementToProgress(progress, placement);

      setPlacementResult({
        ...placement,
        score: finalScore,
        total: questions.length
      });
      setProgress(updatedProgress);
      if (authUser) {
        saveRemoteProgress(authUser.id, updatedProgress).then(({ error }) => {
          if (error) {
            setAuthMessage("진단 결과를 서버에 저장하지 못했어요. 로컬에는 저장됐어요.");
            setSyncStatus("error");
          } else {
            setSyncStatus("synced");
          }
        });
      }
      setScreen("placement-result");
      return;
    }

    const attempt = buildAttempt({
      level: activeLevel,
      score: finalScore,
      total: questions.length,
      durationMs: Date.now() - quizStartedAt,
      answers: finalAnswers
    });
    const updatedProgress = applyAttemptToProgress(progress, attempt);

    setResultAttempt(attempt);
    setProgress(updatedProgress);
    if (authUser) {
      Promise.all([
        saveRemoteProgress(authUser.id, updatedProgress),
        saveAttemptToSupabase(authUser.id, attempt)
      ]).then((results) => {
        if (results.some((result) => result.error)) {
          setAuthMessage("풀이 기록 일부를 서버에 저장하지 못했어요. 로컬 기록은 유지돼요.");
          setSyncStatus("error");
        } else {
          setSyncStatus("synced");
        }
      });
    }
    setScreen("result");
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fef3c7_0,#dbeafe_34%,#dcfce7_70%,#f8fafc_100%)] font-game text-slate-900">
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
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onStartPlacement={startPlacement}
          onStart={() => startLevel(progress.currentLevel)}
          progress={progress}
          progressPercent={progressPercent}
          syncStatus={syncStatus}
        />
      )}

      {screen === "map" && (
        <SkillMapView
          onBack={() => setScreen("home")}
          onSelectLevel={setSelectedLevel}
          onStartLevel={startLevel}
          progress={progress}
          selectedLevel={selectedLevel}
        />
      )}

      {screen === "quiz" && questions.length > 0 && (
        <QuizView
          activeLevel={activeLevel}
          currentIndex={currentIndex}
          isCorrect={isCorrect}
          mode={quizMode}
          onExit={() => setScreen("home")}
          onSelectOption={handleSelectOption}
          question={questions[currentIndex]}
          questionCount={questions.length}
          selectedOption={selectedOption}
        />
      )}

      {screen === "result" && resultAttempt && (
        <ResultView
          attempt={resultAttempt}
          onDashboard={() => setScreen("home")}
          onMap={openMap}
          onNextLevel={() => startLevel(Math.min(activeLevel + 1, MAX_LEVEL))}
          onRetry={() => startLevel(activeLevel)}
        />
      )}

      {screen === "placement-result" && placementResult && (
        <PlacementResultView
          onOpenMap={openMap}
          onStart={() => startLevel(placementResult.level)}
          result={placementResult}
        />
      )}
    </main>
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

        <WorldPreviewRail onOpenMap={onOpenMap} progress={progress} />
      </div>
    </StudentShell>
  );
}

function WorldPreviewRail({ onOpenMap, progress }) {
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
                onSelect={world.id === "addition" ? onOpenMap : undefined}
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

function SkillMapView({
  onBack,
  onSelectLevel,
  onStartLevel,
  progress,
  selectedLevel
}) {
  const selectedMeta = selectedLevel ? getLevelMeta(selectedLevel) : null;
  const selectedState = selectedLevel
    ? getNodeState(selectedLevel, progress)
    : "open";

  return (
    <StudentShell
      badge={
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-emerald-500 shadow-md">
          <Leaf className="h-7 w-7" />
        </div>
      }
      eyebrow="Skill Tree"
      maxWidth="lg"
      onBack={onBack}
      title="숲길 지도"
    >
      {selectedLevel && selectedMeta && (
        <LevelDetailPanel
          level={selectedLevel}
          meta={selectedMeta}
          onClose={() => onSelectLevel(null)}
          onStart={onStartLevel}
          state={selectedState}
        />
      )}

      <AdditionWorldMap
        onSelectLevel={onSelectLevel}
        progress={progress}
        selectedLevel={selectedLevel}
      />
    </StudentShell>
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
            message={isCorrect ? "" : "초록 조각을 보고 다음에 비교해요."}
            title={isCorrect ? "좋아요, 정답!" : "괜찮아요, 정답을 확인해요"}
            tone={isCorrect ? "success" : "repair"}
          />
        )
      }
      levelLabel={`${currentIndex + 1}/${questionCount}`}
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

function ResultView({ attempt, onDashboard, onMap, onNextLevel, onRetry }) {
  const feedback = useMemo(
    () => evaluateAttempt(attempt.score, attempt.total),
    [attempt.score, attempt.total]
  );
  const wrongAnswers = attempt.answers.filter((answer) => !answer.isCorrect);
  const firstWeakPoint = wrongAnswers[0];
  const levelMeta = getLevelMeta(attempt.level);
  const reachedFinalLevel = attempt.level >= MAX_LEVEL;
  const masteryState = getMasteryState(feedback.tone, attempt.canAdvance);

  return (
    <ResultLayout
      actions={
        <>
          {attempt.canAdvance && !reachedFinalLevel ? (
            <Button
              iconRight={<ArrowRight className="h-6 w-6" />}
              onClick={onNextLevel}
            >
              다음 레벨 도전하기
            </Button>
          ) : (
            <Button
              iconRight={<RotateCcw className="h-6 w-6" />}
              onClick={onRetry}
              tone="warm"
            >
              비슷한 문제 다시 풀기
            </Button>
          )}

          <Button
            iconLeft={<Map className="h-6 w-6" />}
            onClick={onMap}
            tone="neutral"
            variant="secondary"
          >
            숲길 지도 보기
          </Button>

          <Button
            iconLeft={<Home className="h-5 w-5" />}
            onClick={onDashboard}
            size="md"
            tone="neutral"
            variant="quiet"
          >
            홈으로 돌아가기
          </Button>
        </>
      }
      attempt={attempt}
      masteryState={masteryState}
      message={feedback.message}
      title={feedback.title}
    >
      <div className="my-7 rounded-[1.6rem] bg-slate-50 p-5">
        <div className="mb-3 text-6xl font-black text-emerald-500">
          {attempt.score}
          <span className="text-3xl text-slate-300"> / {attempt.total}</span>
        </div>
        <div className="flex justify-center gap-1">
          {Array.from({ length: attempt.total }, (_, index) => (
            <Star
              className={`h-8 w-8 ${
                index < attempt.score
                  ? "fill-amber-300 text-amber-300"
                  : "fill-slate-200 text-slate-200"
              }`}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 text-left">
        <ResultNote
          icon={<ShieldCheck className="h-6 w-6" />}
          label="잘한 부분"
          text={feedback.strength}
        />
        <ResultNote
          icon={<Flame className="h-6 w-6" />}
          label="다음 행동"
          text={feedback.next}
        />
        <ResultNote
          icon={<Sparkles className="h-6 w-6" />}
          label="오늘의 감각"
          text={
            firstWeakPoint
              ? `${levelMeta.focus}에서 '${firstWeakPoint.mistakeType}'를 한 번 만났어요.`
              : `${levelMeta.focus} 감각이 아주 안정적이에요.`
          }
        />
      </div>
    </ResultLayout>
  );
}

function ResultNote({ icon, label, text }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-slate-400">{label}</p>
        <p className="text-base font-black leading-snug text-slate-700">{text}</p>
      </div>
    </div>
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

function getWorldState(world, progress) {
  if (world.id === "addition") {
    return progress.completedLevels.length >= MAX_LEVEL ? "completed" : "current";
  }

  if (world.unlockState === "bonus-open") return "preview";
  if (world.unlockState === "locked") return "locked";
  if (world.unlockState === "open") return "open";

  return "preview";
}

function getWorldProgressValue(world, progress) {
  if (world.id === "addition") return `진행 Lv.${progress.currentLevel}`;
  if (world.unlockState === "bonus-open") return "맛보기 준비";
  if (world.unlockState === "locked") return "잠김";
  return "열림";
}

function getMasteryState(tone, canAdvance) {
  if (tone === "perfect") return "mastered";
  if (canAdvance) return "ready";
  return "review";
}
