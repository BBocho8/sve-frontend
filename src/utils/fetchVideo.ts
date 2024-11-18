import type { VideoApiResponse } from '@/types/Video';

export async function fetchVideos(domainUrl?: string) {
	const response = await fetch(`${process.env.DOMAIN_URL || domainUrl}/api/videos`, { cache: 'no-cache' });
	if (!response.ok) throw new Error('Failed to fetch videos games');
	const data: VideoApiResponse = await response.json();

	return data.data;
}
