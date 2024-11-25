/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	reactStrictMode: false,
	output: 'standalone',
	async redirects() {
		return [
			// Basic redirect
			// {
			//   source: '/about',
			//   destination: '/',
			//   permanent: true,
			// },
			// Wildcard path matching
			{
				source: '/admin/:slug',
				destination: '/admin/:slug',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
