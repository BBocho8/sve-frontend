import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

type ViewToggleProps = {
	viewMode: 'grid' | 'list';
	onViewModeChange: (mode: 'grid' | 'list') => void;
};

const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
	return (
		<div className='flex items-center gap-1 bg-surface-secondary rounded-lg p-1'>
			<button
				onClick={() => onViewModeChange('grid')}
				className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
					viewMode === 'grid'
						? 'bg-surface-primary text-text-primary shadow-sm'
						: 'text-text-secondary hover:text-text-primary'
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
						? 'bg-surface-primary text-text-primary shadow-sm'
						: 'text-text-secondary hover:text-text-primary'
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
