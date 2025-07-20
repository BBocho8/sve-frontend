import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
	return (
		<div className='relative group'>
			<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
				<MagnifyingGlassIcon className='h-5 w-5 text-text-tertiary group-focus-within:text-interactive-primary transition-colors' />
			</div>
			<input
				type='text'
				value={value}
				onChange={e => onChange(e.target.value)}
				className='block w-full pl-12 pr-12 py-3.5 border border-border-secondary rounded-xl leading-5 bg-surface-primary placeholder-text-tertiary focus:outline-none focus:placeholder-text-tertiary focus:ring-2 focus:ring-interactive-primary focus:border-interactive-primary text-sm shadow-sm transition-all duration-200 hover:border-border-secondary text-text-primary'
				placeholder={placeholder}
			/>
			{value && (
				<button
					onClick={() => onChange('')}
					className='absolute inset-y-0 right-0 pr-4 flex items-center text-text-tertiary hover:text-text-primary transition-colors'
					type='button'
				>
					<XMarkIcon className='h-5 w-5' />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
