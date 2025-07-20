'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLoginPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		// If already signed in, redirect to admin
		if (session) {
			router.push('/admin');
		}
	}, [session, router]);

	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-text-primary mx-auto' />
					<p className='mt-4'>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-bg-secondary'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-text-primary'>Admin Login</h2>
					<p className='mt-2 text-center text-sm text-text-secondary'>Sign in to access the Sanity Studio</p>
				</div>
				<div className='mt-8 space-y-6'>
					<button
						type='button'
						onClick={() => signIn('google', { callbackUrl: '/admin' })}
						className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-text-inverse bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Sign in with Google
					</button>
				</div>
			</div>
		</div>
	);
}
