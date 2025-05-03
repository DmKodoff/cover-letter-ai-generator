import DashboardHeader from '@/components/features/DashboardHeader'
import LettersList from '@/components/features/LettersList'
import MotivationBanner from '@/components/features/MotivationBanner'

import st from './Dashboard.module.scss'

const Dashboard = () => (
  <>
    <DashboardHeader className={st.header} />
    <LettersList className={st.list} />
    <MotivationBanner className={st.banner} />
  </>
)

export default Dashboard
