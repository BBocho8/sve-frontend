import type { VideoV2 } from '@/types/Video';
import { getFormattedDate, getFormattedTime } from '@/utils/formatDate';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

type GamePart =
	| 'firstHalf1'
	| 'firstHalf2'
	| 'firstHalf3'
	| 'secondHalf1'
	| 'secondHalf2'
	| 'secondHalf3'
	| 'fullGame'
	| '';

type ReplayDetailsProps = {
	game: VideoV2;
};

const ReplayDetails = ({ game }: ReplayDetailsProps) => {
	const [gamePart, setGamePart] = useState<GamePart>('');
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

	const gameLinks: Record<GamePart, string | undefined> = {
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
		'': undefined,
	};

	const availableParts = (Object.keys(gameLinks) as GamePart[]).filter(part => gameLinks[part]);

	const [showDownload, setShowDownload] = useState(false);
	const [downloadLink, setDownloadLink] = useState('');
	const [isDownloading, setIsDownloading] = useState(false);
	const formattedDate = dayjs(date).format('YYYY-MM-DD');

	const handleFetch = async () => {
		try {
			setIsDownloading(true);
			// Validate or format the video link if needed
			const res = await axios.get(`/api/download?videoLink=${gameLinks[gamePart]}`, {
				responseType: 'blob', // Optional: Ensures proper handling
			});
			const url = URL.createObjectURL(res.data);
			setDownloadLink(url);
			setIsDownloading(false);
			setShowDownload(true);
		} catch (error) {
			console.error(error);
		}
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

			<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center px-2 md:px-0 my-2 gap-x-2 w-full'>
				{availableParts.map(part => (
					<button
						key={part}
						type='button'
						className={`btn ${part === gamePart ? 'bg-black' : ''}`}
						onClick={() => {
							setGamePart(part);
							setDownloadLink('');
							setShowDownload(false);
							setIsDownloading(false);
						}}
					>
						<Typography sx={{ fontWeight: 500 }}>{part.replace(/([A-Z])/g, ' $1').trim()}</Typography>
					</button>
				))}
			</div>

			{!isVideoAvailable && <p className='text-blue-800'>Game video is not yet available</p>}
			{gamePart && gameLinks[gamePart] && (
				<iframe
					src={gameLinks[gamePart]}
					allowFullScreen
					className='w-4/5 h-auto my-2 aspect-video'
					title='Game Replay'
				/>
			)}

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
				}}
			>
				{gamePart && gameLinks[gamePart] && (
					<>
						{!downloadLink && (
							<button
								className={`btn px-2 ${isDownloading && 'bg-blue-500'}`}
								color={isDownloading ? 'info' : 'success'}
								type='button'
								onClick={handleFetch}
							>
								<Typography
									sx={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
								>
									{isDownloading && <CircularProgress size={20} sx={{ color: 'white' }} />}
									{isDownloading ? 'Generating download link...' : 'Download Video'}
								</Typography>
							</button>
						)}

						{showDownload && (
							<button
								type='button'
								className='btn px-2'
								onClick={() => {
									if (!downloadLink) return;

									// Create an invisible anchor tag for downloading
									const a = document.createElement('a');
									a.href = downloadLink;
									a.download = `${homeTeam}-${awayTeam}${formattedDate}-${gamePart}`; // File name
									document.body.appendChild(a);
									a.click();
									document.body.removeChild(a);
								}}
								disabled={!downloadLink} // Disable if no download link
							>
								<Typography sx={{ fontWeight: '600' }}>Download Video</Typography>
							</button>
						)}
					</>
				)}

				<button className='btn px-2' onClick={() => setIsResultOpen(prev => !prev)} type='button'>
					<Typography sx={{ fontWeight: '600' }}>{isResultOpen ? 'Hide result' : 'See result'}</Typography>
				</button>
				{isResultOpen && (
					<p className='text-lg'>
						{homeTeam} <span className='mt-2 text-xl font-bold'>{` ${homeScore} - ${awayScore} `}</span> {awayTeam}
					</p>
				)}
			</Box>
		</div>
	);
};

export default ReplayDetails;
