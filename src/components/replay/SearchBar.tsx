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
				<MagnifyingGlassIcon className='h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors' />
			</div>
			<input
				type='text'
				value={value}
				onChange={e => onChange(e.target.value)}
				className='block w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-white'
				placeholder={placeholder}
			/>
			{value && (
				<button
					onClick={() => onChange('')}
					className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
					type='button'
				>
					<XMarkIcon className='h-5 w-5' />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
