'use client';

import { useSession } from 'next-auth/react';
import AdminAuth from './AdminAuth';
import AdminNotAuth from './AdminNotAuth';

const AdminPageComponent = ({ adminUrl }: { adminUrl: string }) => {
	const { data: session } = useSession();

	return session && session.user?.email === adminUrl ? <AdminAuth /> : <AdminNotAuth />;
};

export default AdminPageComponent;
