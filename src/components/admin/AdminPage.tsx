'use client';

import { testPayload, testUpdatePayload } from '@/types/Video';
import { createVideo, deleteVideo, updateVideo } from '@/utils/fetchVideo';
import { Box, Button, Typography } from '@mui/material';

const AdminPageComponent = ({
	projectId,
	dataset,
	token,
}: {
	projectId: string;
	dataset: string;
	token: string;
}) => {
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
			<Button onClick={() => createVideo(projectId, dataset, token as string, testPayload).then(res => res)}>
				Test Add Entry
			</Button>

			<Button
				onClick={() =>
					updateVideo(projectId, dataset, token as string, testUpdatePayload, '5AevX4rXJx5kciLHgcBYCJ').then(res => res)
				}
			>
				Test Update Entry
			</Button>

			<Button
				onClick={() => deleteVideo(projectId, dataset, token as string, '5AevX4rXJx5kciLHgcBYCJ').then(res => res)}
			>
				Test Delete Entry
			</Button>
		</Box>
	);
};

export default AdminPageComponent;
