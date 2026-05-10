import { MAX_LEVEL } from "./addition";

export function getWorldState(world, progress) {
  if (world.id === "addition") {
    return progress.completedLevels.length >= MAX_LEVEL ? "completed" : "current";
  }

  if (world.unlockState === "bonus-open") return "preview";
  if (world.unlockState === "locked") return "locked";
  if (world.unlockState === "open") return "open";

  return "preview";
}

export function getWorldProgressValue(world, progress) {
  if (world.id === "addition") return `진행 Lv.${progress.currentLevel}`;
  if (world.unlockState === "bonus-open") return "맛보기 준비";
  if (world.unlockState === "locked") return "잠김";
  return "열림";
}

export function canOpenWorld(world, state) {
  return world.id === "addition" || state === "preview" || state === "open";
}
