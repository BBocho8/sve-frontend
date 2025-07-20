import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
	type: 'error' | 'no-results';
	searchQuery?: string;
}

const EmptyState = ({ type, searchQuery }: EmptyStateProps) => {
	if (type === 'error') {
		return (
			<div className='text-center py-12'>
				<ExclamationTriangleIcon className='mx-auto h-12 w-12 text-red-400' />
				<h3 className='mt-2 text-sm font-medium text-gray-900'>Error loading games</h3>
				<p className='mt-1 text-sm text-gray-500'>
					Something went wrong while loading the games. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className='text-center py-12'>
			<MagnifyingGlassIcon className='mx-auto h-12 w-12 text-gray-400' />
			<h3 className='mt-2 text-sm font-medium text-gray-900'>No games found</h3>
			<p className='mt-1 text-sm text-gray-500'>
				{searchQuery
					? `No games found for "${searchQuery}". Try adjusting your search terms.`
					: 'No games match your current filters. Try adjusting your selection.'}
			</p>
		</div>
	);
};

export default EmptyState;
