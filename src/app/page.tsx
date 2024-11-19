import Replay from '@/components/replay/Replay';

export default async function Home() {
	return <Replay projectId={process.env.SANITY_PROJECT_ID as string} dataset={process.env.SANITY_DATASET as string} />;
}
