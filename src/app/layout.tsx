import '../styles/main.scss'

export const metadata = {
  title: 'CV generator',
  description: 'Generated CV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
