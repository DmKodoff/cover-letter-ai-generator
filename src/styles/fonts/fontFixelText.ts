import localFont from 'next/font/local'

const fontFixelText = localFont({
  preload: true,
  display: 'swap',
  src: [
    {
      path: './FixelText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './FixelText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './FixelText-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './FixelText-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default fontFixelText
