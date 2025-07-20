import { NextResponse } from 'next/server';

export async function middleware(request) {
	// Check if the path starts with /admin but exclude the login page
	if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
		// Get the session from the API
		const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
			headers: {
				cookie: request.headers.get('cookie') || '',
			},
		});

		const session = await sessionResponse.json();

		// Check if user is authenticated and has correct admin email
		const adminEmail = process.env.ADMIN_EMAIL;
		const userEmail = session?.user?.email;

		if (!session?.user || userEmail !== adminEmail) {
			// Redirect to login if not authenticated or wrong email
			return NextResponse.redirect(new URL('/admin/login', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Match /admin and all sub-routes
		'/admin',
		'/admin/:path*',
	],
};
