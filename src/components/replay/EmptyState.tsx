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
				<ExclamationTriangleIcon className='mx-auto h-16 w-16 text-interactive-danger mb-4' />
				<h3 className='text-lg font-semibold text-text-primary mb-2'>Unable to load games</h3>
				<p className='text-text-secondary mb-6 max-w-md mx-auto'>
					We&apos;re having trouble loading the games right now. This might be a temporary issue.
				</p>
				<button
					onClick={() => window.location.reload()}
					className='inline-flex items-center gap-2 bg-interactive-primary text-text-inverse px-6 py-3 rounded-lg font-medium hover:bg-interactive-primary transition-colors'
					type='button'
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className='text-center py-16'>
			<MagnifyingGlassIcon className='mx-auto h-16 w-16 text-text-tertiary mb-4' />
			<h3 className='text-lg font-semibold text-text-primary mb-2'>No games found</h3>
			<p className='text-text-secondary mb-6 max-w-md mx-auto'>
				{searchQuery
					? `We couldn&apos;t find any games matching &quot;${searchQuery}&quot;. Try different search terms or check your spelling.`
					: 'No games match your current filters. Try adjusting your search or filter options.'}
			</p>
			<div className='flex flex-col sm:flex-row gap-3 justify-center'>
				<button
					onClick={() => window.location.reload()}
					className='inline-flex items-center gap-2 bg-surface-secondary text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-state-hover transition-colors'
					type='button'
				>
					<ArrowLeftIcon className='w-4 h-4' />
					Clear Filters
				</button>
				<Link
					href='/'
					className='inline-flex items-center gap-2 bg-interactive-primary text-text-inverse px-6 py-3 rounded-lg font-medium hover:bg-interactive-primary transition-colors'
				>
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default EmptyState;
