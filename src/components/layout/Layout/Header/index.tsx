import Link from 'next/link'

import { IconHome } from '@/assets'
import HeaderProgress from '@/components/features/HeaderProgress'
import Logo from '@/components/layout/Layout/Logo'

import st from './Header.module.scss'

const Header = () => {
  return (
    <header className={st.header}>
      <Logo />
      <div className={st.progressWrapper}>
        <HeaderProgress />

        <Link href='/' className={st.homeLink}>
          <IconHome width={16} height={16} />
        </Link>
      </div>
    </header>
  )
}

export default Header
