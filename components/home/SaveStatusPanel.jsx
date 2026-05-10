import { FeedbackPanel } from "../quiz/FeedbackPanel";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function getSaveStatusCopy({
  authStatus,
  authUser,
  isSupabaseConfigured,
  syncStatus
}) {
  const signedIn = Boolean(authUser);

  if (!isSupabaseConfigured) {
    return {
      helper: "Supabase 키를 넣으면 기기 간 이어하기가 켜져요.",
      label: "이 기기에 안전하게 저장 중"
    };
  }

  if (!signedIn) {
    return {
      helper:
        authStatus === "disabled"
          ? "Supabase 키를 넣으면 기기 간 이어하기가 켜져요."
          : "다른 기기에서도 같은 진도로 이어갈 수 있어요.",
      label: "Google로 연결하면 이어할 수 있어요"
    };
  }

  if (syncStatus === "synced") {
    return { helper: authUser.email || "로그인된 계정", label: "계정에 저장 완료" };
  }

  if (syncStatus === "syncing") {
    return {
      helper: authUser.email || "로그인된 계정",
      label: "진도를 계정에 연결하는 중"
    };
  }

  return {
    helper: "서버 저장은 잠시 실패했지만, 이 기기 기록은 안전해요.",
    label: "이 기기 기록은 안전해요"
  };
}

export function SaveStatusPanel({
  authMessage,
  authStatus,
  authUser,
  isSupabaseConfigured,
  onSignIn,
  onSignOut,
  syncStatus
}) {
  const signedIn = Boolean(authUser);
  const copy = getSaveStatusCopy({
    authStatus,
    authUser,
    isSupabaseConfigured,
    syncStatus
  });

  return (
    <Card className="mt-5" padding="sm" variant="status">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-400">저장 상태</p>
          <p className="text-lg font-black text-slate-900">{copy.label}</p>
          <p className="mt-1 text-sm font-bold text-slate-500">{copy.helper}</p>
        </div>

        {signedIn ? (
          <Button className="w-auto shrink-0" onClick={onSignOut} size="sm" tone="neutral" variant="quiet">
            로그아웃
          </Button>
        ) : (
          <Button
            className="w-auto shrink-0"
            disabled={!isSupabaseConfigured}
            onClick={onSignIn}
            size="sm"
          >
            Google로 저장하기
          </Button>
        )}
      </div>

      {authMessage && (
        <FeedbackPanel
          className="mt-3 w-full justify-start rounded-control text-sm"
          message={authMessage}
          title="저장 안내"
          tone="sync-error"
        />
      )}
    </Card>
  );
}
