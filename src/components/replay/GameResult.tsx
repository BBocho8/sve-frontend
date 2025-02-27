import { Box, Typography } from '@mui/material';
import { useState } from 'react';

type GameResultProps = {
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;
};

const GameResult = ({ homeTeam, awayTeam, homeScore, awayScore }: GameResultProps) => {
	const [isResultOpen, setIsResultOpen] = useState(false);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
			<button className='btn px-2' onClick={() => setIsResultOpen(prev => !prev)} type='button'>
				<Typography sx={{ fontWeight: '600' }}>{isResultOpen ? 'Hide result' : 'See result'}</Typography>
			</button>
			{isResultOpen && (
				<p className='text-lg'>
					{homeTeam} <span className='mt-2 text-xl font-bold'>{` ${homeScore} - ${awayScore} `}</span> {awayTeam}
				</p>
			)}
		</Box>
	);
};

export default GameResult;
