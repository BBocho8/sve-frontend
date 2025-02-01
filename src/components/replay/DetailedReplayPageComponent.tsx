'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import { useProjectSetup } from '@/stores/sanity-store';
import type { VideoV2 } from '@/types/Video';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const DetailedReplayComponent = () => {
	const { creds } = useProjectSetup() || {}; // Ensure creds is always an object

	const { gameID } = useParams();
	const {
		data: games,
		isLoading,
		error,
	} = useSWR('fetchVideosV2', () => fetchVideosV2(projectId, dataset), { shouldRetryOnError: false });
	if (!creds?.projectId || !creds?.dataset) {
		return <p className='text-red-500'>Error: Missing project credentials. Please check your configuration.</p>;
	}

	const { projectId, dataset } = creds;

	const targetGame = games?.find(game => game._id === gameID);

	if (isLoading) return <Loading />;
	if (error) return <p className='text-red-500'>Error fetching games. Please try again later.</p>;
	if (!targetGame) return <p className='text-gray-500'>Game not found.</p>;

	return <ReplayDetails game={targetGame as VideoV2} />;
};

export default DetailedReplayComponent;
