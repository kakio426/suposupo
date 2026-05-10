import { Sparkles } from "lucide-react";
import { Card } from "../ui/Card";

export function RecentRecord({ recentAttempt }) {
  return (
    <Card className="mt-5" padding="md" variant="plain">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">최근 기록</h3>
        <Sparkles className="h-6 w-6 text-warning-500" />
      </div>
      {recentAttempt ? (
        <p className="text-base font-bold leading-relaxed text-slate-600">
          Lv. {recentAttempt.level}에서 {recentAttempt.score}/{recentAttempt.total}
          개를 맞혔어요.{" "}
          {recentAttempt.canAdvance
            ? "다음 숲길이 열렸어요."
            : "같은 길을 한 번 더 걸어볼 차례예요."}
        </p>
      ) : (
        <p className="text-base font-bold leading-relaxed text-slate-600">
          아직 기록이 없어요. 첫 숲길을 걸으면 여기에 작은 성취가 쌓여요.
        </p>
      )}
    </Card>
  );
}
