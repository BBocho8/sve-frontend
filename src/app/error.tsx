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
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>Something went wrong!</h2>
				<button
					type='button'
					onClick={() => reset()}
					className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
				>
					Try again
				</button>
			</div>
		</div>
	);
}
