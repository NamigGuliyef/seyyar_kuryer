const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Əgər SSR və ya API route-lar yoxdursa, sadəcə aşağıdakı alias kifayətdir
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src');
    return config;
  },
  // Vercel-də SPA fallback üçün heç bir əlavə rewrites lazım deyil, Next.js özü bütün route-ları idarə edir.
  // Əgər xüsusi rewrites və ya redirects lazımdırsa, aşağıdakı kimi əlavə edə bilərsən:
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;