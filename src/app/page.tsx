import Replay from '@/components/replay/Replay';

export default async function Home() {
	return <Replay domainUrl={process.env.DOMAIN_URL as string} />;
}
