import LatestGames from '@/components/home/LatestGames';
import StatsSection from '@/components/home/StatsSection';
import { ArrowRightIcon, CalendarIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Home() {
	return (
		<div className='min-h-screen bg-bg-primary'>
			{/* Unified Hero & Stats Section */}
			<section className='relative bg-gradient-to-br from-interactive-primary to-interactive-secondary text-text-inverse'>
				<div className='absolute inset-0 bg-black bg-opacity-10' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Hero Content */}
					<div className='text-center py-16'>
						<h1 className='text-3xl md:text-5xl font-bold mb-4'>SVE Match Replays</h1>
						<p className='text-lg md:text-xl mb-8 text-text-inverse/90 max-w-2xl mx-auto'>
							Watch game replays, analyze performance, and improve your game with our team&apos;s match archive.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 bg-surface-primary text-interactive-primary px-6 py-3 rounded-lg font-semibold hover:bg-surface-secondary transition-colors'
							>
								<PlayIcon className='w-5 h-5' />
								Watch Games
							</Link>
							<Link
								href='/replay'
								className='inline-flex items-center gap-2 border-2 border-surface-primary text-surface-primary px-6 py-3 rounded-lg font-semibold hover:bg-surface-primary hover:text-interactive-primary transition-colors'
							>
								<CalendarIcon className='w-5 h-5' />
								View All Matches
							</Link>
						</div>
					</div>

					{/* Stats Section */}
					<StatsSection />
				</div>
			</section>

			{/* Latest Games Section */}
			<section className='py-12 bg-surface-primary'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between mb-8'>
						<div>
							<h2 className='text-2xl font-bold text-text-primary mb-2'>Recent Games</h2>
							<p className='text-text-secondary'>Latest matches and highlights</p>
						</div>
						<Link
							href='/replay'
							className='inline-flex items-center gap-2 text-interactive-primary hover:text-interactive-primary/80 font-semibold'
						>
							View All
							<ArrowRightIcon className='w-4 h-4' />
						</Link>
					</div>

					<LatestGames />
				</div>
			</section>

			{/* Quick Actions */}
			<section className='py-12 bg-surface-primary'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-2xl font-bold text-text-primary mb-8 text-center'>Quick Actions</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Link
							href='/replay'
							className='bg-surface-primary p-6 rounded-lg shadow-sm border border-border-primary hover:shadow-md transition-shadow text-center group'
						>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-interactive-primary/10 rounded-lg mb-4 group-hover:bg-interactive-primary/20 transition-colors'>
								<PlayIcon className='w-6 h-6 text-interactive-primary' />
							</div>
							<h3 className='text-lg font-semibold text-text-primary mb-2'>Watch Replays</h3>
							<p className='text-text-secondary text-sm'>Access all game replays with video analysis</p>
						</Link>

						<Link
							href='/replay'
							className='bg-surface-primary p-6 rounded-lg shadow-sm border border-border-primary hover:shadow-md transition-shadow text-center group'
						>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-interactive-secondary/10 rounded-lg mb-4 group-hover:bg-interactive-secondary/20 transition-colors'>
								<CalendarIcon className='w-6 h-6 text-interactive-secondary' />
							</div>
							<h3 className='text-lg font-semibold text-text-primary mb-2'>Match Archive</h3>
							<p className='text-text-secondary text-sm'>Browse through all past games and seasons</p>
						</Link>

						<div className='bg-surface-primary p-6 rounded-lg shadow-sm border border-border-primary text-center'>
							<div className='inline-flex items-center justify-center w-12 h-12 bg-surface-tertiary rounded-lg mb-4'>
								<svg className='w-6 h-6 text-text-tertiary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<title>Performance Data Icon</title>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
									/>
								</svg>
							</div>
							<h3 className='text-lg font-semibold text-text-primary mb-2'>Performance Data</h3>
							<p className='text-text-secondary text-sm mb-3'>View match statistics and player performance</p>
							<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-interactive-warning/10 text-interactive-warning'>
								Coming Soon
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
