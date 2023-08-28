/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config.js')
import { i18n } from './next-i18next.config.js'

// настройка для работы библиотеки по смене языка
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.dzeninfra.ru',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    RECAPTCHA_SITE_KEY: '6Le96RMnAAAAAE9dOL6eVQHJ1HYsNAo4OUbDGWIg',
  },
  eslint: {
    dirs: ['pages'], // Only run ESLint on the 'pages' directories during production builds (next build)
  },
}

export default nextConfig
