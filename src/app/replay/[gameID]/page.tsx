import DetailedReplayComponent from '@/components/replay/DetailedReplayPageComponent';

const DetailedReplayPage = async () => {
	return (
		<DetailedReplayComponent
			projectId={process.env.SANITY_PROJECT_ID as string}
			dataset={process.env.SANITY_DATASET as string}
		/>
	);
};

export default DetailedReplayPage;
