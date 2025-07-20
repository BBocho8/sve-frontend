'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-lg text-text-primary hover:bg-state-hover transition-colors duration-200'
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
			type='button'
		>
			{theme === 'light' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
		</button>
	);
};

export default ThemeToggle;
