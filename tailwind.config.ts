import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			boxShadow: {
				btn: '0 1px 3px rgba(0, 0, 0, 0.2)',
			},
			colors: {
				primaryGreen: '#15A34A',
				// Dark mode color overrides
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
					950: '#030712',
				},
			},
			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				nav: '1.5rem',
				linksNav: '1rem',
				h1: '2.5rem',
				h2: '2rem',
				h3: '1.5rem',
				h4: '0.875rem',
				h1BigScreen: '4rem',
				h2BigScreen: '2rem',
				h3BigScreen: '1rem',
				h4BigScreen: '1rem',
				body: '1rem',
				btn: '0.875rem',
			},
			lineHeight: {
				header: '1.25',
				headerBigScreen: '1',
			},
			height: {
				nav: 'calc(100vh - 72px)',
			},
			letterSpacing: {
				header: '0.10rem',
				btn: '0.25rem',
			},
			padding: {
				btnX: '0.75rem',
				btnY: '0.375rem',
			},
			screens: {
				nav: '800px',
			},
		},
	},
	plugins: [],
};
export default config;
