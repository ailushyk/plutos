const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  // transpilePackages: ['ui', 'db'],
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}
