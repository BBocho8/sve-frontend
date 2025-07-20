'use client';

import { schemaTypes } from '@/types/sanity';
import { Box } from '@mui/material';
import { visionTool } from '@sanity/vision';
import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const AdminPageComponent = ({ projectId, dataset }: { projectId: string; dataset: string }) => {
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

	// If we reach here, middleware has already verified authentication and admin email
	// Just show the Studio
	return (
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
	);
};

export default AdminPageComponent;
