'use client';

import { type TProjectSetup, useProjectSetup } from '@/stores/sanity-store';
import { testPayload, testUpdatePayload } from '@/types/Video';
import { createVideo, deleteVideo, updateVideo } from '@/utils/fetchVideo';
import { Box, Button, Typography } from '@mui/material';

const AdminPageComponent = () => {
	const { creds, setProjectSetup } = useProjectSetup();

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

			<button
				type='button'
				onClick={() =>
					setProjectSetup({
						...(creds as TProjectSetup),
						test: 'testdsdfsdfsseee',
					})
				}
			>
				Onclickme
			</button>

			<p>{creds?.test}</p>
		</Box>
	);
};

export default AdminPageComponent;
