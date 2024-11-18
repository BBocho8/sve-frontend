import DetailedReplayComponent from '@/components/replay/DetailedReplayPageComponent';
import { fetchVideos } from '@/utils/fetchVideo';

const DetailedReplayPage = async () => {
	const games = await fetchVideos();

	return <DetailedReplayComponent games={games} />;
};

export default DetailedReplayPage;
