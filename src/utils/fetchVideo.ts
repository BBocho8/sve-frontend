import type { CreateVideoPayload, UpdateVideoPayload, VideoV2 } from '@/types/Video';
import dayjs from 'dayjs';
import { createClient } from 'next-sanity';

export async function fetchVideosV2(projectId: string, dataset: string) {
	const client = createClient({
		projectId: projectId,
		dataset: dataset,
		apiVersion: dayjs().format('YYYY-MM-DD'),
		useCdn: false,
	});

	const data: VideoV2[] = await client.fetch(`*[_type == "matchVideo"] | order(date desc)`);

	return data;
}

export async function createVideo(projectId: string, dataset: string, token: string, payload: CreateVideoPayload) {
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
}

export async function updateVideo(
	projectId: string,
	dataset: string,
	token: string,
	payload: UpdateVideoPayload,
	id: string,
) {
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
}

export async function deleteVideo(projectId: string, dataset: string, token: string, id: string) {
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
}
