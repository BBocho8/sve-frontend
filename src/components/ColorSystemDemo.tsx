'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { colorPalette, generateCSSVariables } from '@/config/colors';
import { useEffect, useState } from 'react';

const ColorSystemDemo = () => {
	const { theme } = useTheme();
	const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);

		// Get current CSS variables from the document
		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);
		const variables: Record<string, string> = {};

		// Get all CSS custom properties
		for (let i = 0; i < computedStyle.length; i++) {
			const property = computedStyle[i];
			if (property.startsWith('--color-')) {
				variables[property] = computedStyle.getPropertyValue(property);
			}
		}

		setCssVariables(variables);
	}, []);

	const generatedVars = generateCSSVariables(theme as 'light' | 'dark');

	return (
		<div className='min-h-screen bg-bg-primary p-8'>
			<div className='max-w-6xl mx-auto'>
				<h1 className='text-4xl font-bold text-text-primary mb-8'>Color System Demo</h1>

				{/* Debug Section */}
				<div className='mb-8 p-6 bg-surface-primary border border-border-primary rounded-lg'>
					<h2 className='text-2xl font-bold text-text-primary mb-4'>Debug Information</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<h3 className='text-lg font-semibold text-text-primary mb-2'>Current Theme: {theme}</h3>
							<p className='text-text-secondary mb-2'>
								Document Classes: {isClient ? document.documentElement.className : 'Loading...'}
							</p>
							<p className='text-text-secondary'>Generated Variables: {Object.keys(generatedVars).length}</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold text-text-primary mb-2'>Key CSS Variables</h3>
							<div className='space-y-1 text-sm'>
								<div className='flex justify-between'>
									<span className='text-text-secondary'>--color-bg-primary:</span>
									<span className='text-text-primary'>{cssVariables['--color-bg-primary'] || 'Not set'}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-text-secondary'>--color-surface-primary:</span>
									<span className='text-text-primary'>{cssVariables['--color-surface-primary'] || 'Not set'}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-text-secondary'>--color-text-primary:</span>
									<span className='text-text-primary'>{cssVariables['--color-text-primary'] || 'Not set'}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Color Palette Display */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Background Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>Background Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-bg-primary border border-border-primary rounded'>
								<span className='text-text-primary'>Primary Background</span>
							</div>
							<div className='p-3 bg-bg-secondary border border-border-primary rounded'>
								<span className='text-text-primary'>Secondary Background</span>
							</div>
							<div className='p-3 bg-bg-tertiary border border-border-primary rounded'>
								<span className='text-text-primary'>Tertiary Background</span>
							</div>
						</div>
					</div>

					{/* Surface Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>Surface Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-surface-primary border border-border-primary rounded'>
								<span className='text-text-primary'>Primary Surface</span>
							</div>
							<div className='p-3 bg-surface-secondary border border-border-primary rounded'>
								<span className='text-text-primary'>Secondary Surface</span>
							</div>
							<div className='p-3 bg-surface-tertiary border border-border-primary rounded'>
								<span className='text-text-primary'>Tertiary Surface</span>
							</div>
						</div>
					</div>

					{/* Text Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>Text Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-surface-primary border border-border-primary rounded'>
								<span className='text-text-primary'>Primary Text</span>
							</div>
							<div className='p-3 bg-surface-primary border border-border-primary rounded'>
								<span className='text-text-secondary'>Secondary Text</span>
							</div>
							<div className='p-3 bg-surface-primary border border-border-primary rounded'>
								<span className='text-text-tertiary'>Tertiary Text</span>
							</div>
							<div className='p-3 bg-interactive-primary border border-border-primary rounded'>
								<span className='text-text-inverse'>Inverse Text</span>
							</div>
						</div>
					</div>

					{/* Interactive Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>Interactive Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-interactive-primary border border-border-primary rounded'>
								<span className='text-text-inverse'>Primary Interactive</span>
							</div>
							<div className='p-3 bg-interactive-secondary border border-border-primary rounded'>
								<span className='text-text-inverse'>Secondary Interactive</span>
							</div>
							<div className='p-3 bg-interactive-danger border border-border-primary rounded'>
								<span className='text-text-inverse'>Danger Interactive</span>
							</div>
							<div className='p-3 bg-interactive-warning border border-border-primary rounded'>
								<span className='text-text-inverse'>Warning Interactive</span>
							</div>
							<div className='p-3 bg-interactive-success border border-border-primary rounded'>
								<span className='text-text-inverse'>Success Interactive</span>
							</div>
						</div>
					</div>

					{/* Border Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>Border Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-surface-primary border-4 border-border-primary rounded'>
								<span className='text-text-primary'>Primary Border</span>
							</div>
							<div className='p-3 bg-surface-primary border-4 border-border-secondary rounded'>
								<span className='text-text-primary'>Secondary Border</span>
							</div>
							<div className='p-3 bg-surface-primary border-4 border-border-accent rounded'>
								<span className='text-text-primary'>Accent Border</span>
							</div>
						</div>
					</div>

					{/* State Colors */}
					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-text-primary'>State Colors</h2>
						<div className='space-y-3'>
							<div className='p-3 bg-state-hover border border-border-primary rounded'>
								<span className='text-text-primary'>Hover State</span>
							</div>
							<div className='p-3 bg-state-active border border-border-primary rounded'>
								<span className='text-text-primary'>Active State</span>
							</div>
							<div className='p-3 bg-state-disabled border border-border-primary rounded'>
								<span className='text-text-primary'>Disabled State</span>
							</div>
						</div>
					</div>
				</div>

				{/* Raw Color Values */}
				<div className='mt-8 p-6 bg-surface-primary border border-border-primary rounded-lg'>
					<h2 className='text-2xl font-bold text-text-primary mb-4'>Raw Color Values ({theme} mode)</h2>
					<pre className='text-sm text-text-secondary overflow-x-auto'>{JSON.stringify(colorPalette, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
};

export default ColorSystemDemo;
