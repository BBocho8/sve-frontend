'use client';

import { useProjectSetup } from '@/stores/sanity-store';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { CalendarIcon, PlayIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline';
import useSWR from 'swr';

const StatsSection = () => {
	const { creds } = useProjectSetup();

	// Don't fetch if credentials are not available
	const shouldFetch = creds?.projectId && creds?.dataset;

	const { data: games, isLoading } = useSWR(
		shouldFetch ? 'fetchVideosV2' : null,
		() => fetchVideosV2(creds?.projectId as string, creds?.dataset as string),
		{
			shouldRetryOnError: false,
			revalidateOnFocus: false,
		},
	);

	// Calculate stats
	const totalGames = games?.length || 0;
	const gamesWithVideo = games?.filter(game => game.isVideoAvailable).length || 0;
	const competitions = games ? [...new Set(games.map(game => game.competition))].length : 0;
	const currentSeason = new Date().getFullYear();

	// Show loading state if credentials are not ready or data is loading
	if (!shouldFetch || isLoading) {
		return (
			<div className='py-8'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{[1, 2, 3, 4].map(i => (
						<div key={i} className='text-center animate-pulse'>
							<div className='h-8 bg-text-inverse/20 rounded mb-2' />
							<div className='h-4 bg-text-inverse/20 rounded w-3/4 mx-auto' />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='py-8'>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
				<div className='text-center'>
					<div className='flex items-center justify-center mb-2'>
						<PlayIcon className='w-6 h-6 mr-2' />
						<span className='text-2xl font-bold'>{totalGames}</span>
					</div>
					<p className='text-text-inverse/90 text-sm'>Total Games</p>
				</div>

				<div className='text-center'>
					<div className='flex items-center justify-center mb-2'>
						<CalendarIcon className='w-6 h-6 mr-2' />
						<span className='text-2xl font-bold'>{gamesWithVideo}</span>
					</div>
					<p className='text-text-inverse/90 text-sm'>With Video</p>
				</div>

				<div className='text-center'>
					<div className='flex items-center justify-center mb-2'>
						<TrophyIcon className='w-6 h-6 mr-2' />
						<span className='text-2xl font-bold'>{competitions}</span>
					</div>
					<p className='text-text-inverse/90 text-sm'>Competitions</p>
				</div>

				<div className='text-center'>
					<div className='flex items-center justify-center mb-2'>
						<UsersIcon className='w-6 h-6 mr-2' />
						<span className='text-2xl font-bold'>{currentSeason}</span>
					</div>
					<p className='text-text-inverse/90 text-sm'>Current Season</p>
				</div>
			</div>
		</div>
	);
};

export default StatsSection;
