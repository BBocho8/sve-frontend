import ytdl from '@distube/ytdl-core';
import fs from 'fs-extra';
import path from 'node:path';

export const config = {
	runtime: 'nodejs', // Ensure Netlify runs this in Node.js mode
};

import type { HandlerEvent } from '@netlify/functions';

export async function handler(event: HandlerEvent) {
	try {
		const videoLink = new URL(event.rawUrl).searchParams.get('videoLink');
		if (!videoLink) {
			return {
				statusCode: 400,
				body: 'Missing videoLink parameter',
			};
		}

		console.log('Downloading video:', videoLink);

		// Fetch video information
		const info = await ytdl.getInfo(videoLink);
		const format = selectBestVideoFormat(info);
		const fileName = generateFileName(info, format);
		const tempFilePath = path.join('/tmp', fileName);

		// Stream and save the video
		const videoStream = ytdl(videoLink, { format });
		const fileStream = fs.createWriteStream(tempFilePath);
		videoStream.pipe(fileStream);

		// Wait for the download to complete
		await new Promise((resolve, reject) => {
			fileStream.on('finish', resolve);
			fileStream.on('error', reject);
		});

		console.log('Download complete:', fileName);

		// Read and return the file
		const fileBuffer = await fs.readFile(tempFilePath);

		return {
			statusCode: 200,
			headers: {
				'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
				'Content-Type': 'video/mp4',
			},
			body: fileBuffer.toString('base64'), // Send as Base64
			isBase64Encoded: true, // Ensure Netlify sends it as binary
		};
	} catch (error) {
		console.error('Error processing request:', error);
		return {
			statusCode: 500,
			body: 'Failed to process video download request',
		};
	}
}

// Helper functions
function selectBestVideoFormat(info: ytdl.videoInfo) {
	const videoFormats = ytdl.filterFormats(info.formats, 'video');
	return ytdl.chooseFormat(videoFormats, { quality: 'highestvideo' });
}

function generateFileName(info: ytdl.videoInfo, format: ytdl.videoFormat) {
	return `${sanitizeFileName(info.videoDetails.title)}.${format.container}`;
}

function sanitizeFileName(fileName: string) {
	// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
	return fileName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim();
}
