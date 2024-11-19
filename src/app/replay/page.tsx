import Replay from '@/components/replay/Replay';

const ReplayPage = async () => {
	return (
		<Replay
			projectId={process.env.SANITY_PROJECT_ID as string}
			dataset={process.env.SANITY_DATASET as string}
			apiVersion={process.env.SANITY_API_VERSION as string}
		/>
	);
};

export default ReplayPage;
