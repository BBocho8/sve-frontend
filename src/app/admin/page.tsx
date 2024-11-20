import AdminPageComponent from '@/components/admin/AdminPage';

const AdminPage = () => {
	return <AdminPageComponent adminUrl={process.env.ADMIN_EMAIL as string} />;
};

export default AdminPage;
