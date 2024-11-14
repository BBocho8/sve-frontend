import DetailedReplayComponent from '@/components/replay/DetailedReplayPageComponent';
import getAllGames from '@/utils/contentful/createClient';

const DetailedReplayPage = async () => {
	const games = await getAllGames();

	return <DetailedReplayComponent games={games} />;
};

export default DetailedReplayPage;
