"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Flame,
  Home,
  Map,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from "lucide-react";
import {
  MAX_LEVEL,
  QUESTION_COUNT,
  applyAttemptToProgress,
  buildAttempt,
  describeMistake,
  evaluateAttempt,
  generateAdditionQuestions,
  getLevelMeta
} from "../../lib/addition";
import {
  saveAttemptToSupabase,
  saveRemoteProgress
} from "../../lib/supabase-progress";
import { useLearningProgress } from "../../lib/use-learning-progress";
import { FeedbackPanel } from "../quiz/FeedbackPanel";
import { QuizChoice } from "../quiz/QuizChoice";
import { Button } from "../ui/Button";
import { QuizLayout, QuizPromptCard } from "../layout/QuizLayout";
import { ResultLayout } from "../layout/ResultLayout";

export function AdditionPlaySession({ level, onExit, onMap }) {
  const router = useRouter();
  const {
    authUser,
    progress,
    setAuthMessage,
    setProgress,
    setSyncStatus
  } = useLearningProgress();
  const safeLevel = clamp(level, 1, MAX_LEVEL);
  const [questions, setQuestions] = useState(() =>
    generateAdditionQuestions(safeLevel, QUESTION_COUNT)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizStartedAt] = useState(() => Date.now());
  const [questionStartedAt, setQuestionStartedAt] = useState(() => Date.now());
  const [resultAttempt, setResultAttempt] = useState(null);

  const resetLevel = (nextLevel) => {
    const nextSafeLevel = clamp(nextLevel, 1, MAX_LEVEL);
    router.push(`/play/addition/${nextSafeLevel}`);
  };

  const finishAttempt = (finalScore, finalAnswers) => {
    const attempt = buildAttempt({
      level: safeLevel,
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
          setAuthMessage(
            "풀이 기록 일부를 서버에 저장하지 못했어요. 로컬 기록은 유지돼요."
          );
          setSyncStatus("error");
        } else {
          setSyncStatus("synced");
        }
      });
    }
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

  if (resultAttempt) {
    return (
      <PlayResultView
        attempt={resultAttempt}
        onDashboard={onExit}
        onMap={onMap}
        onNextLevel={() => resetLevel(Math.min(safeLevel + 1, MAX_LEVEL))}
        onRetry={() => {
          setQuestions(generateAdditionQuestions(safeLevel, QUESTION_COUNT));
          setCurrentIndex(0);
          setScore(0);
          setAnswerLog([]);
          setSelectedOption(null);
          setIsCorrect(null);
          setQuestionStartedAt(Date.now());
          setResultAttempt(null);
        }}
      />
    );
  }

  return (
    <PlayQuizView
      activeLevel={safeLevel}
      currentIndex={currentIndex}
      isCorrect={isCorrect}
      onExit={onExit}
      onSelectOption={handleSelectOption}
      question={questions[currentIndex]}
      questionCount={questions.length}
      selectedOption={selectedOption}
    />
  );
}

function PlayQuizView({
  activeLevel,
  currentIndex,
  isCorrect,
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
        mode="level"
        question={question.question}
      />
    </QuizLayout>
  );
}

function PlayResultView({ attempt, onDashboard, onMap, onNextLevel, onRetry }) {
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

function getMasteryState(tone, canAdvance) {
  if (tone === "perfect") return "mastered";
  if (canAdvance) return "ready";
  return "review";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
