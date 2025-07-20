import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

type GameHeaderProps = {
	homeTeam: string;
	awayTeam: string;
	competition: string;
	date: string;
};

const GameHeader = ({ homeTeam, awayTeam, competition, date }: GameHeaderProps) => (
	<div className='bg-surface-primary rounded-lg shadow-sm border border-border-primary p-6'>
		<div className='text-center'>
			{/* Competition Badge */}
			<div className='mb-4'>
				<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-interactive-primary/10 text-interactive-primary'>
					{competition}
				</span>
			</div>

			{/* Teams */}
			<h1 className='text-3xl font-bold text-text-primary mb-4'>
				{homeTeam} <span className='text-text-tertiary mx-4'>vs</span> {awayTeam}
			</h1>

			{/* Date and Time */}
			<div className='flex items-center justify-center gap-6 text-text-secondary'>
				<div className='flex items-center gap-2'>
					<CalendarIcon className='w-5 h-5' />
					<span className='font-medium'>{getFormattedDate(date)}</span>
				</div>
				<div className='flex items-center gap-2'>
					<ClockIcon className='w-5 h-5' />
					<span className='font-medium'>{getFormattedTime(date)}</span>
				</div>
			</div>
		</div>
	</div>
);

export default GameHeader;
