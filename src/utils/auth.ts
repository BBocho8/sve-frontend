import { SupabaseAdapter } from '@auth/supabase-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
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
};

export default authOptions;
