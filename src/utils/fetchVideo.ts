import type { VideoApiResponse } from '@/types/Video';

export async function fetchVideos(backendUrl: string) {
	const response = await fetch(`${backendUrl}/videos`);
	if (!response.ok) throw new Error('Failed to fetch videos games');
	const data: VideoApiResponse = await response.json();

	return data.videoGames;
}
