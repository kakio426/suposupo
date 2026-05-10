"use client";

import { useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY,
  createInitialProgress,
  normalizeProgress
} from "./addition";
import { isSupabaseConfigured, supabase } from "./supabase";
import {
  migrateLocalProgressToSupabase,
  saveRemoteProgress
} from "./supabase-progress";

export function useLearningProgress() {
  const [progress, setProgress] = useState(createInitialProgress);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("checking");
  const [syncStatus, setSyncStatus] = useState("local");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setProgress(normalizeProgress(JSON.parse(saved)));
      } catch {
        setProgress(createInitialProgress());
      }
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

  const handleSignIn = useCallback(async () => {
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
  }, []);

  const handleSignOut = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;

    await supabase.auth.signOut();
    setAuthUser(null);
    setAuthStatus("anonymous");
    setSyncStatus("local");
    setAuthMessage("");
  }, []);

  const saveProgress = useCallback(
    async (
      nextProgress,
      {
        errorMessage = "진도를 서버에 저장하지 못했어요. 로컬 기록은 유지돼요."
      } = {}
    ) => {
      setProgress(nextProgress);

      if (!authUser) return { error: null };

      setSyncStatus("syncing");
      const result = await saveRemoteProgress(authUser.id, nextProgress);

      if (result.error) {
        setAuthMessage(errorMessage);
        setSyncStatus("error");
      } else {
        setSyncStatus("synced");
      }

      return result;
    },
    [authUser?.id]
  );

  return {
    authMessage,
    authStatus,
    authUser,
    handleSignIn,
    handleSignOut,
    hasLoadedProgress,
    isSupabaseConfigured,
    progress,
    saveProgress,
    setAuthMessage,
    setProgress,
    setSyncStatus,
    syncStatus
  };
}
