/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: true,
   },
   // image optimization
   images: {
      domains: ['placehold.co', 'cdn.sanity.io'],
      dangerouslyAllowSVG: true,
   },

   webpack: (config) => {
      config.resolve.alias.canvas = false

      return config
   },
}

module.exports = nextConfig
