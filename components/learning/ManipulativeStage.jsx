import { TenFrameModel } from "./TenFrameModel";

export function ManipulativeStage({
  answered = false,
  isCorrect = null,
  question
}) {
  const visualModel = question.visualModel;

  if (!visualModel) return null;

  if (visualModel.type === "ten-frame") {
    return (
      <div className="mt-4">
        <TenFrameModel
          filledSlots={visualModel.filledSlots}
          label={[
            "10 만들기 모델.",
            `${visualModel.totalSlots}칸 중 ${visualModel.filledSlots}칸이 채워져 있고`,
            `${visualModel.missingSlots}칸이 비어 있어요.`
          ].join(" ")}
          missingSlots={visualModel.missingSlots}
          state={answered ? (isCorrect ? "correct" : "incorrect") : "idle"}
          totalSlots={visualModel.totalSlots}
        />
      </div>
    );
  }

  return null;
}
