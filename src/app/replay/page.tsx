import Replay from '@/components/replay/Replay';

const ReplayPage = async () => {
	return <Replay domainUrl={process.env.DOMAIN_URL as string} />;
};

export default ReplayPage;
