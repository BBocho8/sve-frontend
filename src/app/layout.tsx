import NavbarV2Optimized from '@/components/main-components/NavbarV2Optimized';
import SanityProvider from '@/components/providers/SanityProvider';
import SessionProvider from '@/components/providers/SessionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Get credentials from environment variables
	const projectId = process.env.SANITY_PROJECT_ID as string;
	const dataset = process.env.SANITY_DATASET as string;
	const token = process.env.SANITY_API_TOKEN as string;
	const supabaseUrl = process.env.SUPABASE_URL as string;
	const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					<SessionProvider>
						<SWRProvider>
							<SanityProvider
								projectId={projectId}
								dataset={dataset}
								token={token}
								supabaseUrl={supabaseUrl}
								supabaseServiceRoleKey={supabaseServiceRoleKey}
							>
								<main>
									<NavbarV2Optimized />
									{children}
									<Footer />
								</main>
							</SanityProvider>
						</SWRProvider>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
