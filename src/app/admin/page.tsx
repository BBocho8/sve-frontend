import AdminPageComponent from '@/components/admin/AdminPage';

const AdminPage = () => {
	return (
		<AdminPageComponent
			projectId={process.env.SANITY_PROJECT_ID as string}
			dataset={process.env.SANITY_DATASET as string}
		/>
	);
};

export default AdminPage;
