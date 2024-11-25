// import ytdl from '@distube/ytdl-core';
// import { NextResponse } from 'next/server';
// import { createWriteStream, promises as fs } from 'node:fs';
// import { pipeline } from 'node:stream';
// import { promisify } from 'node:util';
// // }
// const streamPipeline = promisify(pipeline);

// export async function GET() {
// 	// const videoUrl = 'https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3';
// 	// const videoStream = ytdl(videoUrl);

// 	// const tempFilePath = '/tmp/video.mp4';
// 	// const writeStream = createWriteStream(tempFilePath);

// 	// await streamPipeline(videoStream, writeStream);

// 	// const fileBuffer = await fs.readFile(tempFilePath);
// 	// const blob = new Blob([fileBuffer]);

// 	return new NextResponse(blob, {
// 		headers: {
// 			'Content-Type': 'video/mp4',
// 		},
// 	});
// }

export async function GET() {
	return new Response(JSON.stringify({ success: true }), { status: 200 });
}
