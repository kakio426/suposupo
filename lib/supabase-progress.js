import { ADDITION_PATH, normalizeProgress } from "./addition";
import { isSupabaseConfigured, supabase } from "./supabase";

export async function loadRemoteProgress(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return { progress: null, error: null };
  }

  const { data: row, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("path", ADDITION_PATH.id)
    .maybeSingle();

  if (error) {
    return { progress: null, error };
  }

  if (!row) {
    return { progress: null, error: null };
  }

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", userId)
    .eq("path", ADDITION_PATH.id)
    .order("created_at", { ascending: false })
    .limit(12);

  return {
    progress: normalizeProgress({
      currentLevel: row.current_level,
      highestUnlockedLevel: row.highest_unlocked_level,
      placementCompleted: row.placement_completed,
      placementLevel: row.placement_level,
      completedLevels: row.completed_levels || [],
      recentAttempts: (attempts || []).map((attempt) => ({
        id: attempt.client_attempt_id || attempt.id,
        path: attempt.path,
        level: attempt.level,
        skillId: attempt.skill_id,
        score: attempt.score,
        total: attempt.total,
        durationMs: attempt.duration_ms,
        canAdvance: attempt.can_advance,
        answers: [],
        createdAt: attempt.created_at
      }))
    }),
    error: null
  };
}

export async function saveRemoteProgress(userId, progress) {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return { error: null };
  }

  const normalized = normalizeProgress(progress);

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      path: ADDITION_PATH.id,
      current_level: normalized.currentLevel,
      highest_unlocked_level: normalized.highestUnlockedLevel,
      placement_completed: normalized.placementCompleted,
      placement_level: normalized.placementLevel,
      completed_levels: normalized.completedLevels,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,path" }
  );

  return { error };
}

export async function saveAttemptToSupabase(userId, attempt) {
  if (!isSupabaseConfigured || !supabase || !userId || !attempt) {
    return { error: null };
  }

  const { data: existingAttempt } = await supabase
    .from("quiz_attempts")
    .select("id")
    .eq("user_id", userId)
    .eq("client_attempt_id", attempt.id)
    .maybeSingle();

  if (existingAttempt?.id) {
    return { error: null };
  }

  const { data: insertedAttempt, error: attemptError } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: userId,
      client_attempt_id: attempt.id,
      path: attempt.path,
      level: attempt.level,
      skill_id: attempt.skillId,
      score: attempt.score,
      total: attempt.total,
      duration_ms: attempt.durationMs,
      can_advance: attempt.canAdvance,
      created_at: attempt.createdAt
    })
    .select("id")
    .single();

  if (attemptError) {
    return { error: attemptError };
  }

  if (attempt.answers?.length) {
    const { error: answersError } = await supabase.from("answer_logs").insert(
      attempt.answers.map((answer) => ({
        attempt_id: insertedAttempt.id,
        question: answer.question,
        selected_answer: answer.selectedAnswer,
        correct_answer: answer.correctAnswer,
        is_correct: answer.isCorrect,
        skill_id: answer.skillId,
        focus: answer.focus,
        mistake_type: answer.mistakeType,
        duration_ms: answer.durationMs
      }))
    );

    if (answersError) {
      return { error: answersError };
    }
  }

  return { error: null };
}

export async function migrateLocalProgressToSupabase(userId, localProgress) {
  const normalizedLocal = normalizeProgress(localProgress);
  const { progress: remoteProgress, error } = await loadRemoteProgress(userId);

  if (error) {
    return { progress: normalizedLocal, error };
  }

  const bestProgress = chooseBetterProgress(remoteProgress, normalizedLocal);
  const { error: saveError } = await saveRemoteProgress(userId, bestProgress);

  if (normalizedLocal.recentAttempts?.length) {
    await Promise.all(
      normalizedLocal.recentAttempts.map((attempt) =>
        saveAttemptToSupabase(userId, attempt)
      )
    );
  }

  return { progress: bestProgress, error: saveError };
}

function chooseBetterProgress(remoteProgress, localProgress) {
  if (!remoteProgress) return localProgress;

  const remote = normalizeProgress(remoteProgress);
  const local = normalizeProgress(localProgress);

  if (local.highestUnlockedLevel > remote.highestUnlockedLevel) {
    return local;
  }

  if (local.highestUnlockedLevel < remote.highestUnlockedLevel) {
    return remote;
  }

  if (local.completedLevels.length > remote.completedLevels.length) {
    return local;
  }

  return remote;
}
