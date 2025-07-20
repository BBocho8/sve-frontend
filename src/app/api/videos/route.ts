import { fetchVideosV2 } from '@/utils/fetchVideo';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const projectId = process.env.SANITY_PROJECT_ID as string;
		const dataset = process.env.SANITY_DATASET as string;

		if (!projectId || !dataset) {
			console.error('Missing Sanity configuration:', { projectId: !!projectId, dataset: !!dataset });
			return NextResponse.json({ error: 'Missing Sanity configuration' }, { status: 500 });
		}

		const videos = await fetchVideosV2(projectId, dataset);

		// Set cache headers for 5 minutes
		const response = NextResponse.json(videos);
		response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

		return response;
	} catch (error) {
		console.error('Error fetching videos:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch videos', details: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 },
		);
	}
}
