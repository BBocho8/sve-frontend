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
};

export default nextConfig;
