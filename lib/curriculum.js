export const CURRICULUM_AREAS = [
  {
    id: "number-operations",
    title: "수와 연산",
    badge: "핵심 50%+",
    summary: "수포자가 가장 많이 흔들리는 사칙연산과 유리수 감각을 작게 쪼개서 다져요.",
    worldIds: [
      "addition",
      "subtraction",
      "multiplication",
      "division",
      "fraction-decimal"
    ]
  },
  {
    id: "shape-measurement",
    title: "도형과 측정",
    badge: "시각/촉각",
    summary: "도형, 시간, 단위를 눈으로 보고 손으로 조작하며 현실 감각과 연결해요.",
    worldIds: ["shapes", "time", "measurement"]
  },
  {
    id: "change-relations",
    title: "변화와 관계",
    badge: "규칙 발견",
    summary: "패턴과 대응 관계를 찾아 대수적 사고로 넘어가는 다리를 놓아요.",
    worldIds: ["patterns"]
  },
  {
    id: "data-chance",
    title: "자료와 가능성",
    badge: "정보 처리",
    summary: "표, 그래프, 평균, 가능성을 다루며 데이터 리터러시를 키워요.",
    worldIds: ["charts"]
  }
];

export const SKILL_WORLDS = [
  {
    id: "addition",
    categoryId: "number-operations",
    title: "더하기 숲",
    emoji: "➕",
    status: "playable",
    unlockState: "open",
    levelCount: 30,
    stageCount: 8,
    summary: "수 모으기부터 받아올림, 세 자리 수, 세 수의 덧셈까지",
    unlockHint: "처음부터 열려 있어요",
    interactionMode: "모으기, 텐 프레임, 세로셈",
    keyLeap: "받아올림은 단위 10개가 상위 단위 1개로 바뀌는 교환 원리예요.",
    stages: [
      {
        stage: 1,
        title: "9까지의 수와 모으기/가르기",
        objective: "1~9 수 개념과 덧셈의 기초 연산을 잡아요.",
        ux: "사과나 도토리를 한 바구니에 담으며 수량 합성을 애니메이션으로 보여줘요."
      },
      {
        stage: 2,
        title: "10의 보수와 10 만들기",
        objective: "두 수의 합이 10이 되는 짝을 찾고 10진법 토대를 만들어요.",
        ux: "10칸 텐 프레임의 빈 슬롯을 채워 10을 완성하면 진화 이펙트를 줘요."
      },
      {
        stage: 3,
        title: "받아올림 없는 한 자리 수의 덧셈",
        objective: "5 이하와 9 이하 덧셈 구조를 파악해요.",
        ux: "수직선 위 캐릭터가 칸 수만큼 뛰어가며 수량 증가를 공간 이동으로 보여줘요."
      },
      {
        stage: 4,
        title: "받아올림이 있는 덧셈 기초",
        objective: "10을 넘는 합에서 보수를 활용한 분해와 결합을 익혀요.",
        ux: "10개 단위 블록이 1개의 십 모형으로 융합되는 파티클 시각화를 써요."
      },
      {
        stage: 5,
        title: "두 자리 수와 한 자리 수의 덧셈",
        objective: "100까지의 수에서 자릿값의 독립성을 인식해요.",
        ux: "십의 자리와 일의 자리 색을 분리하고 자리별 화살표 가이드를 제공해요."
      },
      {
        stage: 6,
        title: "받아올림이 1번 있는 두 자리 수 덧셈",
        objective: "세로셈 알고리즘과 받아올린 1의 의미를 이해해요.",
        ux: "일의 자리에서 생긴 10 단위가 십의 자리 받아올림 대기열로 날아가요."
      },
      {
        stage: 7,
        title: "받아올림이 2번 있는 세 자리 수 덧셈",
        objective: "연속적인 자리 이동을 패턴으로 익혀요.",
        ux: "백의 자리까지 확장된 맵에서 같은 알고리즘이 반복됨을 보여줘요."
      },
      {
        stage: 8,
        title: "세 수 이상의 연속 덧셈",
        objective: "연합 법칙의 기초와 앞에서부터 차례로 계산하는 흐름을 배워요.",
        ux: "앞의 두 수를 터치해 중간 결괏값 버블로 합치고 남은 수와 다시 결합해요."
      }
    ]
  },
  {
    id: "subtraction",
    categoryId: "number-operations",
    title: "빼기 사막",
    emoji: "➖",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    stageCount: 7,
    summary: "기초 뺄셈부터 받아내림, 0이 포함된 다자리 수 뺄셈까지",
    unlockHint: "더하기 숲 Lv.10 이후 열려요",
    interactionMode: "덜어내기, 분해, 빌려오기",
    keyLeap: "받아내림은 윗자리 1이 아랫자리 10과 동치라는 사실을 조작으로 받아들이는 구간이에요.",
    stages: [
      {
        stage: 1,
        title: "9 이하 수의 기초 뺄셈",
        objective: "수량의 감소를 직관적으로 인식해요.",
        ux: "오아시스 물방울을 증발시키거나 모래성 블록을 제거하는 피드백을 줘요."
      },
      {
        stage: 2,
        title: "10에서 빼기",
        objective: "10을 기준으로 한 감산과 덧셈의 역연산 관계를 이해해요.",
        ux: "꽉 찬 10칸 슬롯에서 조각을 떼어내고 남은 수를 즉시 확인해요."
      },
      {
        stage: 3,
        title: "받아내림 없는 두 자리 수 뺄셈",
        objective: "자리별 독립성에 기반해 두 자리 수에서 빼요.",
        ux: "십의 자리 기둥과 일의 자리 기둥을 분리해서 덜어내기를 시각화해요."
      },
      {
        stage: 4,
        title: "받아내림 기초",
        objective: "십의 자리 1을 일의 자리 10으로 해체해요.",
        ux: "빌려오기 버튼을 누르면 십 모래 블록이 10개의 작은 모래알로 흩어져요."
      },
      {
        stage: 5,
        title: "두 자리 수 뺄셈 마스터",
        objective: "받아내림이 1번 있는 두 자리 수 뺄셈을 안정화해요.",
        ux: "십의 자리 감소와 일의 자리 +10 과정을 화살표로 추적해요."
      },
      {
        stage: 6,
        title: "연속적인 받아내림",
        objective: "백의 자리에서 십의 자리, 십의 자리에서 일의 자리로 이어지는 연쇄를 다뤄요.",
        ux: "교환 단계마다 임시 메모를 자동 표기해 작업 기억 부담을 줄여요."
      },
      {
        stage: 7,
        title: "0이 포함된 다자리 수 뺄셈",
        objective: "0이 자리값을 지키는 플레이스홀더임을 이해해요.",
        ux: "바로 윗자리에서 빌릴 수 없을 때 상위 자리까지 빛의 다리를 연결해요."
      }
    ]
  },
  {
    id: "multiplication",
    categoryId: "number-operations",
    title: "곱하기 바다",
    emoji: "✖️",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    stageCount: 6,
    summary: "묶어 세기, 구구단, 배열 모델, 두 자리 수 곱셈까지",
    unlockHint: "빼기 사막 기초 이후 열려요",
    interactionMode: "묶음, 배열, 부분 곱",
    keyLeap: "곱셈은 반복 덧셈에서 배열과 면적 모델로 확장되는 사고의 전환이에요.",
    stages: [
      {
        stage: 1,
        title: "묶어 세기와 배의 개념",
        objective: "2씩, 3씩, 5씩 묶어 세며 곱셈의 출발점을 익혀요.",
        ux: "같은 수의 선원이 탄 배를 터치할 때마다 배수로 카운트가 점프해요."
      },
      {
        stage: 2,
        title: "곱셈구구의 원리",
        objective: "2단부터 9단까지를 배열 모델로 이해해요.",
        ux: "가로 x 세로 타일을 채워 전체 면적을 확인하는 퍼즐 UI를 제공해요."
      },
      {
        stage: 3,
        title: "10, 100의 배수 곱셈",
        objective: "10과 100을 곱할 때 자릿수가 이동하는 원리를 파악해요.",
        ux: "숫자가 컨베이어 벨트를 타고 이동하고 일의 자리에 0이 생성돼요."
      },
      {
        stage: 4,
        title: "두 자리 수 x 한 자리 수",
        objective: "분배 법칙과 받아올림 곱셈을 연결해요.",
        ux: "12 x 3을 10 x 3과 2 x 3 구역으로 나눈 뒤 병합해요."
      },
      {
        stage: 5,
        title: "세 자리 수 x 한 자리 수",
        objective: "자릿수 확장에도 같은 알고리즘이 유지됨을 익혀요.",
        ux: "각 자릿수와 곱하는 수가 만날 때 중간 결괏값 슬롯을 생성해요."
      },
      {
        stage: 6,
        title: "두/세 자리 수 x 두 자리 수",
        objective: "부분 곱과 자릿수 밀림의 의미를 이해해요.",
        ux: "십의 자리 곱 줄에는 반투명 0 방패를 강제 배치해 밀림 오류를 줄여요."
      }
    ]
  },
  {
    id: "division",
    categoryId: "number-operations",
    title: "나누기 우주",
    emoji: "➗",
    status: "planned",
    unlockState: "locked",
    levelCount: 30,
    stageCount: 6,
    summary: "등분제와 포함제, 나머지, 몫 어림, 장제법까지",
    unlockHint: "곱하기 바다 기초 이후 열려요",
    interactionMode: "분배, 묶어내기, 장제법 루프",
    keyLeap: "나눗셈은 곱셈과 뺄셈이 함께 들어가는 종합 알고리즘이에요.",
    stages: [
      {
        stage: 1,
        title: "나눗셈의 기초",
        objective: "똑같이 나누기와 일정량씩 묶어내기를 구분해요.",
        ux: "에너지를 여러 행성에 고르게 분배하거나 운석을 화물선에 나누어 실어요."
      },
      {
        stage: 2,
        title: "곱셈과 나눗셈의 역연산",
        objective: "팩트 패밀리 구조로 식을 변환해요.",
        ux: "세 수를 삼각성단 꼭짓점에 놓고 회전해 곱셈식과 나눗셈식을 전환해요."
      },
      {
        stage: 3,
        title: "나누어 떨어지는 기초 나눗셈",
        objective: "나머지가 없는 두/세 자리 수 나눗셈을 시작해요.",
        ux: "몫을 지붕 위로 적어 올리는 로켓 발사 UI 가이드를 제공해요."
      },
      {
        stage: 4,
        title: "나머지가 있는 나눗셈",
        objective: "나머지는 나누는 수보다 작다는 조건을 확인해요.",
        ux: "남은 조각이 그릇보다 작으면 더 나눌 수 없어 바닥에 남아요."
      },
      {
        stage: 5,
        title: "몫 어림하기",
        objective: "두 자리 수로 나눌 때 몫의 범위를 추론해요.",
        ux: "20의 배수 눈금 레이더에서 슬라이더로 목표 근처의 몫을 조준해요."
      },
      {
        stage: 6,
        title: "다자리 수 ÷ 두 자리 수",
        objective: "나누기, 곱하기, 빼기, 내려쓰기의 순환을 체화해요.",
        ux: "우주 정거장 톱니바퀴처럼 4단계 루프를 순서대로 강제해요."
      }
    ]
  },
  {
    id: "fraction-decimal",
    categoryId: "number-operations",
    title: "분수/소수 화산",
    emoji: "🍕",
    status: "planned",
    unlockState: "locked",
    levelCount: 40,
    stageCount: 12,
    summary: "분수와 소수의 의미, 통분, 곱셈, 나눗셈까지",
    unlockHint: "나누기 우주 기초 이후 열려요",
    interactionMode: "슬라이스, 격자, 수직선",
    keyLeap: "자연수에서 연속량과 비례 모델로 넘어가는 가장 큰 인지적 도약이에요.",
    stages: [
      {
        stage: 1,
        title: "전체와 부분, 분수의 탄생",
        objective: "똑같이 나누기와 전체에 대한 부분의 비율을 이해해요.",
        ux: "용암 피자를 정확히 등분하고 불균형하면 다시 나누도록 유도해요."
      },
      {
        stage: 2,
        title: "단위분수와 분모의 비밀",
        objective: "분모가 클수록 조각이 작아지는 역관계를 익혀요.",
        ux: "분모가 늘 때 조각 크기가 줄어드는 모습을 양팔 저울로 비교해요."
      },
      {
        stage: 3,
        title: "분수의 종류와 구조적 변환",
        objective: "진분수, 가분수, 대분수를 오가며 구조를 이해해요.",
        ux: "원판과 잉여 조각을 묶거나 해체해 가분수와 대분수를 변환해요."
      },
      {
        stage: 4,
        title: "소수의 발견과 10진법의 확장",
        objective: "0.1과 1/10의 동치 관계를 연결해요.",
        ux: "전체 1을 10등분하고 소수점 아래 자리 확장을 시각화해요."
      },
      {
        stage: 5,
        title: "동분모 분수의 덧셈과 뺄셈",
        objective: "분모는 단위이고 분자만 합치거나 덜어냄을 이해해요.",
        ux: "분모 프레임은 고정하고 분자 조각만 스와이프로 합치거나 빼요."
      },
      {
        stage: 6,
        title: "소수의 크기 비교 및 덧뺄셈",
        objective: "소수점을 기준으로 자리를 맞추는 절차를 익혀요.",
        ux: "소수점이 자석처럼 정렬되는 스마트 레이아웃을 제공해요."
      },
      {
        stage: 7,
        title: "약수와 배수, 최대공약수와 최소공배수",
        objective: "통분을 위한 정수론 도구를 갖춰요.",
        ux: "두 수의 배수 기어가 맞물리는 지점에서 공배수를 찾게 해요."
      },
      {
        stage: 8,
        title: "약분과 통분, 이분모 분수의 계산",
        objective: "크기가 같은 분수와 단위 통일의 의미를 이해해요.",
        ux: "서로 다른 격자를 겹쳐 공통 분모 단위로 몰핑해요."
      },
      {
        stage: 9,
        title: "분수와 자연수의 곱셈",
        objective: "분수 조각의 자연수 배를 시각적으로 이해해요.",
        ux: "같은 분수 조각이 컨베이어로 쏟아져 하나의 큰 조각으로 합쳐져요."
      },
      {
        stage: 10,
        title: "대분수와 진분수의 곱셈",
        objective: "분수 x 분수를 면적 모델로 이해해요.",
        ux: "가로/세로 분할 색종이를 겹쳐 진해진 교차 영역을 세요."
      },
      {
        stage: 11,
        title: "소수의 곱셈 논리",
        objective: "곱한 뒤 소수점 자릿수 합만큼 위치를 정해요.",
        ux: "소수점이 위성처럼 뒤에서부터 정해진 칸 수만큼 점프해요."
      },
      {
        stage: 12,
        title: "유리수의 나눗셈",
        objective: "단위분수와 소수 나눗셈의 변환 절차를 익혀요.",
        ux: "나누는 수의 소수점 이동에 맞춰 나누어지는 수의 소수점도 함께 움직여요."
      }
    ]
  },
  {
    id: "shapes",
    categoryId: "shape-measurement",
    title: "모양 섬",
    emoji: "📐",
    status: "preview",
    unlockState: "bonus-open",
    levelCount: 25,
    stageCount: 7,
    summary: "입체 분류, 평면도형, 각, 이동, 합동과 전개도까지",
    unlockHint: "처음부터 맛보기로 열려 있어요",
    interactionMode: "3D 회전, 칠교, 대칭 캔버스",
    keyLeap: "도형 학습의 핵심은 이름 암기가 아니라 조건과 포함 관계의 이해예요.",
    stages: [
      {
        stage: 1,
        title: "입체도형의 직관적 분류",
        objective: "상자, 둥근 기둥, 공 모양을 외형 특징으로 분류해요.",
        ux: "실생활 3D 오브젝트를 같은 형태 슬롯으로 스와이프해요."
      },
      {
        stage: 2,
        title: "평면도형의 기초 인식",
        objective: "동그라미, 세모, 네모와 단면 추출을 익혀요.",
        ux: "칠교와 패턴블록을 돌려 빈 공간을 채우는 퍼즐을 제공해요."
      },
      {
        stage: 3,
        title: "선분, 반직선, 직선 및 각",
        objective: "점에서 선으로 차원이 확장되는 느낌을 잡아요.",
        ux: "두 별을 이어 선분을 만들고 화살표로 반직선을 발사해요."
      },
      {
        stage: 4,
        title: "평면도형의 동적 이동",
        objective: "밀기, 뒤집기, 돌리기를 통해 합동 변환을 이해해요.",
        ux: "블록을 90도 회전하거나 거울 버튼으로 좌우 반전해요."
      },
      {
        stage: 5,
        title: "다각형의 성질과 분류",
        objective: "삼각형과 사각형의 조건 및 포함 관계를 익혀요.",
        ux: "꼭짓점을 드래그하면 각도와 변 길이에 따라 이름표가 실시간 갱신돼요."
      },
      {
        stage: 6,
        title: "합동과 대칭",
        objective: "선대칭과 점대칭의 구조를 파악해요.",
        ux: "대칭축 한쪽에 그리면 반대편에 데칼코마니처럼 함께 그려져요."
      },
      {
        stage: 7,
        title: "입체도형과 전개도",
        objective: "전개도를 접어 입체를 상상하는 공간 지각을 훈련해요.",
        ux: "2D 전개도를 쓸어올려 3D 입체로 접고 시점을 회전해요."
      }
    ]
  },
  {
    id: "time",
    categoryId: "shape-measurement",
    title: "시간의 탑",
    emoji: "⏱️",
    status: "planned",
    unlockState: "locked",
    levelCount: 20,
    stageCount: 5,
    summary: "시계 보기, 달력 읽기, 시간 계산과 60진법까지",
    unlockHint: "모양 섬 Lv.5 이후 열려요",
    interactionMode: "시계 드래그, 타임라인, 달력",
    keyLeap: "시간은 형태가 없어 시각과 시간의 차이, 60진법 변환을 따로 훈련해야 해요.",
    stages: [
      {
        stage: 1,
        title: "정각과 30분 시계 보기",
        objective: "짧은바늘과 긴바늘의 상대 위치를 읽어요.",
        ux: "거대한 톱니바퀴 시계를 드래그하면 해와 달 배경이 바뀌어요."
      },
      {
        stage: 2,
        title: "1분, 5분 단위 읽기",
        objective: "긴바늘 한 칸과 5의 배수 체계를 이해해요.",
        ux: "긴바늘이 숫자에 닿을 때 5분, 10분 팝업이 나와요."
      },
      {
        stage: 3,
        title: "시간과 시각의 차이",
        objective: "흐른 시간과 도착 시각을 구분해요.",
        ux: "타임라인 막대를 늘리고 줄이며 구간의 길이를 측정해요."
      },
      {
        stage: 4,
        title: "달력 읽기와 날짜의 주기성",
        objective: "주, 월, 년의 불규칙 반복 패턴을 이해해요.",
        ux: "월별 날짜 수 차이를 막대 블록 길이로 보여줘요."
      },
      {
        stage: 5,
        title: "시간 단위 변환과 60진법 연산",
        objective: "1시간=60분 교환과 시간 계산을 익혀요.",
        ux: "분의 합이 60을 넘으면 시간 자리로 1이 넘어가는 애니메이션을 써요."
      }
    ]
  },
  {
    id: "measurement",
    categoryId: "shape-measurement",
    title: "측정 광산",
    emoji: "⚖️",
    status: "planned",
    unlockState: "locked",
    levelCount: 25,
    stageCount: 7,
    summary: "길이, 무게, 들이, 각도, 어림, 넓이와 부피까지",
    unlockHint: "시간의 탑 기초 이후 열려요",
    interactionMode: "자, 저울, 각도기, 타일링",
    keyLeap: "측정은 도구를 올바르게 쓰고 단위를 통일하는 현실 모델링 훈련이에요.",
    stages: [
      {
        stage: 1,
        title: "대상의 직관적 및 간접 비교",
        objective: "길다/짧다, 무겁다/가볍다, 넓다/좁다를 비교해요.",
        ux: "광석을 양팔 저울에 올려 기울어짐을 예측하고 확인해요."
      },
      {
        stage: 2,
        title: "길이 재기와 단위의 위계",
        objective: "cm, m, mm, km와 단위 변환 관계를 익혀요.",
        ux: "눈금자를 드래그해 목표물 양 끝점에 맞춰 치수를 읽어요."
      },
      {
        stage: 3,
        title: "들이와 무게의 측정 체계",
        objective: "L, mL, kg, g, t와 1000배수 관계를 이해해요.",
        ux: "비커 수위와 저울 바늘을 읽으며 측정값을 고르게 해요."
      },
      {
        stage: 4,
        title: "각도의 본질과 각도 측정",
        objective: "각도기로 두 선분이 벌어진 정도를 수치화해요.",
        ux: "가상 각도기를 꼭짓점에 맞추고 밑금을 회전해 정렬해요."
      },
      {
        stage: 5,
        title: "수의 범위와 어림하기",
        objective: "이상, 이하, 초과, 미만, 반올림을 구분해요.",
        ux: "수직선 경계값의 포함 여부를 빈/찬 동그라미로 토글해요."
      },
      {
        stage: 6,
        title: "다각형의 둘레와 넓이",
        objective: "직사각형에서 삼각형과 평행사변형 넓이로 확장해요.",
        ux: "1제곱센티미터 타일로 도형 내부를 물리적으로 채워봐요."
      },
      {
        stage: 7,
        title: "겉넓이, 부피 측정과 원주율",
        objective: "직육면체 부피와 원주율의 직관을 얻어요.",
        ux: "바퀴 한 바퀴 궤적으로 원주가 지름의 약 3.14배임을 보여줘요."
      }
    ]
  },
  {
    id: "patterns",
    categoryId: "change-relations",
    title: "규칙의 동굴",
    emoji: "🧩",
    status: "planned",
    unlockState: "locked",
    levelCount: 25,
    stageCount: 6,
    summary: "반복 패턴, 증가 규칙, 대응 관계, 비와 비율까지",
    unlockHint: "더하기 숲 Lv.15 이후 열려요",
    interactionMode: "패턴 조각, 함수 상자, 비율 슬라이더",
    keyLeap: "규칙 발견은 귀납으로 추측하고 새로운 상황에 연역 적용하는 훈련이에요.",
    stages: [
      {
        stage: 1,
        title: "단순 반복 규칙의 발견",
        objective: "A-B-A-B 같은 순환 배열을 인지해요.",
        ux: "동굴 벽화의 빈칸에 알맞은 색과 모양 조각을 스와이프해요."
      },
      {
        stage: 2,
        title: "증가/감소 규칙 체계화",
        objective: "수와 도형 개수의 변화 규칙을 찾아요.",
        ux: "층별 블록 수를 보며 다음 층에 필요한 블록을 예측해요."
      },
      {
        stage: 3,
        title: "다차원 표 내의 규칙 분석",
        objective: "덧셈표와 곱셈표의 행, 열, 대각선 규칙을 읽어요.",
        ux: "100보드나 구구표에서 특정 방향을 드래그하면 증감 규칙이 떠요."
      },
      {
        stage: 4,
        title: "두 양 사이의 규칙과 대응",
        objective: "입력과 출력 사이의 연산 관계를 파악해요.",
        ux: "함수 상자에 숫자 구슬을 넣으면 톱니바퀴를 거쳐 결과가 나와요."
      },
      {
        stage: 5,
        title: "비와 비율의 도입",
        objective: "기준량과 비교하는 양의 관계를 이해해요.",
        ux: "슬라이더로 전체 게이지 중 색 비율을 조절하고 배경 채도를 바꿔요."
      },
      {
        stage: 6,
        title: "비례식과 비례배분",
        objective: "전체를 주어진 비로 나누는 원리를 익혀요.",
        ux: "금화를 3:2 비율로 나누는 지점을 직접 당겨 탐색해요."
      }
    ]
  },
  {
    id: "charts",
    categoryId: "data-chance",
    title: "차트 은하수",
    emoji: "📊",
    status: "planned",
    unlockState: "locked",
    levelCount: 20,
    stageCount: 7,
    summary: "표, 그림그래프, 막대/꺾은선그래프, 평균과 가능성까지",
    unlockHint: "규칙의 동굴 기초 이후 열려요",
    interactionMode: "분류, 그래프 드래그, 확률 시뮬레이션",
    keyLeap: "정답 계산보다 자료를 분류하고 의미를 추론하는 힘을 길러요.",
    stages: [
      {
        stage: 1,
        title: "집합적 분류하기와 표",
        objective: "기준에 따라 데이터를 분류하고 표로 압축해요.",
        ux: "외계인 캐릭터를 눈 개수 같은 기준으로 투명 상자에 분류해요."
      },
      {
        stage: 2,
        title: "그림그래프를 통한 시각화",
        objective: "수량을 아이콘 개수로 바꾸어 표현해요.",
        ux: "큰 별과 작은 별 스탬프를 찍어 그래프 길이를 늘려요."
      },
      {
        stage: 3,
        title: "막대그래프 작성 및 해석",
        objective: "범주형 데이터의 크기를 비교해요.",
        ux: "막대를 위로 드래그해 목표 눈금까지 물리적으로 끌어올려요."
      },
      {
        stage: 4,
        title: "꺾은선그래프와 변화 추이",
        objective: "시간에 따른 변화와 기울기 감각을 읽어요.",
        ux: "타임라인 점들을 레이저 선으로 이어 상승과 하락을 확인해요."
      },
      {
        stage: 5,
        title: "대표값으로서의 평균",
        objective: "여러 값을 평평하게 맞춘 대표값으로 이해해요.",
        ux: "들쭉날쭉한 막대 상단을 깎고 채워 같은 높이로 맞춰요."
      },
      {
        stage: 6,
        title: "가능성 예측 및 등급화",
        objective: "불가능, 반반, 확실 같은 언어적 확률을 매핑해요.",
        ux: "룰렛과 주사위 반복 시뮬레이션 후 가능성 스케일을 조작해요."
      },
      {
        stage: 7,
        title: "비율 그래프",
        objective: "전체 100%에서 각 항목의 상대적 비율을 표현해요.",
        ux: "둥근 행성을 비율에 맞게 섹터로 나누고 색을 채워요."
      }
    ]
  }
];

