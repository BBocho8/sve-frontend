'use client';
import { useState } from 'react';

import type { Video } from '@/types/Video';
import GamesContainer from './GamesContainer';

type ReplayProps = {
	data: Video[];
};

const Replay = ({ data }: ReplayProps) => {
	const [isCompetition, setIsCompetition] = useState('all');

	const competitions = ['Bezirksliga', 'Kreisfreundschaftsspiele', 'Rheinlandpokal'];

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
