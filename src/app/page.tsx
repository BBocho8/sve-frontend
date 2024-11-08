import Replay from '@/components/replay/Replay';
import { fetchVideos } from '@/utils/fetchVideo';

export default async function Home() {
	const games = await fetchVideos('https://sge-db.sge-db.workers.dev');

	return <Replay data={games} />;
}
