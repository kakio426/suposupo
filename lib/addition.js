export const STORAGE_KEY = "suposupo:addition-progress";
export const QUESTION_COUNT = 5;
export const MAX_LEVEL = 30;

export const ADDITION_PATH = {
  id: "addition",
  title: "더하기 숲",
  englishTitle: "Addition Forest",
  subtitle: "숲길을 따라 숫자 조각을 모아요",
  rewardName: "잎사귀"
};

const LEVEL_BANDS = [
  {
    from: 1,
    to: 5,
    skillId: "addition_within_10",
    title: "작은 숫자 조각",
    focus: "10 이하 덧셈",
    prompt: "두 숫자를 합친 조각을 골라요"
  },
  {
    from: 6,
    to: 10,
    skillId: "make_10",
    title: "10 만들기 다리",
    focus: "10 만들기",
    prompt: "빈칸에 들어갈 숫자 조각을 골라요"
  },
  {
    from: 11,
    to: 15,
    skillId: "two_digit_no_carry",
    title: "두 자리 숲길",
    focus: "받아올림 없는 두 자리 덧셈",
    prompt: "십의 자리와 일의 자리를 차분히 더해요"
  },
  {
    from: 16,
    to: 22,
    skillId: "two_digit_with_carry",
    title: "받아올림 언덕",
    focus: "받아올림 있는 두 자리 덧셈",
    prompt: "일의 자리에서 생긴 조각을 십의 자리로 옮겨요"
  },
  {
    from: 23,
    to: 27,
    skillId: "three_addends",
    title: "세 갈래 숲길",
    focus: "세 수의 덧셈",
    prompt: "셋을 모두 모은 숫자 조각을 골라요"
  },
  {
    from: 28,
    to: 30,
    skillId: "missing_addend",
    title: "숨은 조각 찾기",
    focus: "빈칸 덧셈",
    prompt: "숨어 있는 숫자 조각을 찾아요"
  }
];

export const ADDITION_LEVELS = Array.from({ length: MAX_LEVEL }, (_, index) => {
  const level = index + 1;
  return {
    level,
    ...getLevelMeta(level)
  };
});

export function createInitialProgress() {
  return {
    currentLevel: 1,
    highestUnlockedLevel: 1,
    placementCompleted: false,
    placementLevel: null,
    completedLevels: [],
    recentAttempts: []
  };
}

export function normalizeProgress(value) {
  const initial = createInitialProgress();

  if (!value || typeof value !== "object") {
    return initial;
  }

  const completedLevels = Array.isArray(value.completedLevels)
    ? [...new Set(value.completedLevels)]
        .map((level) => clamp(Number(level), 1, MAX_LEVEL))
        .filter(Boolean)
    : [];

  const highestCompleted = completedLevels.length
    ? Math.max(...completedLevels)
    : 0;
  const highestUnlockedLevel = clamp(
    Math.max(
      Number(value.highestUnlockedLevel) || 1,
      highestCompleted + 1,
      1
    ),
    1,
    MAX_LEVEL
  );

  return {
    currentLevel: clamp(
      Number(value.currentLevel) || highestUnlockedLevel,
      1,
      highestUnlockedLevel
    ),
    highestUnlockedLevel,
    placementCompleted: Boolean(value.placementCompleted),
    placementLevel: value.placementLevel
      ? clamp(Number(value.placementLevel), 1, MAX_LEVEL)
      : null,
    completedLevels,
    recentAttempts: Array.isArray(value.recentAttempts)
      ? value.recentAttempts.slice(0, 12)
      : []
  };
}

export function getLevelMeta(level) {
  const safeLevel = clamp(level, 1, MAX_LEVEL);
  return LEVEL_BANDS.find(
    (band) => safeLevel >= band.from && safeLevel <= band.to
  );
}

export function generateAdditionQuestions(level, count = QUESTION_COUNT) {
  const meta = getLevelMeta(level);
  const usedQuestions = new Set();

  return Array.from({ length: count }, (_, index) => {
    let base = createQuestionBySkill(meta.skillId, level);
    let attempts = 0;

    while (usedQuestions.has(base.question) && attempts < 20) {
      base = createQuestionBySkill(meta.skillId, level);
      attempts += 1;
    }

    usedQuestions.add(base.question);

    return {
      id: `${ADDITION_PATH.id}-${level}-${index}-${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`,
      path: ADDITION_PATH.id,
      level,
      skillId: meta.skillId,
      focus: meta.focus,
      prompt: meta.prompt,
      ...base
    };
  });
}

export function generatePlacementQuestions() {
  return [
    createPlacementQuestion(1, "warmup", 2, 5, "작은 숫자 조각을 더해요"),
    createPlacementQuestion(4, "warmup", 4, 6, "10 안쪽 숫자를 모아요"),
    createPlacementQuestion(8, "make_10", 7, 10, "빈칸 숫자 조각을 찾아요"),
    createPlacementQuestion(12, "two_digit_no_carry", 24, 13, "두 자리 숫자를 차분히 더해요"),
    createPlacementQuestion(16, "two_digit_with_carry", 28, 17, "받아올림 조각을 챙겨요"),
    createPlacementQuestion(22, "two_digit_with_carry", 46, 38, "조금 깊은 숲길을 걸어요"),
    createPlacementQuestion(25, "three_addends", 8, 9, 7, "세 숫자 조각을 모두 모아요"),
    createPlacementQuestion(29, "missing_addend", 34, 58, "숨어 있는 숫자를 찾아요")
  ];
}

