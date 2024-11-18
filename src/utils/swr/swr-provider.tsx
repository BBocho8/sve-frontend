'use client';

import { SWRConfig } from 'swr';

const cacheProvider = () => new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SWRProvider = ({ children }: any) => {
	return (
		<SWRConfig
			value={{
				provider: cacheProvider,
				revalidateOnFocus: false,
				fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
				errorRetryCount: 10,
				errorRetryInterval: 1000,
			}}
		>
			{children}
		</SWRConfig>
	);
};
