import LatestGames from '@/components/home/LatestGames';
import StatsSection from '@/components/home/StatsSection';
import {
	ArrowRightIcon,
	CalendarIcon,
	ChartBarIcon,
	ClockIcon,
	PlayIcon,
	UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Home() {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-green-600 to-green-800 text-white'>
				<div className='absolute inset-0 bg-black bg-opacity-20' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-6'>SVE Replay Hub</h1>
						<p className='text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto'>
							Relive every moment of our games with high-quality match replays, detailed statistics, and comprehensive
							game analysis.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
							>
								<PlayIcon className='w-5 h-5' />
								Watch Replays
								<ArrowRightIcon className='w-4 h-4' />
							</Link>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors'
							>
								<CalendarIcon className='w-5 h-5' />
								View Schedule
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<StatsSection />

			{/* Features Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>Why Choose SVE Replay Hub?</h2>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
							Experience football like never before with our comprehensive replay platform
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<PlayIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>High-Quality Replays</h3>
							<p className='text-gray-600'>
								Crystal clear video quality with multiple camera angles and professional commentary.
							</p>
						</div>

						{/* Feature 2 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<ClockIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>Instant Access</h3>
							<p className='text-gray-600'>Watch replays immediately after games with our fast-loading platform.</p>
						</div>

						{/* Feature 3 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<UsersIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>Team Analysis</h3>
							<p className='text-gray-600'>Detailed statistics and performance analysis for every player and team.</p>
						</div>

						{/* Feature 4 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<ChartBarIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>Match Statistics</h3>
							<p className='text-gray-600'>Comprehensive match data including possession, shots, and key moments.</p>
						</div>

						{/* Feature 5 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<CalendarIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>Complete Archive</h3>
							<p className='text-gray-600'>Access to all past games and seasons in our comprehensive archive.</p>
						</div>

						{/* Feature 6 */}
						<div className='text-center p-6'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
								<PlayIcon className='w-8 h-8 text-green-600' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>Mobile Friendly</h3>
							<p className='text-gray-600'>Watch replays on any device with our responsive design.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Latest Games Section */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-4'>Latest Games</h2>
						<p className='text-lg text-gray-600'>Check out our most recent matches and highlights</p>
					</div>

					<LatestGames />

					<div className='text-center'>
						<Link
							href='/replay'
							className='inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors'
						>
							View All Games
							<ArrowRightIcon className='w-4 h-4' />
						</Link>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 bg-green-600 text-white'>
				<div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold mb-4'>Ready to Experience Football Like Never Before?</h2>
					<p className='text-xl mb-8 text-green-100'>
						Join thousands of fans who are already enjoying our comprehensive replay platform.
					</p>
					<Link
						href='/replay'
						className='inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
					>
						Start Watching Now
						<ArrowRightIcon className='w-4 h-4' />
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div>
							<h3 className='text-lg font-semibold mb-4'>SVE Replay Hub</h3>
							<p className='text-gray-400'>The ultimate destination for football replays and analysis.</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<Link href='/replay' className='hover:text-white transition-colors'>
										All Games
									</Link>
								</li>
								<li>
									<Link href='/replay' className='hover:text-white transition-colors'>
										Latest Matches
									</Link>
								</li>
								<li>
									<Link href='/replay' className='hover:text-white transition-colors'>
										Season Archive
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className='text-lg font-semibold mb-4'>Contact</h3>
							<p className='text-gray-400'>
								Questions or feedback?
								<br />
								Get in touch with our team.
							</p>
						</div>
					</div>
					<div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
						<p>&copy; 2024 SVE Replay Hub. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
