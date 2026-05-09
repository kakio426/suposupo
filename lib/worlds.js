export const WORLD_CATEGORIES = [
  {
    id: "number-operations",
    title: "수와 연산",
    share: "핵심 훈련",
    description: "수포자가 가장 많이 흔들리는 계산 감각을 작게 쪼개서 다져요."
  },
  {
    id: "shape-measurement",
    title: "도형과 측정",
    share: "시각 훈련",
    description: "그림, 시계, 단위를 터치형 퀴즈로 가볍게 만나요."
  },
  {
    id: "patterns-data",
    title: "규칙과 자료",
    share: "생각 훈련",
    description: "패턴, 표, 그래프를 읽는 힘을 천천히 키워요."
  }
];

export const WORLD_CATALOG = [
  {
    id: "addition",
    categoryId: "number-operations",
    title: "더하기 숲",
    emoji: "➕",
    status: "playable",
    unlockState: "open",
    levelCount: 30,
    summary: "한 자리 수 더하기부터 받아올림, 세 자리 수 더하기까지",
    unlockHint: "처음부터 열려 있어요"
  },
  {
    id: "subtraction",
    categoryId: "number-operations",
    title: "빼기 사막",
    emoji: "➖",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    summary: "한 자리 수 빼기부터 받아내림, 세 자리 수 빼기까지",
    unlockHint: "더하기 숲 Lv.10 이후 열려요"
  },
  {
    id: "multiplication",
    categoryId: "number-operations",
    title: "곱하기 바다",
    emoji: "✖️",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    summary: "구구단부터 두 자리 수 곱하기까지",
    unlockHint: "빼기 사막 기초 이후 열려요"
  },
  {
    id: "division",
    categoryId: "number-operations",
    title: "나누기 우주",
    emoji: "➗",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    summary: "나눗셈의 기초, 나머지, 두 자리 수 나누기까지",
    unlockHint: "곱하기 바다 기초 이후 열려요"
  },
  {
    id: "fraction-decimal",
    categoryId: "number-operations",
    title: "분수/소수 화산",
    emoji: "🍕",
    status: "planned",
    unlockState: "locked",
    levelCount: 40,
    summary: "그림으로 분수 이해하기, 소수점, 분수와 소수 계산까지",
    unlockHint: "나누기 우주 기초 이후 열려요"
  },
  {
    id: "shapes",
    categoryId: "shape-measurement",
    title: "모양 섬",
    emoji: "📐",
    status: "preview",
    unlockState: "bonus-open",
    levelCount: 25,
    summary: "동그라미, 세모, 네모부터 각도와 입체도형까지",
    unlockHint: "처음부터 맛보기로 열려 있어요"
  },
  {
    id: "time",
    categoryId: "shape-measurement",
    title: "시간의 탑",
    emoji: "⏱️",
    status: "planned",
    unlockState: "locked",
    levelCount: 20,
    summary: "시계 보기, 달력 읽기, 시간 계산하기까지",
    unlockHint: "모양 섬 Lv.5 이후 열려요"
  },
  {
    id: "measurement",
    categoryId: "shape-measurement",
    title: "측정 광산",
    emoji: "⚖️",
    status: "planned",
    unlockState: "locked",
    levelCount: 25,
    summary: "길이, 무게, 들이와 단위 변환을 다뤄요",
    unlockHint: "시간의 탑 기초 이후 열려요"
  },
  {
    id: "patterns",
    categoryId: "patterns-data",
    title: "규칙의 동굴",
    emoji: "🧩",
    status: "planned",
    unlockState: "locked",
    levelCount: 25,
    summary: "패턴 찾기, 숫자 규칙, 비와 비율까지",
    unlockHint: "더하기 숲 Lv.15 이후 열려요"
  },
  {
    id: "charts",
    categoryId: "patterns-data",
    title: "차트 은하수",
    emoji: "📊",
    status: "planned",
    unlockState: "locked",
    levelCount: 20,
    summary: "표 읽기, 그래프 읽기, 평균 구하기까지",
    unlockHint: "규칙의 동굴 기초 이후 열려요"
  }
];

export function getWorldById(id) {
  return WORLD_CATALOG.find((world) => world.id === id);
}