export function evaluatePlacement(answers) {
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const advancedCorrect = answers.filter(
    (answer) => answer.isCorrect && answer.level >= 16
  ).length;

  if (correctCount <= 2) {
    return {
      level: 1,
      title: "작은 숫자 조각부터 시작해요",
      message: "처음 숲길에서 숫자 감각을 가볍게 깨워볼게요."
    };
  }

  if (correctCount <= 4) {
    return {
      level: 6,
      title: "10 만들기 다리부터 좋아요",
      message: "기초 감각은 있어요. 빈칸과 10 만들기를 먼저 다져볼게요."
    };
  }

  if (correctCount <= 6 || advancedCorrect <= 1) {
    return {
      level: 11,
      title: "두 자리 숲길부터 시작해요",
      message: "작은 덧셈은 안정적이에요. 두 자리 숫자로 이어가요."
    };
  }

  return {
    level: 16,
    title: "받아올림 언덕으로 가도 좋아요",
    message: "더하기 감각이 잘 살아 있어요. 조금 깊은 숲길에서 시작해요."
  };
}

export function applyPlacementToProgress(progress, placement) {
  const previous = normalizeProgress(progress);

  return normalizeProgress({
    ...previous,
    currentLevel: placement.level,
    highestUnlockedLevel: Math.max(previous.highestUnlockedLevel, placement.level),
    placementCompleted: true,
    placementLevel: placement.level
  });
}

export function evaluateAttempt(score, total) {
  const ratio = total > 0 ? score / total : 0;
  const canAdvance = score >= 4;

  if (ratio === 1) {
    return {
      canAdvance,
      title: "완벽해요!",
      tone: "perfect",
      message: "숲의 숫자 조각을 하나도 놓치지 않았어요.",
      strength: "계산 흐름이 안정적이고 보기 비교도 빨라요.",
      next: "다음 숲길이 열렸어요. 바로 이어서 가도 좋아요."
    };
  }

  if (ratio >= 0.8) {
    return {
      canAdvance,
      title: "멋지게 해냈어요!",
      tone: "great",
      message: "살짝 헷갈린 조각이 있었지만 흐름은 아주 좋아요.",
      strength: "정답 후보를 비교하는 힘이 잘 자라고 있어요.",
      next: "다음 레벨에 도전하거나, 같은 길을 한 번 더 걸어도 좋아요."
    };
  }

  return {
    canAdvance,
    title: "좋은 연습이었어요!",
    tone: "practice",
    message: "비슷한 숫자 조각을 한 번 더 만나면 훨씬 선명해질 거예요.",
    strength: "끝까지 골라본 것 자체가 좋은 훈련이에요.",
    next: "이번에는 같은 레벨에서 감각을 한 번 더 다져볼게요."
  };
}

export function buildAttempt({ level, score, total, durationMs, answers }) {
  const evaluation = evaluateAttempt(score, total);

  return {
    id: `attempt-${Date.now()}`,
    path: ADDITION_PATH.id,
    level,
    skillId: getLevelMeta(level).skillId,
    score,
    total,
    durationMs,
    answers,
    canAdvance: evaluation.canAdvance,
    createdAt: new Date().toISOString()
  };
}

export function applyAttemptToProgress(progress, attempt) {
  const previous = normalizeProgress(progress);
  const nextUnlocked = attempt.canAdvance
    ? clamp(Math.max(previous.highestUnlockedLevel, attempt.level + 1), 1, MAX_LEVEL)
    : previous.highestUnlockedLevel;

  const completedLevels = attempt.canAdvance
    ? [...new Set([...previous.completedLevels, attempt.level])]
    : previous.completedLevels;

  return normalizeProgress({
    currentLevel: attempt.canAdvance
      ? clamp(attempt.level + 1, 1, MAX_LEVEL)
      : attempt.level,
    highestUnlockedLevel: nextUnlocked,
    completedLevels,
    recentAttempts: [attempt, ...previous.recentAttempts].slice(0, 12)
  });
}

export function describeMistake(question, selectedAnswer) {
  if (selectedAnswer === question.correctAnswer) {
    return "정답";
  }

  if (
    question.skillId === "two_digit_with_carry" &&
    selectedAnswer === question.correctAnswer - 10
  ) {
    return "받아올림 조각을 놓친 보기";
  }

  if (Math.abs(selectedAnswer - question.correctAnswer) <= 2) {
    return "아주 가까운 보기";
  }

  if (question.skillId === "missing_addend") {
    return "빈칸 숫자를 거꾸로 본 보기";
  }

  return "다시 비교해볼 보기";
}

