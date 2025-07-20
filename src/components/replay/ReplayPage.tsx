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
		<div className='min-h-screen bg-bg-secondary'>
			{/* Header Section */}
			<div className='bg-surface-primary shadow-sm border-b border-border-primary'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='text-center'>
						<h1 className='text-3xl font-bold text-text-primary mb-2'>Match Replays</h1>
						<p className='text-lg text-text-secondary'>Watch full game replays from our matches</p>
					</div>
				</div>
			</div>

			{/* Search and Filters Section */}
			<div className='bg-surface-primary border-b border-border-primary sticky top-0 z-10 shadow-sm'>
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
						<h3 className='text-sm font-semibold text-text-primary mb-4 flex items-center gap-2'>
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
						<div className='pt-6 border-t border-border-primary'>
							<div className='flex flex-wrap items-center gap-3 text-sm'>
								<span className='text-text-secondary font-medium'>Active filters:</span>
								{searchQuery && (
									<span className='inline-flex items-center gap-2 px-3 py-1.5 bg-interactive-secondary/10 text-interactive-secondary rounded-full text-xs font-medium border border-interactive-secondary/30'>
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
											className='ml-1 text-interactive-secondary hover:text-interactive-secondary transition-colors'
											type='button'
										>
											×
										</button>
									</span>
								)}
								{selectedCompetition !== 'all' && (
									<span className='inline-flex items-center gap-2 px-3 py-1.5 bg-interactive-primary/10 text-interactive-primary rounded-full text-xs font-medium border border-interactive-primary/30'>
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
											className='ml-1 text-interactive-primary hover:text-interactive-primary transition-colors'
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
									className='text-text-tertiary hover:text-text-primary underline text-xs font-medium transition-colors'
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
						<p className='text-text-secondary'>
							Showing <span className='font-semibold'>{displayedGames.length}</span> of{' '}
							<span className='font-semibold'>{filteredGames.length}</span> games
							{searchQuery && (
								<span className='text-text-tertiary'>
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
							className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary bg-surface-primary border border-border-secondary rounded-md hover:bg-state-hover transition-colors'
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
									className='px-6 py-3 text-sm font-medium text-text-inverse bg-interactive-primary border border-transparent rounded-md hover:bg-interactive-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-interactive-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
									type='button'
								>
									{isLoadingMore ? 'Loading...' : 'Load More Games'}
								</button>
							</div>
						)}

						{/* End of results */}
						{!hasMore && displayedGames.length > 0 && (
							<div className='mt-8 text-center'>
								<p className='text-text-tertiary text-sm'>You&apos;ve reached the end of the results</p>
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
