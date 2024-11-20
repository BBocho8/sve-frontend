'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import { useProjectSetup } from '@/stores/sanity-store';
import type { VideoV2 } from '@/types/Video';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const DetailedReplayComponent = () => {
	const { creds } = useProjectSetup();

	const { projectId, dataset } = creds as { projectId: string; dataset: string };

	const { data: games, isLoading, error } = useSWR('fetchVideosV2', () => fetchVideosV2(projectId, dataset));

	const { gameID } = useParams();

	const targetGame = games?.find(game => game._id === gameID);

	return !isLoading && !error ? <ReplayDetails game={targetGame as VideoV2} /> : <Loading />;
};

export default DetailedReplayComponent;
