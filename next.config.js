/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
	...nextTranslate(),
  async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},
  env: {
    NEXT_APP_BEEGIN_DOMAIN: 'http://localhost:8000',
    NEXTAUTH_URL: 'http://localhost:3000'
  },
  images: {
    domains: ['images.pexels.com']
  }
}

module.exports = nextConfig
