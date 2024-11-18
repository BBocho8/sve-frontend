import DetailedReplayComponent from '@/components/replay/DetailedReplayPageComponent';

const DetailedReplayPage = async () => {
	return <DetailedReplayComponent domainUrl={process.env.DOMAIN_URL as string} />;
};

export default DetailedReplayPage;
