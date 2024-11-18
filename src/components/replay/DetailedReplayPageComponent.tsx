'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import type { Video } from '@/types/Video';
import { fetchVideos } from '@/utils/fetchVideo';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const DetailedReplayComponent = ({
	domainUrl,
}: {
	domainUrl: string;
}) => {
	const { data: games, isLoading, error } = useSWR('fetchVideos', () => fetchVideos(domainUrl));

	const { gameID } = useParams();

	const targetGame = games?.find(game => game.id === gameID);

	return !isLoading && !error ? <ReplayDetails game={targetGame as Video} /> : <Loading />;
};

export default DetailedReplayComponent;
