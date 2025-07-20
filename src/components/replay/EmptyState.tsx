import { ArrowLeftIcon, ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EmptyStateProps {
	type: 'error' | 'no-results';
	searchQuery?: string;
}

const EmptyState = ({ type, searchQuery }: EmptyStateProps) => {
	if (type === 'error') {
		return (
			<div className='text-center py-16'>
				<ExclamationTriangleIcon className='mx-auto h-16 w-16 text-red-400 dark:text-red-500 mb-4' />
				<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>Unable to load games</h3>
				<p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto'>
					We&apos;re having trouble loading the games right now. This might be a temporary issue.
				</p>
				<button
					onClick={() => window.location.reload()}
					className='inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'
					type='button'
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className='text-center py-16'>
			<MagnifyingGlassIcon className='mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4' />
			<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>No games found</h3>
			<p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto'>
				{searchQuery
					? `We couldn&apos;t find any games matching &quot;${searchQuery}&quot;. Try different search terms or check your spelling.`
					: 'No games match your current filters. Try adjusting your search or filter options.'}
			</p>
			<div className='flex flex-col sm:flex-row gap-3 justify-center'>
				<button
					onClick={() => window.location.reload()}
					className='inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
					type='button'
				>
					<ArrowLeftIcon className='w-4 h-4' />
					Clear Filters
				</button>
				<Link
					href='/'
					className='inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'
				>
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default EmptyState;
