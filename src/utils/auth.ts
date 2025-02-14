/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseAdapter } from '@auth/supabase-adapter';
import jwt from 'jsonwebtoken';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.SUPABASE_URL as string,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
	}),
	secret: process.env.NEXTAUTH_SECRET as string,
	callbacks: {
		async session({
			session,
			user,
		}: {
			session: any;
			user: any;
		}) {
			const signingSecret = process.env.SUPABASE_JWT_SECRET;
			if (signingSecret) {
				const payload = {
					aud: 'authenticated',
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: user.id,
					email: user.email,
					role: 'authenticated',
				};
				session.supabaseAccessToken = jwt.sign(payload, signingSecret);
			}
			return session;
		},
	},
};

export default authOptions;
