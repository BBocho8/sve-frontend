import AdminPageComponent from '@/components/admin/AdminPage';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Box, Button, Typography } from '@mui/material';

const AdminPage = async () => {
	const { isAuthenticated } = getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();

	return isUserAuthenticated ? (
		<AdminPageComponent
			projectId={process.env.SANITY_PROJECT_ID as string}
			dataset={process.env.SANITY_DATASET as string}
			token={process.env.SANITY_API_TOKEN as string}
		/>
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
	);
};

export default AdminPage;
