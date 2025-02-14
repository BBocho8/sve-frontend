'use client';

import { schemaTypes } from '@/types/sanity';
import { Box } from '@mui/material';
import { visionTool } from '@sanity/vision';
import { useSession } from 'next-auth/react';
import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import AdminNotAuth from './AdminNotAuth';

const AdminPageComponent = ({
	adminUrl,
	projectId,
	dataset,
}: { adminUrl: string; projectId: string; dataset: string }) => {
	const { data: session } = useSession();

	const sanityConfig = defineConfig({
		name: 'default',
		title: 'sve-db',

		projectId,
		dataset,
		basePath: '/admin',
		plugins: [structureTool(), visionTool()],
		schema: {
			types: schemaTypes,
		},
	});

	return session && session.user?.email === adminUrl ? (
		<Box
			sx={{
				height: '100vh',
				maxHeight: '100dvh',
				overscrollBehavior: 'none',
				overflow: 'auto',
				WebkitFontSmoothing: 'antialiased',
			}}
		>
			<Studio config={sanityConfig} />
		</Box>
	) : (
		<AdminNotAuth />
	);
};

export default AdminPageComponent;
