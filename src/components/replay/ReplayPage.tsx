'use client';

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import Loading from '@/app/loading';
import { useProjectSetup } from '@/stores/sanity-store';
import type { VideoV2 } from '@/types/Video';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import BackToTopButton from './BackToTopButton';
import CompetitionFilter from './CompetitionFilter';
import EmptyState from './EmptyState';
import EnhancedSearchBar from './EnhancedSearchBar';
import ExportDialog from './ExportDialog';
import GameCard from './GameCard';
import GameCardList from './GameCardList';
import ViewToggle from './ViewToggle';

const ITEMS_PER_PAGE = 12;

const ReplayPage = () => {
	const { creds } = useProjectSetup();

	// Don't fetch if credentials are not available
	const shouldFetch = creds?.projectId && creds?.dataset;

	const {
		data: games,
		isLoading,
		error,
	} = useSWR(shouldFetch ? 'fetchVideosV2' : null, () =>
		fetchVideosV2(creds?.projectId as string, creds?.dataset as string),
	);

	const [selectedCompetition, setSelectedCompetition] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
	const [displayedGames, setDisplayedGames] = useState<VideoV2[]>([]);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const filteredGames = useMemo(() => {
		if (!games) return [];

		let filtered = games;

		// Filter by competition
		if (selectedCompetition !== 'all') {
			filtered = filtered.filter(game => game.competition === selectedCompetition);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				game =>
					game.homeTeam?.toLowerCase().includes(query) ||
					game.awayTeam?.toLowerCase().includes(query) ||
					game.competition?.toLowerCase().includes(query),
			);
		}

		return filtered;
	}, [games, selectedCompetition, searchQuery]);

	// Reset displayed games when filters change
	useEffect(() => {
		setDisplayedGames(filteredGames.slice(0, ITEMS_PER_PAGE));
		setHasMore(filteredGames.length > ITEMS_PER_PAGE);
	}, [filteredGames]);

	// Load more games
	const loadMore = useCallback(() => {
		if (isLoadingMore || !hasMore) return;

		setIsLoadingMore(true);
		setTimeout(() => {
			const currentLength = displayedGames.length;
			const newGames = filteredGames.slice(currentLength, currentLength + ITEMS_PER_PAGE);
			setDisplayedGames(prev => [...prev, ...newGames]);
			setHasMore(currentLength + ITEMS_PER_PAGE < filteredGames.length);
			setIsLoadingMore(false);
		}, 500); // Simulate loading delay
	}, [isLoadingMore, hasMore, displayedGames.length, filteredGames]);

	// Infinite scroll handler
	useEffect(() => {
		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
				loadMore();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loadMore]);

	// Show loading state if credentials are not ready or data is loading
	if (!shouldFetch || isLoading) return <Loading />;

	if (error) return <EmptyState type='error' />;

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Header Section */}
			<div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='text-center'>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Match Replays</h1>
						<p className='text-lg text-gray-600 dark:text-gray-400'>Watch full game replays from our matches</p>
					</div>
				</div>
			</div>

			{/* Search and Filters Section */}
			<div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					{/* Search Bar */}
					<div className='mb-8'>
						<EnhancedSearchBar
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder='Search by team name or competition...'
							games={games || []}
						/>
					</div>

					{/* Competition Filters */}
					<div className='mb-6'>
						<h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2'>
							<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<title>Filter Icon</title>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z'
								/>
							</svg>
							Filter by Competition
						</h3>
						<CompetitionFilter selectedCompetition={selectedCompetition} onCompetitionChange={setSelectedCompetition} />
					</div>

					{/* Active Filters Summary */}
					{(searchQuery || selectedCompetition !== 'all') && (
						<div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
							<div className='flex flex-wrap items-center gap-3 text-sm'>
								<span className='text-gray-600 dark:text-gray-400 font-medium'>Active filters:</span>
								{searchQuery && (
									<span className='inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700'>
										<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<title>Search Icon</title>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
											/>
										</svg>
										&quot;{searchQuery}&quot;
										<button
											onClick={() => setSearchQuery('')}
											className='ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors'
											type='button'
										>
											×
										</button>
									</span>
								)}
								{selectedCompetition !== 'all' && (
									<span className='inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium border border-green-200 dark:border-green-700'>
										<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<title>Competition Icon</title>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
											/>
										</svg>
										{selectedCompetition}
										<button
											onClick={() => setSelectedCompetition('all')}
											className='ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors'
											type='button'
										>
											×
										</button>
									</span>
								)}
								<button
									onClick={() => {
										setSearchQuery('');
										setSelectedCompetition('all');
									}}
									className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline text-xs font-medium transition-colors'
									type='button'
								>
									Clear all filters
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Results Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Results Summary and Controls */}
				<div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div>
						<p className='text-gray-600 dark:text-gray-400'>
							Showing <span className='font-semibold'>{displayedGames.length}</span> of{' '}
							<span className='font-semibold'>{filteredGames.length}</span> games
							{searchQuery && (
								<span className='text-gray-500 dark:text-gray-500'>
									{' '}
									for &quot;<span className='font-medium'>{searchQuery}</span>&quot;
								</span>
							)}
						</p>
					</div>
					<div className='flex items-center gap-4'>
						{/* View Toggle */}
						<ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

						{/* Export Button */}
						<button
							onClick={() => setIsExportDialogOpen(true)}
							className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'
							type='button'
						>
							<DocumentArrowDownIcon className='w-4 h-4' />
							Export
						</button>
					</div>
				</div>

				{/* Games Display */}
				{filteredGames.length === 0 ? (
					<EmptyState type='no-results' searchQuery={searchQuery} />
				) : (
					<>
						{/* Grid View */}
						{viewMode === 'grid' && (
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{displayedGames.map((game, index) => (
									<GameCard key={`${game._id}-${index}`} {...game} />
								))}
							</div>
						)}

						{/* List View */}
						{viewMode === 'list' && (
							<div className='space-y-4'>
								{displayedGames.map((game, index) => (
									<GameCardList key={`${game._id}-${index}`} {...game} />
								))}
							</div>
						)}

						{/* Load More Button */}
						{hasMore && (
							<div className='mt-8 text-center'>
								<button
									onClick={loadMore}
									disabled={isLoadingMore}
									className='px-6 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
									type='button'
								>
									{isLoadingMore ? 'Loading...' : 'Load More Games'}
								</button>
							</div>
						)}

						{/* End of results */}
						{!hasMore && displayedGames.length > 0 && (
							<div className='mt-8 text-center'>
								<p className='text-gray-500 dark:text-gray-400 text-sm'>You&apos;ve reached the end of the results</p>
							</div>
						)}
					</>
				)}
			</div>

			{/* Export Dialog */}
			<ExportDialog isOpen={isExportDialogOpen} onClose={() => setIsExportDialogOpen(false)} games={games || []} />

			{/* Back to Top Button */}
			<BackToTopButton />
		</div>
	);
};

export default ReplayPage;
