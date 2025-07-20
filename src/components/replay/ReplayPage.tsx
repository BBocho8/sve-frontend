'use client';

import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import Loading from '@/app/loading';
import { useProjectSetup } from '@/stores/sanity-store';
import { fetchVideosV2 } from '@/utils/fetchVideo';
import CompetitionFilter from './CompetitionFilter';
import EmptyState from './EmptyState';
import GameCard from './GameCard';
import SearchBar from './SearchBar';

const theme = createTheme({
	palette: { primary: { main: '#15A34A' } },
});

const ROWS_PER_PAGE = 12; // Increased for better UX

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
	const [currentPage, setCurrentPage] = useState(1);

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

	const totalPages = Math.ceil(filteredGames.length / ROWS_PER_PAGE);
	const paginatedGames = useMemo(
		() => filteredGames.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
		[filteredGames, currentPage],
	);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCompetition, searchQuery]);

	// Scroll to top when page changes
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	// Show loading state if credentials are not ready or data is loading
	if (!shouldFetch || isLoading) return <Loading />;

	if (error) return <EmptyState type='error' />;

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header Section */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='text-center'>
						<h1 className='text-3xl font-bold text-gray-900 mb-2'>Match Replays</h1>
						<p className='text-lg text-gray-600'>Relive the best moments from our games</p>
					</div>
				</div>
			</div>

			{/* Filters Section */}
			<div className='bg-white border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
						<CompetitionFilter selectedCompetition={selectedCompetition} onCompetitionChange={setSelectedCompetition} />
						<SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search teams or competitions...' />
					</div>
				</div>
			</div>

			{/* Results Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Results Summary */}
				<div className='mb-6'>
					<p className='text-gray-600'>
						Showing {filteredGames.length} of {games?.length || 0} games
						{searchQuery && ` for "${searchQuery}"`}
					</p>
				</div>

				{/* Games Grid */}
				{filteredGames.length === 0 ? (
					<EmptyState type='no-results' searchQuery={searchQuery} />
				) : (
					<>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{paginatedGames.map(game => (
								<GameCard key={game._id} {...game} />
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className='mt-12 flex justify-center'>
								<ThemeProvider theme={theme}>
									<Pagination
										count={totalPages}
										color='primary'
										page={currentPage}
										onChange={(_, value) => setCurrentPage(value)}
										size='large'
										showFirstButton
										showLastButton
									/>
								</ThemeProvider>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default ReplayPage;
