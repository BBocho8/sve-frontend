'use client';

import Loading from '@/app/loading';
import ReplayDetails from '@/components/replay/ReplayDetails';
import { useProjectSetup } from '@/stores/sanity-store';
import type { VideoV2 } from '@/types/Video';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';

const DetailedReplayComponent = () => {
	const { creds } = useProjectSetup();
	const { gameID } = useParams();
	const router = useRouter();

	const {
		data: games,
		isLoading,
		error,
	} = useSWR('fetchVideosV2', () => fetchVideosV2(creds?.projectId as string, creds?.dataset as string), {
		shouldRetryOnError: false,
	});

	if (!creds?.projectId || !creds?.dataset) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-red-500 text-lg font-medium mb-2'>Configuration Error</div>
					<p className='text-gray-600'>Missing project credentials. Please check your configuration.</p>
				</div>
			</div>
		);
	}

	const targetGame = games?.find(game => game._id === gameID);

	if (isLoading) return <Loading />;

	if (error) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-red-500 text-lg font-medium mb-2'>Error Loading Game</div>
					<p className='text-gray-600 mb-4'>Failed to fetch game details. Please try again later.</p>
					<button
						type='button'
						onClick={() => router.back()}
						className='inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
					>
						<ArrowLeftIcon className='w-4 h-4' />
						Go Back
					</button>
				</div>
			</div>
		);
	}

	if (!targetGame) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-gray-500 text-lg font-medium mb-2'>Game Not Found</div>
					<p className='text-gray-600 mb-4'>The requested game could not be found.</p>
					<button
						type='button'
						onClick={() => router.push('/replay')}
						className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
					>
						<ArrowLeftIcon className='w-4 h-4' />
						Back to Replays
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header with back button */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<button
						type='button'
						onClick={() => router.back()}
						className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
					>
						<ArrowLeftIcon className='w-5 h-5' />
						Back to Replays
					</button>
				</div>
			</div>

			{/* Game Details */}
			<ReplayDetails game={targetGame as VideoV2} />
		</div>
	);
};

export default DetailedReplayComponent;
