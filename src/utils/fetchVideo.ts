import type { CreateVideoPayload, UpdateVideoPayload, VideoV2 } from '@/types/Video';
import dayjs from 'dayjs';
import { createClient } from 'next-sanity';

export async function fetchVideosV2(projectId: string, dataset: string) {
	// Validate credentials before making the request
	if (!projectId || !dataset) {
		throw new Error('Missing Sanity credentials: projectId and dataset are required');
	}

	try {
		const client = createClient({
			projectId: projectId,
			dataset: dataset,
			apiVersion: dayjs().format('YYYY-MM-DD'),
			useCdn: false,
		});

		const data: VideoV2[] = await client.fetch(`*[_type == "matchVideo"] | order(date desc)`);

		// Validate the response
		if (!Array.isArray(data)) {
			throw new Error('Invalid response format from Sanity API');
		}

		return data;
	} catch (error) {
		console.error('Error fetching videos from Sanity:', error);
		throw new Error(`Failed to fetch videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

export async function createVideo(projectId: string, dataset: string, token: string, payload: CreateVideoPayload) {
	if (!projectId || !dataset || !token) {
		throw new Error('Missing Sanity credentials: projectId, dataset, and token are required');
	}

	try {
		const client = createClient({
			projectId: projectId,
			dataset: dataset,
			apiVersion: dayjs().format('YYYY-MM-DD'),
			useCdn: false,
			token,
			ignoreBrowserTokenWarning: true,
		});

		const req = await client.create(payload);

		if (!req) throw new Error('Failed to create video');

		return { success: true, data: req };
	} catch (error) {
		console.error('Error creating video:', error);
		throw new Error(`Failed to create video: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

export async function updateVideo(
	projectId: string,
	dataset: string,
	token: string,
	payload: UpdateVideoPayload,
	id: string,
) {
	if (!projectId || !dataset || !token || !id) {
		throw new Error('Missing required parameters: projectId, dataset, token, and id are required');
	}

	try {
		const client = createClient({
			projectId: projectId,
			dataset: dataset,
			apiVersion: dayjs().format('YYYY-MM-DD'),
			useCdn: false,
			token,
			ignoreBrowserTokenWarning: true,
		});

		const req = await client.patch(id).set(payload).commit();

		if (!req) throw new Error('Failed to update video');

		return { success: true, data: req };
	} catch (error) {
		console.error('Error updating video:', error);
		throw new Error(`Failed to update video: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

export async function deleteVideo(projectId: string, dataset: string, token: string, id: string) {
	if (!projectId || !dataset || !token || !id) {
		throw new Error('Missing required parameters: projectId, dataset, token, and id are required');
	}

	try {
		const client = createClient({
			projectId: projectId,
			dataset: dataset,
			apiVersion: dayjs().format('YYYY-MM-DD'),
			useCdn: false,
			token,
			ignoreBrowserTokenWarning: true,
		});

		const req = await client.delete(id);

		if (!req) throw new Error('Failed to delete video');

		return { success: true, data: req };
	} catch (error) {
		console.error('Error deleting video:', error);
		throw new Error(`Failed to delete video: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}
