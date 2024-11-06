'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import type { Video } from '@/types/Video';
import { fetchVideos } from '@/utils/fetchVideo';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailedReplayPage = () => {
	const { gameID } = useParams();

	const [games, setGames] = useState<Video[]>([]);

	useEffect(() => {
		async function fetchAllGames() {
			const data = await fetchVideos('https://sge-db.sge-db.workers.dev');

			setGames(data);
		}
		fetchAllGames();
	}, []);

	const targetGame = games.find(game => game.id === gameID);

	return games.length > 0 ? <ReplayDetails game={targetGame as Video} /> : <Loading />;
};

export default DetailedReplayPage;
