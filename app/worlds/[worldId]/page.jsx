import { notFound } from "next/navigation";
import { WorldDetailView } from "../../../components/world/WorldDetailView";
import { getWorldById } from "../../../lib/worlds";

export default async function WorldDetailPage({ params }) {
  const { worldId } = await params;

  if (!getWorldById(worldId)) {
    notFound();
  }

  return <WorldDetailView worldId={worldId} />;
}
