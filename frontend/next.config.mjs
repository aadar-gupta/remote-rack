/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PostCSS processing
  postcss: true,

  // Optimize for development
  webpack: (config, { dev, isServer }) => {
    // Enable fast refresh
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
      // Increase file watching limits
      config.watchOptions = {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }
    return config;
  },

  // Development optimizations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Enable experimental features for better development experience
  experimental: {
    // Enable React Fast Refresh
    fastRefresh: true,
    // Optimize package imports
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
