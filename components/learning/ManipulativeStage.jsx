import { CarryBlocksModel } from "./CarryBlocksModel";
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

  if (visualModel.type === "carry-blocks") {
    return (
      <div className="mt-4">
        <CarryBlocksModel
          label={[
            "받아올림 조각 모델.",
            `일의 자리 ${visualModel.ones.left} 더하기 ${visualModel.ones.right}은 ${visualModel.ones.sum}.`,
            `${visualModel.ones.carry}개가 십의 자리로 올라가고`,
            `일의 자리는 ${visualModel.ones.remainder}이 남아요.`,
            `전체 합은 ${visualModel.total}.`
          ].join(" ")}
          model={visualModel}
          state={answered ? (isCorrect ? "correct" : "incorrect") : "idle"}
        />
      </div>
    );
  }

  return null;
}
