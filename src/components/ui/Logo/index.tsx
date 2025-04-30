import Link from 'next/link'

import { LogoImage } from '@/assets'

const Logo = () => (
  <Link href='/'>
    <LogoImage height={48} width='auto' />
  </Link>
)

export default Logo
