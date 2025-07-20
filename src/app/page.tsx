import LatestGames from '@/components/home/LatestGames';
import StatsSection from '@/components/home/StatsSection';
import { ArrowRightIcon, CalendarIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Home() {
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Hero Section */}
			<section className='relative bg-gradient-to-br from-green-600 to-green-800 dark:from-blue-600 dark:to-blue-800 text-white'>
				<div className='absolute inset-0 bg-black bg-opacity-10' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<h1 className='text-3xl md:text-5xl font-bold mb-4'>SVE Match Replays</h1>
						<p className='text-lg md:text-xl mb-8 text-green-100 dark:text-blue-100 max-w-2xl mx-auto'>
							Watch game replays, analyze performance, and improve your game with our team&apos;s match archive.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 bg-white text-green-700 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors'
							>
								<PlayIcon className='w-5 h-5' />
								Watch Games
							</Link>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 dark:hover:text-blue-700 transition-colors'
							>
								<CalendarIcon className='w-5 h-5' />
								View All Matches
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Quick Stats */}
			<StatsSection />

			{/* Latest Games Section */}
			<section className='py-12 bg-white dark:bg-gray-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Recent Games</h2>
							<p className='text-gray-600 dark:text-gray-400'>Latest matches and highlights</p>
						</div>
						<Link
							href='/replay'
							className='inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold'
						>
							View All
							<ArrowRightIcon className='w-4 h-4' />
						</Link>
					</div>

					<LatestGames />
				</div>
			</section>

			{/* Quick Actions */}
			<section className='py-12 bg-gray-50 dark:bg-gray-900'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center'>Quick Actions</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Link
							href='/replay'
							className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-center group'
						>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors'>
								<PlayIcon className='w-6 h-6 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>Watch Replays</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>Access all game replays with video analysis</p>
						</Link>

						<Link
							href='/replay'
							className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-center group'
						>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors'>
								<CalendarIcon className='w-6 h-6 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>Match Archive</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>Browse through all past games and seasons</p>
						</Link>

						<div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center'>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4'>
								<svg
									className='w-6 h-6 text-gray-600 dark:text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<title>Performance Data Icon</title>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>Performance Data</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>
								View match statistics and player performance
							</p>
							<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'>
								Coming Soon
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
