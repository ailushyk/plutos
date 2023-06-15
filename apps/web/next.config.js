const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  // transpilePackages: ['ui', 'db'],
  reactStrictMode: false,
  experimental: {
    // typedRoutes: true,
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  // ignoreDuringBuilds: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}
