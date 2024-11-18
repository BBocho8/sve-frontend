import NavbarV2 from '@/components/main-components/NavbarV2';
import { SWRProvider } from '@/utils/swr/swr-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Footer from '../components/main-components/Footer';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'SVE Mendig - Match Replay',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* <Navbar /> */}
				<SWRProvider>
					<NavbarV2 domainUrl={process.env.DOMAIN_URL as string} />
					{children}
					<Footer />
				</SWRProvider>
			</body>
		</html>
	);
}
