/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.fakercloud.com', 'avatars.githubusercontent.com', 'github.com']
  },
  eslint: {
    dirs: ['./**/*']
  }
}
