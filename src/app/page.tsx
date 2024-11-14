import Replay from '@/components/replay/Replay';
import getAllGames from '@/utils/contentful/createClient';

export default async function Home() {
	const games = await getAllGames();

	return <Replay data={games} />;
}
