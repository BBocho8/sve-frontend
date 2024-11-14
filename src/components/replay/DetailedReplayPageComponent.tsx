'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import type { Video } from '@/types/Video';
import { useParams } from 'next/navigation';

const DetailedReplayComponent = ({
	games,
}: {
	games: Video[];
}) => {
	const { gameID } = useParams();

	const targetGame = games.find(game => game.id === gameID);

	return games.length > 0 ? <ReplayDetails game={targetGame as Video} /> : <Loading />;
};

export default DetailedReplayComponent;
