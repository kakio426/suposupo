# Supabase 연결 가이드

이 앱은 Supabase 환경변수가 없으면 로컬 저장 모드로 동작하고, 환경변수가 있으면 Google 로그인과 서버 저장을 켤 수 있다.

## 1. Supabase 프로젝트에서 해야 할 일

1. Supabase 프로젝트를 만든다.
2. SQL Editor에서 `supabase/schema.sql` 내용을 실행한다.
3. Project Settings > API에서 Project URL과 publishable/anon key를 복사한다.
4. Authentication > Providers에서 Google provider를 켠다.
5. Authentication > URL Configuration에 로컬 개발 주소와 배포 주소를 등록한다.

로컬 개발 Redirect URL:

```txt
http://localhost:3000
```

배포 후 추가할 Redirect URL 예시:

```txt
https://your-vercel-domain.vercel.app
```

## 2. 로컬 환경변수

`.env.local.example`을 참고해 `.env.local`을 만든다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

`service_role` key는 브라우저 앱에 넣으면 안 된다.

## 3. 현재 구현된 동작

- Supabase 설정 전: `localStorage`만 사용한다.
- Supabase 설정 후 로그인 전: 로컬 저장을 계속 사용한다.
- Google 로그인 후: 로컬 진도와 서버 진도를 비교해 더 많이 진행된 쪽을 사용한다.
- 퀴즈 완료 후: `user_progress`, `quiz_attempts`, `answer_logs`에 저장한다.
- 진단 완료 후: `placement_completed`, `placement_level`, 현재 레벨을 서버에 저장한다.
