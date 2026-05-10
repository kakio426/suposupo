# Supabase 전환 설계

수포수포 MVP는 먼저 `localStorage`의 `suposupo:addition-progress`에 진도를 저장한다. Supabase 전환 시에는 같은 데이터 모델을 서버 테이블로 옮긴다.

## Tables

### profiles

- `id`: Supabase Auth user id
- `display_name`: 학생 표시 이름
- `avatar_url`: 선택 프로필 이미지
- `created_at`: 생성 시각

### user_progress

- `id`
- `user_id`
- `path`: `addition`
- `current_level`
- `highest_unlocked_level`
- `completed_levels`: number array 또는 jsonb
- `updated_at`

### quiz_attempts

- `id`
- `user_id`
- `client_attempt_id`
- `path`: `addition`
- `level`
- `skill_id`
- `score`
- `total`
- `duration_ms`
- `can_advance`
- `created_at`

### answer_logs

- `id`
- `attempt_id`
- `question`
- `selected_answer`
- `correct_answer`
- `is_correct`
- `skill_id`
- `focus`
- `mistake_type`
- `duration_ms`

## Migration note

첫 로그인 시 브라우저에 저장된 `suposupo:addition-progress`를 읽고 `user_progress`, `quiz_attempts`, `answer_logs`로 업로드한다. 업로드가 성공하면 이후부터 Supabase 값을 기준으로 앱 상태를 복원한다.
