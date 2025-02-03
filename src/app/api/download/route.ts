// import ytdl from '@distube/ytdl-core';
// import type { NextRequest } from 'next/server';

// export async function GET(request: NextRequest) {
// 	try {
// 		const videoLink = request.nextUrl.searchParams.get('videoLink');
// 		if (!videoLink) {
// 			return new Response('Missing videoLink parameter', { status: 400 });
// 		}

// 		// Fetch video information
// 		const info = await ytdl.getInfo(videoLink);
// 		const format = selectBestVideoFormat(info);
// 		const fileName = generateFileName(info, format);

// 		// Stream video content
// 		const videoStream = createVideoStream(videoLink, format);
// 		const readableStream = convertToReadableStream(videoStream);

// 		// Return response with proper headers
// 		return createStreamResponse(readableStream, fileName);
// 	} catch (error) {
// 		console.error('Error processing request:', error);
// 		return new Response('Failed to process video download request', {
// 			status: 500,
// 		});
// 	}
// }

// // Select the best video format
// function selectBestVideoFormat(info: ytdl.videoInfo) {
// 	const videoFormats = ytdl.filterFormats(info.formats, 'video');
// 	return ytdl.chooseFormat(videoFormats, { quality: 'highestvideo' });
// }

// // Generate a file name for the downloaded video
// function generateFileName(info: ytdl.videoInfo, format: ytdl.videoFormat) {
// 	return `${sanitizeFileName(info.videoDetails.title)}.${format.container}`;
// }

// // Sanitize file names to remove invalid characters
// function sanitizeFileName(fileName: string) {
// 	// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
// 	return fileName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '').trim();
// }

// // Create a video stream using ytdl
// function createVideoStream(videoLink: string, format: ytdl.videoFormat) {
// 	return ytdl(videoLink, { format });
// }

// // Convert Node.js Readable stream to a web-compatible ReadableStream
// function convertToReadableStream(videoStream: NodeJS.ReadableStream): ReadableStream {
// 	return new ReadableStream({
// 		start(controller) {
// 			videoStream.on('data', chunk => controller.enqueue(chunk));
// 			videoStream.on('end', () => controller.close());
// 			videoStream.on('error', err => controller.error(err));
// 		},
// 	});
// }

// // Create a readable stream response with proper headers
// function createStreamResponse(readableStream: ReadableStream, fileName: string) {
// 	return new Response(readableStream, {
// 		headers: {
// 			'Content-Disposition': `attachment; filename="${fileName}"`,
// 			'Content-Type': 'video/mp4',
// 		},
// 	});
// }

import ytdl from '@distube/ytdl-core';
import fs from 'fs-extra';
import type { NextRequest } from 'next/server';
import path from 'node:path';

export async function GET(request: NextRequest) {
	try {
		const videoLink = request.nextUrl.searchParams.get('videoLink');
		if (!videoLink) {
			return new Response('Missing videoLink parameter', { status: 400 });
		}

		const info = await ytdl.getInfo(videoLink);
		const format = selectBestVideoFormat(info);
		const fileName = generateFileName(info, format);
		const tempFilePath = path.join('/tmp', `${fileName}`); // Save to a temporary folder

		// Download and save video
		const videoStream = ytdl(videoLink, { format });
		const fileStream = fs.createWriteStream(tempFilePath);
		videoStream.pipe(fileStream);

		// Wait for the download to complete
		await new Promise((resolve, reject) => {
			fileStream.on('finish', resolve);
			fileStream.on('error', reject);
		});

		// Read the file and send it as a response
		const fileBuffer = await fs.readFile(tempFilePath);
		return new Response(fileBuffer, {
			headers: {
				'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
				'Content-Type': 'video/mp4',
			},
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response('Failed to process video download request', { status: 500 });
	}
}

// Helper Functions
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
