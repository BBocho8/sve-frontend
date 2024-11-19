import type { VideoV2 } from '@/types/Video';
import { createClient } from 'next-sanity';

export async function fetchVideosV2(projectId: string, dataset: string, apiVersion: string) {
	const client = createClient({
		projectId: projectId,
		dataset: dataset,
		apiVersion: apiVersion,
		useCdn: false,
	});

	const data: VideoV2[] = await client.fetch(`*[_type == "matchVideo"] | order(date desc)`);

	return data;
}
