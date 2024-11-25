import ytdl from '@distube/ytdl-core';
import { NextResponse } from 'next/server';
import { createWriteStream, promises as fs } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

// export async function GET() {
// 	// const data = await ytdl.getBasicInfo('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3');

// 	// const info = await ytdl.getInfo('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3');
// 	// const dl = ytdl('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3').pipe(createWriteStream('video.mp4'));

// 	// const test = await ytdl.getInfo('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3');

// 	// const video = ytdl('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3');

// 	// video.on('progress', info => {
// 	// 	console.log('Download progress');
// 	// });
// 	// video.on('end', info => {
// 	// 	console.log('Download finish');

// 	// });

// 	// video.pipe(createWriteStream('video.mp4'));

// 	// video.pipe()
// 	return ytdl('https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3');

// 	// return Response.json({ video: 'test' });
// }
const streamPipeline = promisify(pipeline);

export async function GET() {
	const videoUrl = 'https://youtu.be/F6sThOJiUNY?si=mGrpZtSJpdfJVAz3';
	const videoStream = ytdl(videoUrl);

	const tempFilePath = '/tmp/video.mp4';
	const writeStream = createWriteStream(tempFilePath);

	await streamPipeline(videoStream, writeStream);

	const fileBuffer = await fs.readFile(tempFilePath);
	const blob = new Blob([fileBuffer]);

	return new NextResponse(blob, {
		headers: {
			'Content-Type': 'video/mp4',
		},
	});
}
