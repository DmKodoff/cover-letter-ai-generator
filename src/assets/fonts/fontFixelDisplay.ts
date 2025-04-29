import localFont from 'next/font/local'

const fontFixelDisplay = localFont({
  preload: true,
  variable: '--font-fixel-display',
  display: 'swap',
  src: [
    {
      path: './FixelDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './FixelDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
})

export default fontFixelDisplay
