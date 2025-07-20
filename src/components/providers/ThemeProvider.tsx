'use client';

import { type ThemeMode, generateCSSVariables } from '@/config/colors';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

interface ThemeProviderProps {
	children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>('light');
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Check for saved theme preference or default to light
		const savedTheme = localStorage.getItem('theme') as Theme;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		let initialTheme: Theme = 'light';
		if (savedTheme) {
			initialTheme = savedTheme;
		} else if (prefersDark) {
			initialTheme = 'dark';
		}

		setTheme(initialTheme);
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (!isInitialized) return;

		// Update document class and save to localStorage
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);

		// Apply CSS custom properties for the color system
		const cssVariables = generateCSSVariables(theme as ThemeMode);
		const root = document.documentElement;

		// Apply all CSS variables
		for (const [property, value] of Object.entries(cssVariables)) {
			root.style.setProperty(property, value);
		}

		// Debug: Log the applied variables
		console.log(`Theme changed to: ${theme}`);
		console.log('Applied CSS variables:', cssVariables);
	}, [theme, isInitialized]);

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
