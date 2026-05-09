"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Flame,
  Home,
  Leaf,
  Lock,
  Map,
  PartyPopper,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  X
} from "lucide-react";
import {
  ADDITION_LEVELS,
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
import { WORLD_CATALOG, WORLD_CATEGORIES, getWorldById } from "../lib/worlds";

const NODE_OFFSETS = [
  "ml-2",
  "ml-14",
  "ml-28",
  "ml-16",
  "ml-4",
  "ml-24"
];

export default function MathApp() {
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState(createInitialProgress);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);
  const [activeLevel, setActiveLevel] = useState(1);
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

  const completedCount = progress.completedLevels.length;
  const progressPercent = Math.round((completedCount / MAX_LEVEL) * 100);
  const currentLevelMeta = getLevelMeta(progress.currentLevel);
  const activeWorld = getWorldById("addition");

  const startLevel = (level) => {
    const safeLevel = Math.min(
      Math.max(1, level),
      progress.highestUnlockedLevel
    );

    setActiveLevel(safeLevel);
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

  const finishAttempt = (finalScore, finalAnswers) => {
    if (quizMode === "placement") {
      const placement = evaluatePlacement(finalAnswers);

      setPlacementResult({
        ...placement,
        score: finalScore,
        total: questions.length
      });
      setProgress((previous) => applyPlacementToProgress(previous, placement));
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

    setResultAttempt(attempt);
    setProgress((previous) => applyAttemptToProgress(previous, attempt));
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
      <div className="pointer-events-none fixed -left-24 top-16 h-56 w-56 rounded-full bg-lime-200/50 blur-3xl" />
      <div className="pointer-events-none fixed -right-24 bottom-16 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

      {screen === "home" && (
        <HomeView
          completedCount={completedCount}
          currentLevelMeta={currentLevelMeta}
          activeWorld={activeWorld}
          onOpenMap={() => setScreen("map")}
          onStartPlacement={startPlacement}
          onStart={() => startLevel(progress.currentLevel)}
          progress={progress}
          progressPercent={progressPercent}
        />
      )}

      {screen === "map" && (
        <SkillMapView
          onBack={() => setScreen("home")}
          onStartLevel={startLevel}
          progress={progress}
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
          onMap={() => setScreen("map")}
          onNextLevel={() => startLevel(Math.min(activeLevel + 1, MAX_LEVEL))}
          onRetry={() => startLevel(activeLevel)}
        />
      )}

      {screen === "placement-result" && placementResult && (
        <PlacementResultView
          onOpenMap={() => setScreen("map")}
          onStart={() => startLevel(placementResult.level)}
          result={placementResult}
        />
      )}
    </main>
  );
}

function HomeView({
  activeWorld,
  completedCount,
  currentLevelMeta,
  onOpenMap,
  onStartPlacement,
  onStart,
  progress,
  progressPercent
}) {
  const recentAttempt = progress.recentAttempts[0];

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-emerald-600">
            {ADDITION_PATH.englishTitle}
          </p>
          <h1 className="text-5xl font-black leading-tight text-slate-950">
            {activeWorld.title}
          </h1>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-jelly">
          <Leaf className="h-8 w-8 text-emerald-500" />
        </div>
      </header>

      <div className="rounded-[2rem] border-4 border-white bg-white/84 p-6 shadow-jelly backdrop-blur">
        <div className="mb-6 rounded-[1.6rem] bg-gradient-to-br from-emerald-100 via-lime-100 to-sky-100 p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-lg font-black text-emerald-700 shadow-sm">
              {progress.placementCompleted
                ? `이어하기 Lv. ${progress.currentLevel}`
                : "처음이라면 진단부터"}
            </span>
            <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white shadow-sm">
              {QUESTION_COUNT}문제
            </span>
          </div>
          <h2 className="mb-3 text-3xl font-black text-slate-950">
            {currentLevelMeta.title}
          </h2>
          <p className="text-lg font-bold leading-relaxed text-slate-600">
            {progress.placementCompleted
              ? `${currentLevelMeta.focus}을 게임처럼 톡톡 풀어봐요.`
              : "몇 학년인지는 묻지 않고, 짧은 진단으로 지금 맞는 숲길을 찾아요."}{" "}
            학년 표시는 숨기고, 지금 필요한 숫자 감각만 키워요.
          </p>
        </div>

        <button
          className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-emerald-700 bg-emerald-500 px-6 py-5 text-2xl font-black text-white shadow-lg transition-all hover:bg-emerald-400 active:translate-y-1 active:border-b-2 active:scale-95"
          onClick={onStart}
          type="button"
        >
          {progress.placementCompleted ? "이어서 시작하기" : "Lv.1부터 시작하기"}
          <Play className="h-7 w-7 fill-white" />
        </button>

        {!progress.placementCompleted && (
          <button
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-amber-600 bg-amber-300 px-6 py-5 text-xl font-black text-amber-950 shadow-lg transition-all hover:bg-amber-200 active:translate-y-1 active:border-b-2 active:scale-95"
            onClick={onStartPlacement}
            type="button"
          >
            1분 진단으로 맞춤 시작
            <Sparkles className="h-6 w-6" />
          </button>
        )}

        <button
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-slate-300 bg-white px-6 py-5 text-xl font-black text-slate-700 shadow-md transition-all hover:bg-slate-50 active:translate-y-1 active:border-b-2 active:scale-95"
          onClick={onOpenMap}
          type="button"
        >
          숲길 지도 보기
          <Map className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="완료" value={`${completedCount}/${MAX_LEVEL}`} />
        <StatCard label="열린 길" value={`Lv.${progress.highestUnlockedLevel}`} />
        <StatCard label="진도" value={`${progressPercent}%`} />
      </div>

      <WorldShelf progress={progress} />

      <div className="mt-5 rounded-[1.6rem] bg-white/80 p-5 shadow-lg backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900">최근 기록</h3>
          <Sparkles className="h-6 w-6 text-amber-400" />
        </div>
        {recentAttempt ? (
          <p className="text-base font-bold leading-relaxed text-slate-600">
            Lv. {recentAttempt.level}에서 {recentAttempt.score}/
            {recentAttempt.total}개를 맞혔어요.{" "}
            {recentAttempt.canAdvance
              ? "다음 숲길이 열렸어요."
              : "같은 길을 한 번 더 걸어볼 차례예요."}
          </p>
        ) : (
          <p className="text-base font-bold leading-relaxed text-slate-600">
            아직 기록이 없어요. 첫 숲길을 걸으면 여기에 작은 성취가 쌓여요.
          </p>
        )}
      </div>
    </section>
  );
}

function WorldShelf({ progress }) {
  return (
    <section className="mt-5 space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-black text-emerald-600">월드 지도</p>
          <h2 className="text-2xl font-black text-slate-950">숨겨진 수학 왕국</h2>
        </div>
        <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-black text-slate-500 shadow-sm">
          무학년제
        </span>
      </div>

      {WORLD_CATEGORIES.map((category) => {
        const worlds = WORLD_CATALOG.filter(
          (world) => world.categoryId === category.id
        );

        return (
          <div
            className="rounded-[1.6rem] bg-white/70 p-4 shadow-lg backdrop-blur"
            key={category.id}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-slate-900">
                  {category.title}
                </h3>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  {category.share}
                </span>
              </div>
              <p className="mt-1 text-sm font-bold leading-relaxed text-slate-500">
                {category.description}
              </p>
            </div>

            <div className="grid gap-3">
              {worlds.map((world) => (
                <WorldCard
                  key={world.id}
                  progress={progress}
                  world={world}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function WorldCard({ progress, world }) {
  const isAddition = world.id === "addition";
  const isOpen = world.unlockState === "open";
  const isBonusOpen = world.unlockState === "bonus-open";
  const isLocked = world.unlockState === "locked";
  const badge = isAddition
    ? `진행 Lv.${progress.currentLevel}`
    : isBonusOpen
      ? "맛보기 준비"
      : "잠김";

  return (
    <div
      className={`rounded-[1.3rem] border-2 p-4 shadow-sm ${
        isOpen
          ? "border-emerald-200 bg-emerald-50"
          : isBonusOpen
            ? "border-sky-200 bg-sky-50"
            : "border-slate-100 bg-white/80 opacity-75"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm ${
            isOpen
              ? "bg-white"
              : isBonusOpen
                ? "bg-white"
                : "bg-slate-100 grayscale"
          }`}
        >
          {world.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h4 className="truncate text-lg font-black text-slate-900">
              {world.title}
            </h4>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                isLocked
                  ? "bg-slate-100 text-slate-500"
                  : isBonusOpen
                    ? "bg-sky-100 text-sky-700"
                    : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {badge}
            </span>
          </div>

          <p className="text-sm font-bold leading-relaxed text-slate-600">
            {world.summary}
          </p>
          <p className="mt-2 text-xs font-black text-slate-400">
            {world.unlockHint} · 총 {world.levelCount}개 길
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillMapView({ onBack, onStartLevel, progress }) {
  return (
    <section className="relative mx-auto min-h-screen w-full max-w-md px-5 py-6">
      <header className="mb-5 flex items-center justify-between">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-slate-600 shadow-md transition active:scale-95"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-600">
            Skill Tree
          </p>
          <h2 className="text-3xl font-black text-slate-950">숲길 지도</h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-emerald-500 shadow-md">
          <Leaf className="h-7 w-7" />
        </div>
      </header>

      <div className="mb-5 rounded-[1.6rem] bg-white/84 p-4 shadow-lg backdrop-blur">
        <p className="text-sm font-black text-slate-400">현재 추천</p>
        <p className="text-2xl font-black text-slate-900">
          Lv. {progress.currentLevel} · {getLevelMeta(progress.currentLevel).title}
        </p>
      </div>

      <div className="relative pb-10">
        <div className="absolute left-12 top-4 h-[calc(100%-4rem)] w-3 rounded-full bg-white/70 shadow-inner" />

        <div className="space-y-3">
          {ADDITION_LEVELS.map((node, index) => {
            const locked = node.level > progress.highestUnlockedLevel;
            const completed = progress.completedLevels.includes(node.level);
            const current = node.level === progress.currentLevel;
            const offset = NODE_OFFSETS[index % NODE_OFFSETS.length];

            return (
              <button
                className={`relative flex min-h-20 w-56 items-center gap-4 rounded-[1.6rem] border-b-[6px] px-4 py-3 text-left shadow-lg transition-all ${
                  locked
                    ? "border-slate-300 bg-slate-100 text-slate-400"
                    : completed
                      ? "border-emerald-700 bg-emerald-500 text-white active:translate-y-1 active:border-b-2 active:scale-95"
                      : current
                        ? "border-amber-600 bg-amber-300 text-amber-950 ring-4 ring-amber-100 active:translate-y-1 active:border-b-2 active:scale-95"
                        : "border-white bg-white text-slate-700 active:translate-y-1 active:border-b-2 active:scale-95"
                } ${offset}`}
                disabled={locked}
                key={node.level}
                onClick={() => onStartLevel(node.level)}
                type="button"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    locked
                      ? "bg-white/70"
                      : completed
                        ? "bg-white/20"
                        : current
                          ? "bg-white/70"
                          : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {locked ? (
                    <Lock className="h-6 w-6" />
                  ) : completed ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : (
                    <span className="text-lg font-black">{node.level}</span>
                  )}
                </span>
                <span>
                  <span className="block text-lg font-black">Lv. {node.level}</span>
                  <span className="block text-sm font-black opacity-75">
                    {node.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
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
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
      <header className="flex items-center gap-4 pt-2">
        <button
          aria-label="홈으로 돌아가기"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-slate-500 shadow-md transition hover:text-slate-700 active:scale-95"
          onClick={onExit}
          type="button"
        >
          <X className="h-7 w-7" />
        </button>

        <div className="h-5 flex-1 overflow-hidden rounded-full bg-white/80 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="rounded-2xl bg-white/90 px-3 py-2 text-sm font-black text-emerald-700 shadow-md">
          {currentIndex + 1}/{questionCount}
        </span>
      </header>

      <div className="flex flex-1 flex-col justify-center pb-8 pt-10">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-white/80 px-5 py-2 text-base font-black text-emerald-700 shadow-sm">
            {question.prompt}
          </div>
        </div>

        <div className="rounded-[2rem] border-4 border-white bg-white/78 p-8 text-center shadow-jelly backdrop-blur">
          <p className="mb-5 text-lg font-black text-slate-400">
            {mode === "placement"
              ? "맞춤 숲길 찾기"
              : `${ADDITION_PATH.title} Lv. ${activeLevel}`}
          </p>
          <h2 className="text-6xl font-black tracking-tight text-slate-900">
            {question.question}
          </h2>
        </div>

        <div className="mt-5 min-h-12 text-center">
          {answered && (
            <div
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-lg font-black shadow-md ${
                isCorrect
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {isCorrect ? (
                <>
                  <Check className="h-6 w-6" />
                  좋아요, 정답!
                </>
              ) : (
                <>
                  <X className="h-6 w-6" />
                  괜찮아요, 정답을 확인해요
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-6">
        {question.options.map((option, index) => {
          const selected = selectedOption === option;
          const shouldRevealCorrect =
            answered && option === question.correctAnswer && !selected;

          let buttonStyle =
            "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50";
          let icon = null;

          if (selected && isCorrect) {
            buttonStyle =
              "border-emerald-600 bg-emerald-100 text-emerald-800 ring-4 ring-emerald-300";
            icon = (
              <Check className="absolute right-4 top-4 h-7 w-7 text-emerald-600" />
            );
          } else if (selected && !isCorrect) {
            buttonStyle =
              "animate-shake border-rose-600 bg-rose-100 text-rose-800 ring-4 ring-rose-300";
            icon = <X className="absolute right-4 top-4 h-7 w-7 text-rose-600" />;
          } else if (shouldRevealCorrect) {
            buttonStyle =
              "border-emerald-600 bg-emerald-100 text-emerald-800 opacity-80";
            icon = (
              <Check className="absolute right-4 top-4 h-7 w-7 text-emerald-600" />
            );
          } else if (answered) {
            buttonStyle = "border-slate-100 bg-white/80 text-slate-400 opacity-60";
          }

          return (
            <button
              className={`relative flex min-h-32 items-center justify-center rounded-[1.7rem] border-b-[7px] px-5 py-8 text-5xl font-black shadow-lg transition-all duration-150 ${
                answered ? "" : "active:translate-y-1 active:border-b-2 active:scale-95"
              } ${buttonStyle}`}
              disabled={answered}
              key={`${question.id}-${option}-${index}`}
              onClick={() => onSelectOption(option)}
              type="button"
            >
              {option}
              {icon}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PlacementResultView({ onOpenMap, onStart, result }) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-8">
      <div className="rounded-[2rem] border-4 border-white bg-white/84 p-6 text-center shadow-jelly backdrop-blur">
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
          <button
            className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-emerald-700 bg-emerald-500 px-6 py-5 text-xl font-black text-white shadow-lg transition-all hover:bg-emerald-400 active:translate-y-1 active:border-b-2 active:scale-95"
            onClick={onStart}
            type="button"
          >
            맞춤 레벨 시작하기
            <ArrowRight className="h-6 w-6" />
          </button>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-slate-300 bg-white px-6 py-5 text-xl font-black text-slate-600 shadow-md transition-all hover:bg-slate-50 active:translate-y-1 active:border-b-2 active:scale-95"
            onClick={onOpenMap}
            type="button"
          >
            <Map className="h-6 w-6" />
            숲길 지도 보기
          </button>
        </div>
      </div>
    </section>
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

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-8">
      <div className="rounded-[2rem] border-4 border-white bg-white/84 p-6 text-center shadow-jelly backdrop-blur">
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-200 to-lime-200 shadow-lg">
          {feedback.tone === "perfect" ? (
            <Trophy className="h-16 w-16 animate-bounce text-amber-600" />
          ) : (
            <PartyPopper className="h-16 w-16 text-emerald-600" />
          )}
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
          {ADDITION_PATH.title} Lv. {attempt.level}
        </p>
        <h2 className="text-4xl font-black text-slate-900">{feedback.title}</h2>
        <p className="mx-auto mt-3 max-w-xs text-lg font-bold leading-relaxed text-slate-600">
          {feedback.message}
        </p>

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

        <div className="mt-6 space-y-3">
          {attempt.canAdvance && !reachedFinalLevel ? (
            <button
              className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-emerald-700 bg-emerald-500 px-6 py-5 text-xl font-black text-white shadow-lg transition-all hover:bg-emerald-400 active:translate-y-1 active:border-b-2 active:scale-95"
              onClick={onNextLevel}
              type="button"
            >
              다음 레벨 도전하기
              <ArrowRight className="h-6 w-6" />
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-amber-600 bg-amber-400 px-6 py-5 text-xl font-black text-amber-950 shadow-lg transition-all hover:bg-amber-300 active:translate-y-1 active:border-b-2 active:scale-95"
              onClick={onRetry}
              type="button"
            >
              비슷한 문제 다시 풀기
              <RotateCcw className="h-6 w-6" />
            </button>
          )}

          <button
            className="flex w-full items-center justify-center gap-3 rounded-3xl border-b-[7px] border-slate-300 bg-white px-6 py-5 text-xl font-black text-slate-600 shadow-md transition-all hover:bg-slate-50 active:translate-y-1 active:border-b-2 active:scale-95"
            onClick={onMap}
            type="button"
          >
            <Map className="h-6 w-6" />
            숲길 지도 보기
          </button>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-3xl bg-slate-100 px-6 py-4 text-lg font-black text-slate-500 transition-all hover:bg-slate-200 active:scale-95"
            onClick={onDashboard}
            type="button"
          >
            <Home className="h-5 w-5" />홈으로 돌아가기
          </button>
        </div>
      </div>
    </section>
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
