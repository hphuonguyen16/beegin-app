/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  env: {
    NEXT_APP_BEEGIN_DOMAIN: 'https://beegin.onrender.com',
    NEXTAUTH_URL: 'http://localhost:3000'
  },
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig
