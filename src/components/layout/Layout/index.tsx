import Header from './Header'

import st from './Layout.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={st.main}>{children}</main>
    </>
  )
}
