import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { WorldCard } from "./WorldCard";
import {
  canOpenWorld,
  getWorldProgressValue,
  getWorldState
} from "../../lib/world-state";
import { WORLD_CATALOG, WORLD_CATEGORIES } from "../../lib/worlds";

export function WorldsOverview({ onOpenWorld, progress }) {
  return (
    <div className="space-y-5">
      <Card className="space-y-2" padding="lg" variant="status">
        <Badge tone="brand">전체 지도</Badge>
        <h2 className="text-3xl font-black text-slate-950">
          지금 갈 수 있는 길과 나중에 열릴 길
        </h2>
        <p className="text-base font-bold leading-relaxed text-slate-600">
          넓은 수학 왕국을 한눈에 보되, 지금 필요한 길만 또렷하게 보여줘요.
        </p>
      </Card>

      {WORLD_CATEGORIES.map((category) => {
        const worlds = WORLD_CATALOG.filter(
          (world) => world.categoryId === category.id
        );

        return (
          <section className="space-y-3" key={category.id}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-600">
                  {category.share}
                </p>
                <h2 className="font-display text-3xl font-black text-slate-950">
                  {category.title}
                </h2>
                <p className="mt-1 max-w-2xl text-sm font-bold leading-relaxed text-slate-500">
                  {category.description}
                </p>
              </div>
              <Badge>단계 숨김</Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {worlds.map((world) => {
                const state = getWorldState(world, progress);

                return (
                  <WorldCard
                    key={world.id}
                    onSelect={
                      canOpenWorld(world, state)
                        ? () => onOpenWorld(world.id)
                        : undefined
                    }
                    progressValue={getWorldProgressValue(world, progress)}
                    state={state}
                    world={world}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
