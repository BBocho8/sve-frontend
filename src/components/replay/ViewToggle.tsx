import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

type ViewToggleProps = {
	viewMode: 'grid' | 'list';
	onViewModeChange: (mode: 'grid' | 'list') => void;
};

const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
	return (
		<div className='flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
			<button
				onClick={() => onViewModeChange('grid')}
				className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
					viewMode === 'grid'
						? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
						: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
				}`}
				aria-label='Grid view'
				type='button'
			>
				<Squares2X2Icon className='w-4 h-4' />
				<span className='hidden sm:inline'>Grid</span>
			</button>
			<button
				onClick={() => onViewModeChange('list')}
				className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
					viewMode === 'list'
						? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
						: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
				}`}
				aria-label='List view'
				type='button'
			>
				<ListBulletIcon className='w-4 h-4' />
				<span className='hidden sm:inline'>List</span>
			</button>
		</div>
	);
};

export default ViewToggle;
