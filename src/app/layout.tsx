import NavbarV2 from '@/components/main-components/NavbarV2';
import getAllGames from '@/utils/contentful/createClient';
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
	const games = await getAllGames();

	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* <Navbar /> */}
				<NavbarV2 data={games} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
