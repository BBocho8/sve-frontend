import type { VideoV2 } from '@/types/Video';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.png';
import gameImg from '../../../public/team.jpg';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import getYoutubeID from '../../utils/getYoutubeID';

const GamesContainer = ({
	_id: id,
	isVideoAvailable,
	competition,
	homeTeam,
	awayTeam,
	date,
	firstHalf1,
	fullGame,
}: Partial<VideoV2>) => {
	return (
		<div key={id} className=' pt-2 pb-0 md:pt-4 md:pb-4 mx-auto  '>
			<div className=' md:max-w-sm'>
				<Link href={`/replay/${id}`}>
					{isVideoAvailable ? (
						<Image
							src={getYoutubeID(firstHalf1) ? `${getYoutubeID(firstHalf1)}` : `${getYoutubeID(fullGame)}`}
							alt={`${homeTeam} ${awayTeam} ${competition}`}
							width={1080}
							height={720}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							priority
						/>
					) : (
						<Image src={gameImg} alt={`${homeTeam} ${awayTeam} ${competition}`} width={1080} height={720} priority />
					)}
					<div className='flex flex-col my-2 md:my-4'>
						<div className='flex items-center justify-start px-4 gap-x-3'>
							<Image src={logo} alt='logo SGE' className=' aspect-square w-8 h-8' width={36} height={36} />
							<div className='flex flex-col gap-y-0.5 mb-2'>
								<p
									className='text-lg font-medium leading-6 tracking-tighter line-clamp-1'
									title={`${homeTeam} vs ${awayTeam} - ${competition}`}
								>
									{homeTeam} vs {awayTeam} - <span>{competition}</span>
								</p>
								<p className='font-light text-md'>
									{getFormattedDate(date as string)} - <span>{getFormattedTime(date as string)}</span>
								</p>
							</div>
						</div>
						{/* {isVideoAvailable ? (
							<button className='btn' type='button'>
								WATCH REPLAY
							</button>
						) : (
							<button
								className='bg-red-500 btn bg-opacity-70 hover:bg-red-500 hover:text-white hover:bg-opacity-70 hover:border-red-500'
								disabled
								type='button'
							>
								Video is not available
							</button>
						)} */}
					</div>
				</Link>
			</div>
		</div>
	);
};
export default GamesContainer;
