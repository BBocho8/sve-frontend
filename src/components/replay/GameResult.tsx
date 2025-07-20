import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
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
		<div className='bg-surface-primary rounded-lg shadow-sm border border-border-primary p-6'>
			<button
				type='button'
				onClick={() => setIsResultOpen(prev => !prev)}
				className='flex items-center gap-2 text-text-primary hover:text-text-primary transition-colors mb-4'
			>
				{isResultOpen ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
				<span className='font-semibold'>{isResultOpen ? 'Hide Result' : 'Show Result'}</span>
			</button>

			{isResultOpen && (
				<div className='text-center'>
					<div className='text-2xl font-bold text-text-primary mb-2'>Final Score</div>
					<div className='text-4xl font-bold text-interactive-primary'>
						{homeScore} - {awayScore}
					</div>
					<div className='text-lg text-text-secondary mt-2'>
						{homeTeam} vs {awayTeam}
					</div>
				</div>
			)}
		</div>
	);
};

export default GameResult;
