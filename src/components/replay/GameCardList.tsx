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
			<div className='bg-surface-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border-primary group-hover:border-interactive-primary'>
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
								<PlayIcon className='w-4 h-4 text-text-inverse' />
							</div>
						)}
					</div>

					{/* Content */}
					<div className='flex-1 ml-4 min-w-0'>
						<div className='flex items-start justify-between'>
							<div className='flex-1 min-w-0'>
								{/* Competition Badge */}
								<div className='mb-2'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-interactive-primary/15 text-interactive-primary border border-interactive-primary/20 hover:bg-interactive-primary/25 hover:border-interactive-primary/30 transition-all duration-200'>
										{competition}
									</span>
								</div>

								{/* Teams and Score */}
								<h3 className='text-lg font-semibold text-text-primary mb-1 truncate'>
									{homeTeam} vs {awayTeam}
								</h3>

								{/* Score */}
								<div className='text-sm text-text-secondary mb-2'>
									<span className='font-medium'>{homeScore}</span> - <span className='font-medium'>{awayScore}</span>
								</div>

								{/* Date and Time */}
								<div className='flex items-center gap-4 text-sm text-text-tertiary'>
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
											<div className='w-2 h-2 bg-interactive-primary rounded-full' />
											<span className='text-xs text-interactive-primary font-medium'>Video</span>
										</>
									) : (
										<>
											<div className='w-2 h-2 bg-surface-tertiary rounded-full' />
											<span className='text-xs text-text-tertiary'>No Video</span>
										</>
									)}
								</div>

								{/* Arrow Icon */}
								<ArrowRightIcon className='w-5 h-5 text-text-tertiary group-hover:text-interactive-primary transition-colors' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default GameCardList;
