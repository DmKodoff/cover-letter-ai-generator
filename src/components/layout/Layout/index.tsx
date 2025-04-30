import Header from '../Header'

import st from './Layout.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: TProps) => {
  return (
    <>
      <Header />
      <main className={st.main}>{children}</main>
    </>
  )
}
