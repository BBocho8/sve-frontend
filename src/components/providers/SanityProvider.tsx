'use client';

import { useProjectSetup } from '@/stores/sanity-store';
import { useEffect } from 'react';

interface SanityProviderProps {
	children: React.ReactNode;
	projectId: string;
	dataset: string;
	token: string;
	supabaseUrl: string;
	supabaseServiceRoleKey: string;
}

const SanityProvider = ({
	children,
	projectId,
	dataset,
	token,
	supabaseUrl,
	supabaseServiceRoleKey,
}: SanityProviderProps) => {
	const { creds, setProjectSetup } = useProjectSetup();

	useEffect(() => {
		// Only initialize if credentials are not already set
		if (!creds) {
			setProjectSetup({
				projectId,
				dataset,
				token,
				supabaseUrl,
				supabaseServiceRoleKey,
			});
		}
	}, [creds, setProjectSetup, projectId, dataset, token, supabaseUrl, supabaseServiceRoleKey]);

	return <>{children}</>;
};

export default SanityProvider;
