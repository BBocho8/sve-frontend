// Color palette configuration for the SVE Replay application
// This file defines semantic color tokens that can be easily customized

export const colorPalette = {
	// Brand Colors
	brand: {
		primary: {
			light: '#3B82F6', // Blue instead of green
			dark: '#60A5FA',
		},
		secondary: {
			light: '#15A34A', // Green as secondary
			dark: '#22C55E',
		},
		accent: {
			light: '#F59E0B',
			dark: '#FBBF24',
		},
	},

	// Background Colors
	background: {
		primary: {
			light: '#FFFFFF',
			dark: '#0F172A', // Slate 900 - much better than gray-900
		},
		secondary: {
			light: '#F8FAFC', // Slate 50
			dark: '#1E293B', // Slate 800
		},
		tertiary: {
			light: '#F1F5F9', // Slate 100
			dark: '#334155', // Slate 700
		},
		elevated: {
			light: '#FFFFFF',
			dark: '#1E293B', // Slate 800
		},
	},

	// Surface Colors (for cards, modals, etc.)
	surface: {
		primary: {
			light: '#FFFFFF',
			dark: '#1E293B', // Slate 800
		},
		secondary: {
			light: '#F8FAFC', // Slate 50
			dark: '#334155', // Slate 700
		},
		tertiary: {
			light: '#F1F5F9', // Slate 100
			dark: '#475569', // Slate 600
		},
	},

	// Border Colors
	border: {
		primary: {
			light: '#E2E8F0', // Slate 200
			dark: '#475569', // Slate 600
		},
		secondary: {
			light: '#CBD5E1', // Slate 300
			dark: '#64748B', // Slate 500
		},
		accent: {
			light: '#3B82F6', // Brand blue
			dark: '#60A5FA',
		},
	},

	// Text Colors
	text: {
		primary: {
			light: '#0F172A', // Slate 900
			dark: '#F8FAFC', // Slate 50
		},
		secondary: {
			light: '#475569', // Slate 600
			dark: '#CBD5E1', // Slate 300
		},
		tertiary: {
			light: '#64748B', // Slate 500
			dark: '#94A3B8', // Slate 400
		},
		inverse: {
			light: '#FFFFFF',
			dark: '#0F172A', // Slate 900
		},
		accent: {
			light: '#3B82F6', // Brand blue
			dark: '#60A5FA',
		},
	},

	// Interactive Colors
	interactive: {
		primary: {
			light: '#3B82F6', // Blue instead of green
			dark: '#60A5FA',
		},
		secondary: {
			light: '#15A34A', // Green as secondary
			dark: '#22C55E',
		},
		danger: {
			light: '#EF4444',
			dark: '#F87171',
		},
		warning: {
			light: '#F59E0B',
			dark: '#FBBF24',
		},
		success: {
			light: '#10B981',
			dark: '#34D399',
		},
	},

	// State Colors
	state: {
		hover: {
			light: '#F1F5F9', // Slate 100
			dark: '#334155', // Slate 700
		},
		active: {
			light: '#E2E8F0', // Slate 200
			dark: '#475569', // Slate 600
		},
		disabled: {
			light: '#F1F5F9', // Slate 100
			dark: '#475569', // Slate 600
		},
		focus: {
			light: '#3B82F6',
			dark: '#60A5FA',
		},
	},

	// Overlay Colors
	overlay: {
		backdrop: {
			light: 'rgba(0, 0, 0, 0.5)',
			dark: 'rgba(0, 0, 0, 0.7)',
		},
		modal: {
			light: 'rgba(0, 0, 0, 0.1)',
			dark: 'rgba(0, 0, 0, 0.3)',
		},
	},

	// Shadow Colors
	shadow: {
		light: 'rgba(0, 0, 0, 0.1)',
		dark: 'rgba(0, 0, 0, 0.3)',
	},
} as const;

// Semantic color tokens for easy use in components
export const semanticColors = {
	// Background tokens
	'bg-primary': 'var(--color-bg-primary)',
	'bg-secondary': 'var(--color-bg-secondary)',
	'bg-tertiary': 'var(--color-bg-tertiary)',
	'bg-elevated': 'var(--color-bg-elevated)',

	// Surface tokens
	'surface-primary': 'var(--color-surface-primary)',
	'surface-secondary': 'var(--color-surface-secondary)',
	'surface-tertiary': 'var(--color-surface-tertiary)',

	// Text tokens
	'text-primary': 'var(--color-text-primary)',
	'text-secondary': 'var(--color-text-secondary)',
	'text-tertiary': 'var(--color-text-tertiary)',
	'text-inverse': 'var(--color-text-inverse)',
	'text-accent': 'var(--color-text-accent)',

	// Border tokens
	'border-primary': 'var(--color-border-primary)',
	'border-secondary': 'var(--color-border-secondary)',
	'border-accent': 'var(--color-border-accent)',

	// Interactive tokens
	'interactive-primary': 'var(--color-interactive-primary)',
	'interactive-secondary': 'var(--color-interactive-secondary)',
	'interactive-danger': 'var(--color-interactive-danger)',
	'interactive-warning': 'var(--color-interactive-warning)',
	'interactive-success': 'var(--color-interactive-success)',

	// State tokens
	'state-hover': 'var(--color-state-hover)',
	'state-active': 'var(--color-state-active)',
	'state-disabled': 'var(--color-state-disabled)',
	'state-focus': 'var(--color-state-focus)',
} as const;

// Type for theme modes
export type ThemeMode = 'light' | 'dark';

// Function to get color value based on theme
export function getColorValue(colorPath: string, theme: ThemeMode): string {
	const path = colorPath.split('.');
	let current: any = colorPalette;

	for (const key of path) {
		current = current[key];
	}

	return current[theme] as string;
}

// Function to generate CSS custom properties
export function generateCSSVariables(theme: ThemeMode): Record<string, string> {
	const variables: Record<string, string> = {};

	// Generate variables for all color paths
	const generateVars = (obj: any, prefix = '') => {
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && value !== null && 'light' in value && 'dark' in value) {
				const varName = `--color-${prefix}${key}`;
				variables[varName] = value[theme as keyof typeof value] as string;
			} else if (typeof value === 'object' && value !== null) {
				generateVars(value, `${prefix}${key}-`);
			}
		}
	};

	generateVars(colorPalette);
	return variables;
}
