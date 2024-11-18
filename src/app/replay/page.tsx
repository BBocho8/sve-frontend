import Replay from '@/components/replay/Replay';
import { fetchVideos } from '@/utils/fetchVideo';

const ReplayPage = async () => {
	const games = await fetchVideos();

	return <Replay data={games} />;
};

export default ReplayPage;
