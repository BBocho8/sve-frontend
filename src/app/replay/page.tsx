import Replay from '@/components/replay/Replay';
import getAllGames from '@/utils/contentful/createClient';

const ReplayPage = async () => {
	const games = await getAllGames();

	return <Replay data={games} />;
};

export default ReplayPage;
