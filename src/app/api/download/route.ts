import type { NextRequest } from 'next/server';
// import { exec } from 'youtube-dl-exec';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get('url');

	if (!url) {
		return new Response(JSON.stringify({ error: 'Invalid YouTube URL' }), { status: 400 });
	}

	try {
		// const videoBuffer = await new Promise<Buffer>((resolve, reject) => {
		// 	exec(
		// 		url,
		// 		{
		// 			format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
		// 			output: '-', // Output to stdout for streaming
		// 		},
		// 		{ stdio: ['ignore', 'pipe', 'pipe'] }, // Capture stdout as a stream
		// 	)
		// 		.stdout?.on('data', data => resolve(data))
		// 		.on('error', reject);
		// });

		// return new Response(videoBuffer, {
		// 	headers: {
		// 		'Content-Disposition': 'attachment; filename="video.mp4"',
		// 		'Content-Type': 'video/mp4',
		// 	},
		// });
		return 'hello';
	} catch (error) {
		console.error('Error during video download:', error);
		return new Response(JSON.stringify({ error: 'Failed to download video.' }), { status: 500 });
	}
}
