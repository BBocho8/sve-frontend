'use client';
import { useEffect, useState } from 'react';

import { Pagination } from '@mui/material';
import GamesContainer from './GamesContainer';

type ReplayProps = {
	domainUrl: string;
};

import Loading from '@/app/loading';
import { fetchVideos } from '@/utils/fetchVideo';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useSWR from 'swr';

const theme = createTheme({
	palette: {
		primary: {
			main: '#15A34A',
		},
	},
});

const Replay = ({ domainUrl }: ReplayProps) => {
	const { data: games, isLoading, error } = useSWR('fetchVideos', () => fetchVideos(domainUrl));

	const [isCompetition, setIsCompetition] = useState('all');
	const competitions = ['Bezirksliga', 'Kreisfreundschaftsspiele', 'Rheinlandpokal'];
	const rowPerPage = 10;
	const [filteredGames, setFilteredGames] = useState(games?.slice(0, rowPerPage) || []);
	const [pages, setPages] = useState(Math.ceil(filteredGames.length / rowPerPage));
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (value: number) => {
		setCurrentPage(value);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	useEffect(() => {
		if (!games || error) return;

		const filteredGamesEffect = games.filter(game => {
			if (isCompetition === 'all') return true;
			return game.competition === isCompetition;
		});

		setFilteredGames(filteredGamesEffect);
		setPages(Math.ceil(filteredGamesEffect.length / rowPerPage));
		setCurrentPage(1);
	}, [isCompetition, games, error]);

	if (isLoading) return <Loading />;

	return (
		<section>
			<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center gap-2 mt-4 pb-2 px-2 md:mt-0 md:px-0 md:pb-0'>
				{competitions.map(competition => {
					return (
						<button
							onClick={() => setIsCompetition(competition)}
							className={isCompetition === competition ? 'btn bg-black' : 'btn'}
							key={competition}
							type='button'
						>
							{competition}
						</button>
					);
				})}
				<button
					className={isCompetition === 'all' ? 'btn bg-black' : 'btn'}
					onClick={() => setIsCompetition('all')}
					type='button'
				>
					ALL GAMES
				</button>
			</div>

			<div className='grid items-center justify-center grid-cols-1 md:px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2'>
				{filteredGames.slice((currentPage - 1) * rowPerPage, currentPage * rowPerPage).map(game => {
					const {
						id,
						isVideoAvailable,

						competition,
						homeTeam,
						awayTeam,

						date,
						firstHalf1,

						fullGame,
					} = game;

					return (
						<GamesContainer
							key={`${game.id}-ReplayComponent`}
							id={id}
							isVideoAvailable={isVideoAvailable}
							competition={competition}
							homeTeam={homeTeam}
							awayTeam={awayTeam}
							date={date}
							firstHalf1={firstHalf1}
							fullGame={fullGame}
						/>
					);
				})}
			</div>
			<ThemeProvider theme={theme}>
				<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'center',
						my: 2,
					}}
					count={pages}
					color='primary'
					page={currentPage}
					onChange={(e, value) => handlePageChange(value)}
				/>
			</ThemeProvider>
		</section>
	);
};

export default Replay;
