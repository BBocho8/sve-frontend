import Replay from '@/components/replay/Replay';

export default async function Home() {
	// const client = createClient({
	// 	projectId: 'qvhyufsv',
	// 	dataset: 'production',
	// 	apiVersion: '2024-11-19',
	// 	useCdn: false,
	// });

	// const games = await client.fetch(`*[_type == "matchVideo"]`);

	// console.log(games);

	return (
		<Replay
			projectId={process.env.SANITY_PROJECT_ID as string}
			dataset={process.env.SANITY_DATASET as string}
			apiVersion={process.env.SANITY_API_VERSION as string}
		/>
	);
}
