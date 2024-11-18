import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Box, Button, Typography } from '@mui/material';

const AdminPage = async () => {
	const { isAuthenticated } = getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();

	return (
		// <ThemeProvider theme={theme}>
		isUserAuthenticated ? (
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
			</Box>
		) : (
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
					You need to sign in to access this page.
				</Typography>
				<LoginLink>
					<Button type='button' variant='contained' color='success' sx={{ my: 2 }}>
						Sign in
					</Button>
				</LoginLink>
			</Box>
		)
		// </ThemeProvider>
	);
};

export default AdminPage;
