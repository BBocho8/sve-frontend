import type { VideoV2 } from '@/types/Video';
import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

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
	const [isResultOpen, setIsResultOpen] = useState(false);

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
		<div className='flex flex-col items-center mx-auto my-4'>
			<div className='text-center'>
				<p className='my-2 text-xl font-semibold'>
					{homeTeam} <span className='text-xl font-bold'>-</span> {awayTeam}
				</p>
				<p>{competition}</p>
				<p>
					<span>{getFormattedDate(date)}</span> - <span>{getFormattedTime(date)}</span>
				</p>
			</div>

			<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center px-2 md:px-0 my-2 gap-x-2 w-full'>
				{availableParts.map(part => (
					<button
						key={part}
						type='button'
						className={`btn ${part === gamePart ? 'bg-black' : ''}`}
						onClick={() => {
							setGamePart(part);
						}}
					>
						<Typography sx={{ fontWeight: 500 }}>{part.replace(/([A-Z])/g, ' $1').trim()}</Typography>
					</button>
				))}
			</div>

			{!isVideoAvailable && <p className='text-blue-800'>Game video is not yet available</p>}
			{gamePart && gameLinks[gamePart] && (
				<iframe
					src={gameLinks[gamePart]}
					allowFullScreen
					className='w-4/5 h-auto my-2 aspect-video'
					title='Game Replay'
				/>
			)}

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
				}}
			>
				<button className='btn px-2' onClick={() => setIsResultOpen(prev => !prev)} type='button'>
					<Typography sx={{ fontWeight: '600' }}>{isResultOpen ? 'Hide result' : 'See result'}</Typography>
				</button>
				{isResultOpen && (
					<p className='text-lg'>
						{homeTeam} <span className='mt-2 text-xl font-bold'>{` ${homeScore} - ${awayScore} `}</span> {awayTeam}
					</p>
				)}
			</Box>
		</div>
	);
};

export default ReplayDetails;
