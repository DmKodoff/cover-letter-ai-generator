import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Конфигурация для локальных шрифтов
  assetPrefix: '.',
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
}

export default nextConfig
