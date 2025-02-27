import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';

type GameHeaderProps = {
	homeTeam: string;
	awayTeam: string;
	competition: string;
	date: string;
};

const GameHeader = ({ homeTeam, awayTeam, competition, date }: GameHeaderProps) => (
	<div className='text-center'>
		<p className='my-2 text-xl font-semibold'>
			{homeTeam} <span className='text-xl font-bold'>-</span> {awayTeam}
		</p>
		<p>{competition}</p>
		<p>
			<span>{getFormattedDate(date)}</span> - <span>{getFormattedTime(date)}</span>
		</p>
	</div>
);

export default GameHeader;
