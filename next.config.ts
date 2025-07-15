import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'avatar.iran.liara.run',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				port: '',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
}

export default nextConfig
