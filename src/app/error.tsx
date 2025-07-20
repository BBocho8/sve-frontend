'use client';

import { useEffect } from 'react';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <nextJS component>
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='min-h-screen bg-bg-secondary flex items-center justify-center'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold text-text-primary mb-4'>Something went wrong!</h2>
				<button
					type='button'
					onClick={() => reset()}
					className='px-6 py-3 bg-interactive-primary text-text-inverse rounded-lg hover:bg-interactive-primary transition-colors'
				>
					Try again
				</button>
			</div>
		</div>
	);
}
