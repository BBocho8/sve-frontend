import type { VideoV2 } from '@/types/Video';
import { ExclamationTriangleIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GameHeader from './GameHeader';
import GamePartsButtons from './GamePartsButtons';
import GameResult from './GameResult';

type GamePart =
	| 'firstHalf1'
	| 'firstHalf2'
	| 'firstHalf3'
	| 'secondHalf1'
	| 'secondHalf2'
	| 'secondHalf3'
	| 'fullGame'
	| '';

type ReplayDetailsProps = {
	game: VideoV2;
};

const ReplayDetails = ({ game }: ReplayDetailsProps) => {
	const [gamePart, setGamePart] = useState<GamePart>('');

	const {
		isVideoAvailable,
		competition,
		homeTeam,
		awayTeam,
		homeScore,
		awayScore,
		date,
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
	} = game;

	const gameLinks: Record<GamePart, string | undefined> = {
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
		'': undefined,
	};

	const availableParts = (Object.keys(gameLinks) as GamePart[]).filter(part => gameLinks[part]);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			{/* Game Header */}
			<div className='mb-8'>
				<GameHeader homeTeam={homeTeam} awayTeam={awayTeam} competition={competition} date={date} />
			</div>

			{/* Video Section */}
			<div className='bg-surface-primary rounded-lg shadow-sm border border-border-primary overflow-hidden'>
				{isVideoAvailable ? (
					<>
						{/* Video Player Controls */}
						<div className='p-6 border-b border-border-primary'>
							<div className='flex items-center gap-2 mb-4'>
								<PlayIcon className='w-5 h-5 text-interactive-primary' />
								<h3 className='text-lg font-semibold text-text-primary'>Watch Replay</h3>
							</div>
							<GamePartsButtons availableParts={availableParts} selectedPart={gamePart} onSelectPart={setGamePart} />
						</div>

						{/* Video Player */}
						{gamePart && gameLinks[gamePart] ? (
							<div className='p-6'>
								<div className='relative aspect-video bg-bg-primary rounded-lg overflow-hidden'>
									<iframe
										src={gameLinks[gamePart]}
										allowFullScreen
										className='w-full h-full'
										title={`${homeTeam} vs ${awayTeam} - ${gamePart}`}
									/>
								</div>
							</div>
						) : (
							<div className='p-12 text-center'>
								<div className='text-text-tertiary mb-4'>
									<PlayIcon className='w-16 h-16 mx-auto' />
								</div>
								<p className='text-text-secondary'>Select a game part to start watching</p>
							</div>
						)}
					</>
				) : (
					<div className='p-12 text-center'>
						<div className='text-interactive-warning mb-4'>
							<ExclamationTriangleIcon className='w-16 h-16 mx-auto' />
						</div>
						<h3 className='text-lg font-medium text-text-primary mb-2'>Video Not Available</h3>
						<p className='text-text-secondary'>
							Game video is not yet available. Please check back later.
						</p>
					</div>
				)}
			</div>

			{/* Game Result */}
			<div className='mt-8'>
				<GameResult homeTeam={homeTeam} awayTeam={awayTeam} homeScore={homeScore} awayScore={awayScore} />
			</div>
		</div>
	);
};

export default ReplayDetails;
