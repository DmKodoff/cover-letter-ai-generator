import cn from 'classnames'

import { Layout } from '@/components/layout/Layout'
import fontFixelDisplay from '@/assets/fonts/fontFixelDisplay'
import fontFixelText from '@/assets/fonts/fontFixelText'

import '../styles/main.scss'

export const metadata = {
  title: 'CV generator',
  description: 'Generated CV',
}

type TProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html lang='en'>
      <body className={cn(fontFixelDisplay.variable, fontFixelText.variable)}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
