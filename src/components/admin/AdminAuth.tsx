'use client';
import { useProjectSetup } from '@/stores/sanity-store';
import { testPayload, testUpdatePayload } from '@/types/Video';
import { createVideo, deleteVideo, updateVideo } from '@/utils/fetchVideo';
import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Downloader from '../Downloader';

const AdminAuth = () => {
	const { creds } = useProjectSetup();
	const { data: session } = useSession();

	const getEmbedUrl = (url: string) => {
		const splited = url.split('v=');
		const splitedAgain = splited[1].split('&');
		const videoId = splitedAgain[0];

		return `https://www.youtube.com/embed/${videoId}`;
	};

	// useEffect(() => {
	// 	fetch('/api/youtube').then(async res => {
	// 		const data = await res.json();
	// 		setTest(data);

	// 		// const blob = new Blob([data], { type: 'video/mp4' });
	// 		// const url = URL.createObjectURL(blob);

	// 		// setUrlString(url);
	// 	});
	// }, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 4,
			}}
		>
			<Typography
				sx={{
					fontSize: 28,
					fontWeight: 'bold',
				}}
			>
				Admin Page
			</Typography>
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 300,
					color: 'gray',
				}}
			>
				Welcome to the admin page.
			</Typography>
			<Button
				onClick={() =>
					createVideo(creds?.projectId as string, creds?.dataset as string, creds?.token as string, testPayload).then(
						res => res,
					)
				}
			>
				Test Add Entry
			</Button>
			<Button
				onClick={() =>
					updateVideo(
						creds?.projectId as string,
						creds?.dataset as string,
						creds?.token as string,
						testUpdatePayload,
						'5AevX4rXJx5kciLHgcBYCJ',
					).then(res => res)
				}
			>
				Test Update Entry
			</Button>
			<Button
				onClick={() =>
					deleteVideo(
						creds?.projectId as string,
						creds?.dataset as string,
						creds?.token as string,
						'DHLrQB6qYtDfEu8NrqE33v',
					).then(res => res)
				}
			>
				Test Delete Entry
			</Button>
			<p>{session?.user?.name}</p>
			<iframe
				title='video'
				src={getEmbedUrl('https://www.youtube.com/watch?v=F6sThOJiUNY')}
				allowFullScreen
				width={720}
				height={380}
			/>

			{/* <button
				type='button'
				onClick={() =>
					fetch('/api/youtube').then(async res => {
						const data = await res.json();

						console.log(data);
						return data;
					})
				}
			>
				YTB
			</button>
			{!!urlString && (
				<a
					// target='_blank' rel='noreferrer'
					download
					href={'/video/video.mp4'}
				>
					Download video
				</a>
			)} */}

			<Downloader />
		</Box>
	);
};

export default AdminAuth;
