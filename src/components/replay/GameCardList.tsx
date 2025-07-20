import type { VideoV2 } from '@/types/Video';
import { ArrowRightIcon, CalendarIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import getYoutubeID from '../../utils/getYoutubeID';

type GameCardListProps = Partial<VideoV2>;

const GameCardList = ({
	_id: id,
	isVideoAvailable,
	competition,
	homeTeam,
	awayTeam,
	homeScore,
	awayScore,
	date,
	firstHalf1,
	fullGame,
}: GameCardListProps) => {
	const videoThumbnail = getYoutubeID(firstHalf1) || getYoutubeID(fullGame);
	const hasVideo = isVideoAvailable && videoThumbnail;

	return (
		<Link href={`/replay/${id}`} className='group'>
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600'>
				<div className='flex items-center p-4'>
					{/* Thumbnail */}
					<div className='relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden'>
						<Image
							src={hasVideo ? videoThumbnail : '/team.jpg'}
							alt={`${homeTeam} vs ${awayTeam}`}
							width={96}
							height={64}
							className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
						/>
						{hasVideo && (
							<div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
								<PlayIcon className='w-4 h-4 text-white' />
							</div>
						)}
					</div>

					{/* Content */}
					<div className='flex-1 ml-4 min-w-0'>
						<div className='flex items-start justify-between'>
							<div className='flex-1 min-w-0'>
								{/* Competition Badge */}
								<div className='mb-2'>
									<span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'>
										{competition}
									</span>
								</div>

								{/* Teams and Score */}
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate'>
									{homeTeam} vs {awayTeam}
								</h3>

								{/* Score */}
								<div className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
									<span className='font-medium'>{homeScore}</span> - <span className='font-medium'>{awayScore}</span>
								</div>

								{/* Date and Time */}
								<div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
									<div className='flex items-center gap-1'>
										<CalendarIcon className='w-3 h-3' />
										<span>{getFormattedDate(date as string)}</span>
									</div>
									<div className='flex items-center gap-1'>
										<ClockIcon className='w-3 h-3' />
										<span>{getFormattedTime(date as string)}</span>
									</div>
								</div>
							</div>

							{/* Video Status and Arrow */}
							<div className='flex flex-col items-end gap-2 ml-4'>
								{/* Video Status */}
								<div className='flex items-center gap-2'>
									{hasVideo ? (
										<>
											<div className='w-2 h-2 bg-green-500 rounded-full' />
											<span className='text-xs text-green-700 dark:text-green-400 font-medium'>Video</span>
										</>
									) : (
										<>
											<div className='w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full' />
											<span className='text-xs text-gray-500 dark:text-gray-400'>No Video</span>
										</>
									)}
								</div>

								{/* Arrow Icon */}
								<ArrowRightIcon className='w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default GameCardList;
