import type { VideoV2 } from '@/types/Video';
import { CalendarIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import getYoutubeID from '../../utils/getYoutubeID';

type GameCardProps = Partial<VideoV2>;

const GameCard = ({
	_id: id,
	isVideoAvailable,
	competition,
	homeTeam,
	awayTeam,
	date,
	firstHalf1,
	fullGame,
}: GameCardProps) => {
	const videoThumbnail = getYoutubeID(firstHalf1) || getYoutubeID(fullGame);
	const hasVideo = isVideoAvailable && videoThumbnail;

	return (
		<Link href={`/replay/${id}`} className='group'>
			<div className='bg-surface-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border-primary group-hover:border-interactive-primary'>
				{/* Image Section */}
				<div className='relative aspect-video overflow-hidden'>
					<Image
						src={hasVideo ? videoThumbnail : '/team.jpg'}
						alt={`${homeTeam} vs ${awayTeam}`}
						width={400}
						height={225}
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
					/>

					{/* Video Indicator */}
					{hasVideo && (
						<div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
							<div className='bg-surface-primary rounded-full p-3 shadow-lg'>
								<PlayIcon className='w-6 h-6 text-interactive-primary' />
							</div>
						</div>
					)}

					{/* Competition Badge */}
					<div className='absolute top-3 left-3'>
						<span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary hover:border-border-secondary transition-all duration-200'>
							{competition}
						</span>
					</div>
				</div>

				{/* Content Section */}
				<div className='p-4'>
					{/* Teams */}
					<h3 className='text-lg font-semibold text-text-primary mb-2 line-clamp-2'>
						{homeTeam} vs {awayTeam}
					</h3>

					{/* Date and Time */}
					<div className='flex items-center gap-4 text-sm text-text-secondary'>
						<div className='flex items-center gap-1'>
							<CalendarIcon className='w-4 h-4' />
							<span>{getFormattedDate(date as string)}</span>
						</div>
						<div className='flex items-center gap-1'>
							<ClockIcon className='w-4 h-4' />
							<span>{getFormattedTime(date as string)}</span>
						</div>
					</div>

					{/* Video Status */}
					<div className='mt-3 pt-3 border-t border-border-primary'>
						<div className='flex items-center gap-2'>
							{hasVideo ? (
								<>
									<div className='w-2 h-2 bg-interactive-primary rounded-full' />
									<span className='text-sm text-interactive-primary font-medium'>Video Available</span>
								</>
							) : (
								<>
									<div className='w-2 h-2 bg-surface-tertiary rounded-full' />
									<span className='text-sm text-text-tertiary'>No Video</span>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default GameCard;
