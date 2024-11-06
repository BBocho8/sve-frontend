'use client';
import { useState } from 'react';
import removeAccents from 'remove-accents';

import type { Video } from '@/types/Video';
import Link from 'next/link';
import GamesContainer from './GamesContainer';

const getFilteredItems = (query: string, items: Video[]) => {
	if (!query) {
		return items;
	}
	if (query.length > 2) {
		return items.filter(
			game =>
				removeAccents(game.homeTeam.toLowerCase()).includes(`${removeAccents(query.toLowerCase())}`) ||
				removeAccents(game.awayTeam.toLowerCase()).includes(`${removeAccents(query.toLowerCase())}`),
		);
	}
};

type ReplayProps = {
	data: Video[];
};

const Replay = ({ data }: ReplayProps) => {
	const [isCompetition, setIsCompetition] = useState('all');
	const [query, setQuery] = useState('');

	const filteredItems = getFilteredItems(query, data);

	const competitions = ['Kreisfreundschaftsspiele', 'Bezirksliga', 'Rheinlandpokal'];

	return (
		<section>
			<h1 className='text-center uppercase text-h2'>All Full Game Replays</h1>
			<div className='flex flex-wrap items-center justify-center gap-2'>
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
			<div className='flex flex-col items-center justify-center py-4 gap-y-2'>
				<input
					type='search'
					name='search'
					id='search'
					onChange={e => setQuery(e.target.value)}
					placeholder='Search for a game'
					className='rounded-sm border-primaryGreen placeholder:text-black placeholder:opacity-70 focus:border-primaryGreen focus:ring-primaryGreen'
				/>

				<ul className='overflow-y-auto max-h-52'>
					{query.length > 2 &&
						filteredItems?.map(game => (
							<Link key={game.id} href={`/replay/${game.id}`}>
								<p className='px-4 py-2 text-black bg-white border hover:bg-gray-300 '>
									{game.homeTeam} - {game.awayTeam}
								</p>
							</Link>
						))}
				</ul>
			</div>

			<div className='grid items-center justify-center grid-cols-1 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2'>
				{isCompetition === 'all'
					? data.map(game => {
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
									key={game.id}
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
						})
					: data
							.filter(game => game.competition === isCompetition)
							.map(game => {
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
										key={game.id}
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
		</section>
	);
};

export default Replay;
