import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

type GameHeaderProps = {
	homeTeam: string;
	awayTeam: string;
	competition: string;
	date: string;
};

const GameHeader = ({ homeTeam, awayTeam, competition, date }: GameHeaderProps) => (
	<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
		<div className='text-center'>
			{/* Competition Badge */}
			<div className='mb-4'>
				<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'>
					{competition}
				</span>
			</div>

			{/* Teams */}
			<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
				{homeTeam} <span className='text-gray-400 dark:text-gray-500 mx-4'>vs</span> {awayTeam}
			</h1>

			{/* Date and Time */}
			<div className='flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400'>
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
