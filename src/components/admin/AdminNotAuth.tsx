'use client';

import { Box, Button, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

const AdminNotAuth = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 4,
				minHeight: '100vh',
				backgroundColor: 'var(--mui-palette-background-default)',
				color: 'var(--mui-palette-text-primary)',
			}}
		>
			<Typography
				sx={{
					fontSize: 28,
					fontWeight: 'bold',
					color: 'var(--mui-palette-text-primary)',
				}}
			>
				Admin Page
			</Typography>
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 300,
					color: 'var(--mui-palette-text-secondary)',
				}}
			>
				You need to sign in to access this page.
			</Typography>

			<Button onClick={() => signIn()} type='button' variant='contained' color='success' sx={{ my: 2 }}>
				Sign in
			</Button>
		</Box>
	);
};

export default AdminNotAuth;
