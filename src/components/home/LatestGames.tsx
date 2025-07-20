'use client';

import { useProjectSetup } from '@/stores/sanity-store';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import { getFormattedDate } from '@/utils/formatDate';
import getYoutubeID from '@/utils/getYoutubeID';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

const LatestGames = () => {
	const { creds } = useProjectSetup();

	// Don't fetch if credentials are not available
	const shouldFetch = creds?.projectId && creds?.dataset;

	const {
		data: games,
		isLoading,
		error,
	} = useSWR(
		shouldFetch ? 'fetchVideosV2' : null,
		() => fetchVideosV2(creds?.projectId as string, creds?.dataset as string),
		{
			shouldRetryOnError: false,
			revalidateOnFocus: false,
		},
	);

	// Get the latest 3 games
	const latestGames = games?.slice(0, 3) || [];

	// Show loading state if credentials are not ready or data is loading
	if (!shouldFetch || isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
				{[1, 2, 3].map(i => (
					<div
						key={i}
						className='bg-surface-primary rounded-lg shadow-sm border border-border-primary overflow-hidden animate-pulse'
					>
						<div className='aspect-video bg-surface-tertiary' />
						<div className='p-4'>
							<div className='h-4 bg-surface-tertiary rounded mb-2' />
							<div className='h-3 bg-surface-tertiary rounded w-2/3' />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center py-8'>
				<p className='text-text-secondary mb-4'>Unable to load recent games</p>
				<Link
					href='/replay'
					className='inline-flex items-center gap-2 bg-interactive-primary text-text-inverse px-6 py-2 rounded-lg font-semibold hover:bg-interactive-primary transition-colors'
				>
					Browse All Games
					<ArrowRightIcon className='w-4 h-4' />
				</Link>
			</div>
		);
	}

	if (!latestGames.length) {
		return (
			<div className='text-center py-8'>
				<p className='text-text-secondary mb-4'>No recent games available</p>
				<Link
					href='/replay'
					className='inline-flex items-center gap-2 bg-interactive-primary text-text-inverse px-6 py-2 rounded-lg font-semibold hover:bg-interactive-primary transition-colors'
				>
					Browse All Games
					<ArrowRightIcon className='w-4 h-4' />
				</Link>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
			{latestGames.map(game => {
				const videoThumbnail = getYoutubeID(game.firstHalf1) || getYoutubeID(game.fullGame);
				const hasVideo = game.isVideoAvailable && videoThumbnail;

				return (
					<Link
						key={game._id}
						href={`/replay/${game._id}`}
						className='bg-surface-primary rounded-lg shadow-sm border border-border-primary overflow-hidden hover:shadow-md transition-shadow group'
					>
						<div className='relative aspect-video bg-surface-tertiary overflow-hidden'>
							{hasVideo ? (
								<Image
									src={videoThumbnail}
									alt={`${game.homeTeam} vs ${game.awayTeam}`}
									width={400}
									height={225}
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center'>
									<PlayIcon className='w-12 h-12 text-text-tertiary' />
								</div>
							)}
							{hasVideo && (
								<div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
									<div className='bg-surface-primary rounded-full p-2'>
										<PlayIcon className='w-6 h-6 text-interactive-primary' />
									</div>
								</div>
							)}
						</div>
						<div className='p-4'>
							<h3 className='font-semibold text-text-primary mb-1 line-clamp-1'>
								{game.homeTeam} vs {game.awayTeam}
							</h3>
							<p className='text-sm text-text-secondary mb-2'>{game.competition}</p>
							<p className='text-xs text-text-tertiary'>{getFormattedDate(game.date as string)}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default LatestGames;