export function getRepairHint(question) {
  if (
    question.visualModel?.type === "ten-frame" ||
    question.skillId === "make_10"
  ) {
    return "10칸을 채우려면 빈칸이 몇 개인지 세어볼게요.";
  }

  return "초록 조각을 보고 다음에 비교해요.";
}

function createQuestionBySkill(skillId, level) {
  if (skillId === "addition_within_10") {
    const maxSum = level <= 2 ? 6 : 10;
    const correctAnswer = randomInt(3, maxSum);
    const a = randomInt(1, correctAnswer - 1);
    const b = correctAnswer - a;

    return {
      question: `${a} + ${b} = ?`,
      correctAnswer,
      options: buildOptions(correctAnswer, [
        correctAnswer - 1,
        correctAnswer + 1,
        Math.max(0, a + b - 2)
      ])
    };
  }

  if (skillId === "make_10") {
    const target = level <= 8 ? 10 : randomFrom([10, 12, 15]);
    const a = randomInt(1, target - 1);
    const correctAnswer = target - a;

    return {
      question: `${a} + □ = ${target}`,
      correctAnswer,
      visualModel: createTenFrameModel(a, target),
      options: buildOptions(correctAnswer, [
        correctAnswer - 1,
        correctAnswer + 1,
        a
      ])
    };
  }

  if (skillId === "two_digit_no_carry") {
    const onesA = randomInt(1, 8);
    const onesB = randomInt(0, 9 - onesA);
    const a = randomInt(1, 5) * 10 + onesA;
    const b = randomInt(1, 3) * 10 + onesB;
    const correctAnswer = a + b;

    return {
      question: `${a} + ${b} = ?`,
      correctAnswer,
      options: buildOptions(correctAnswer, [
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 10
      ])
    };
  }

  if (skillId === "two_digit_with_carry") {
    const onesA = randomInt(5, 9);
    const onesB = randomInt(10 - onesA, 9);
    const a = randomInt(1, 6) * 10 + onesA;
    const b = randomInt(1, 3) * 10 + onesB;
    const correctAnswer = a + b;

    return {
      question: `${a} + ${b} = ?`,
      correctAnswer,
      options: buildOptions(correctAnswer, [
        correctAnswer - 10,
        correctAnswer - 1,
        correctAnswer + 1
      ])
    };
  }

  if (skillId === "three_addends") {
    const limit = level <= 24 ? 12 : 25;
    const a = randomInt(2, limit);
    const b = randomInt(2, limit);
    const c = randomInt(2, limit);
    const correctAnswer = a + b + c;

    return {
      question: `${a} + ${b} + ${c} = ?`,
      correctAnswer,
      options: buildOptions(correctAnswer, [
        a + b,
        correctAnswer - 1,
        correctAnswer + 2
      ])
    };
  }

  const a = randomInt(14, 58);
  const hidden = randomInt(8, 36);
  const total = a + hidden;
  const correctAnswer = hidden;

  return {
    question: `${a} + □ = ${total}`,
    correctAnswer,
    options: buildOptions(correctAnswer, [
      a,
      correctAnswer - 1,
      correctAnswer + 10
    ])
  };
}

function createPlacementQuestion(level, skillId, a, b, cOrPrompt, maybePrompt) {
  const hasThirdAddend = typeof cOrPrompt === "number";
  const prompt = hasThirdAddend ? maybePrompt : cOrPrompt;
  let question = "";
  let correctAnswer = 0;

  if (skillId === "make_10") {
    question = `${a} + □ = ${b}`;
    correctAnswer = b - a;
  } else if (skillId === "missing_addend") {
    question = `${a} + □ = ${b}`;
    correctAnswer = b - a;
  } else if (hasThirdAddend) {
    question = `${a} + ${b} + ${cOrPrompt} = ?`;
    correctAnswer = a + b + cOrPrompt;
  } else {
    question = `${a} + ${b} = ?`;
    correctAnswer = a + b;
  }

  return {
    id: `placement-${level}-${skillId}`,
    path: ADDITION_PATH.id,
    level,
    skillId,
    focus: getLevelMeta(level).focus,
    prompt,
    question,
    correctAnswer,
    visualModel:
      skillId === "make_10" ? createTenFrameModel(a, b) : undefined,
    options: buildOptions(correctAnswer, [
      correctAnswer - 1,
      correctAnswer + 1,
      correctAnswer - 10,
      correctAnswer + 10
    ])
  };
}

function createTenFrameModel(filledSlots, totalSlots) {
  return {
    type: "ten-frame",
    totalSlots,
    filledSlots,
    missingSlots: totalSlots - filledSlots
  };
}

function buildOptions(correctAnswer, distractors) {
  const options = new Set([correctAnswer]);
  const candidates = [
    ...distractors,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + 10,
    correctAnswer - 10
  ];

  candidates.forEach((candidate) => {
    if (options.size < 4 && Number.isFinite(candidate) && candidate >= 0) {
      options.add(candidate);
    }
  });

  while (options.size < 4) {
    options.add(Math.max(0, correctAnswer + randomInt(-12, 12)));
  }

  return shuffle([...options].slice(0, 4));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(items) {
  return items[randomInt(0, items.length - 1)];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