export const CURRICULUM_DESIGN_PRINCIPLES = [
  {
    id: "prerequisite-dag",
    title: "선행 조건 기반 DAG",
    summary: "실패한 노드의 원인을 찾아 학년을 무시하고 필요한 하위 노드로 되돌려요."
  },
  {
    id: "micro-learning",
    title: "마이크로 러닝",
    summary: "한 성취기준도 그림 이해, 동치 개념, 알고리즘 적용처럼 작은 노드로 쪼개요."
  },
  {
    id: "performance-interaction",
    title: "수행 중심 인터랙션",
    summary: "4지 선다만으로 끝내지 않고 드래그, 분해, 병합, 측정 조작 로그를 남겨요."
  },
  {
    id: "resilient-feedback",
    title: "서사형 실패 피드백",
    summary: "오답 낙인 대신 보호막, 에너지, 부품 같은 게임 문법으로 회복 탄력성을 높여요."
  }
];

export function getCurriculumAreaById(id) {
  return CURRICULUM_AREAS.find((area) => area.id === id);
}

export function getCurriculumWorldById(id) {
  return SKILL_WORLDS.find((world) => world.id === id);
}

export function getWorldStageSummary(id) {
  const world = getCurriculumWorldById(id);

  if (!world) {
    return null;
  }

  return {
    first: world.stages[0],
    last: world.stages[world.stages.length - 1],
    keyLeap: world.keyLeap
  };
}
