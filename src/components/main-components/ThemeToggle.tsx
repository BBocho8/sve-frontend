'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
			type='button'
		>
			{theme === 'light' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
		</button>
	);
};

export default ThemeToggle;
