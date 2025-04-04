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
		<div>
			<h2>Something went wrong!</h2>
			<button type='button' onClick={() => reset()}>
				Try again
			</button>
		</div>
	);
}
