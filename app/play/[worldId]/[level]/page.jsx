import { PlayRouteView } from "../../../../components/play/PlayRouteView";

export default async function PlayPage({ params }) {
  const { worldId, level } = await params;

  return <PlayRouteView levelParam={level} worldId={worldId} />;
}
