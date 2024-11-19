import type { VideoV2 } from '@/types/Video';
import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';
import { useState } from 'react';

type ReplayDetailsProps = {
	game: VideoV2;
};
const ReplayDetails = ({ game }: ReplayDetailsProps) => {
	const [gamePart, setGamePart] = useState<
		'firstHalf1' | 'firstHalf2' | 'firstHalf3' | 'secondHalf1' | 'secondHalf2' | 'secondHalf3' | 'fullGame' | ''
	>('');
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

	const gameLinks = {
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
	};

	const gameLinksArray = Object.keys(gameLinks);

	const result = gameLinksArray.filter(link => {
		if (game[link as keyof VideoV2]) {
			return link;
		}
	});

	const handleClick = (res: typeof gamePart) => {
		setGamePart(res);
	};

	const handleResult = () => {
		setIsResultOpen(!isResultOpen);
	};

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
			<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center px-2 md:px-0 my-2 gap-x-2 gap-y-2 w-full'>
				{result.map(res => {
					return (
						<button
							key={res}
							type='button'
							className={res === gamePart ? 'btn bg-black' : 'btn'}
							onClick={() => handleClick(res as typeof gamePart)}
						>
							{res === 'firstHalf1'
								? 'First Half 1'
								: res === 'firstHalf2'
									? 'First Half 2'
									: res === 'firstHalf3'
										? 'First Half 3'
										: res === 'secondHalf1'
											? 'Second Half 1'
											: res === 'secondHalf2'
												? 'Second Half 2'
												: res === 'secondHalf3'
													? 'Second Half 3'
													: res === 'fullGame'
														? 'Full Game'
														: ''}
						</button>
					);
				})}
			</div>
			{!isVideoAvailable && <p className='text-blue-800'>Game video is not yet available</p>}
			{gamePart && (
				<iframe src={game[gamePart]} allowFullScreen className='w-4/5 h-auto my-2 aspect-video' title='video game' />
			)}

			<button className='btn' onClick={handleResult} type='button'>
				{!isResultOpen ? 'see result' : 'Hide result'}
			</button>
			{isResultOpen && (
				<p className='text-lg'>
					{homeTeam}
					<span className='mt-2 text-xl font-bold '>{`   ${homeScore} - ${awayScore}   `}</span>
					{awayTeam}
				</p>
			)}
		</div>
	);
};
export default ReplayDetails;
