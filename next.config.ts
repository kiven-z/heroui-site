import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.yaml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      },
    },
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       // 真正的后端
  //       destination: 'http://localhost:8080/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
