import { CURRICULUM_AREAS, SKILL_WORLDS } from "./curriculum";

export const WORLD_CATEGORIES = CURRICULUM_AREAS.map((area) => ({
  id: area.id,
  title: area.title,
  share: area.badge,
  description: area.summary
}));

export const WORLD_CATALOG = SKILL_WORLDS;

export function getWorldById(id) {
  return WORLD_CATALOG.find((world) => world.id === id);
}
