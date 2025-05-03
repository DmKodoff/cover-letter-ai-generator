import DashboardHeader from '@/components/features/DashboardHeader'
import LettersList from '@/components/features/LettersList'
import MotivationBanner from '@/components/features/MotivationBanner'

import st from './Dashboard.module.scss'

const Dashboard = () => (
  <div className={st.container}>
    <DashboardHeader className={st.header} />
    <LettersList className={st.list} />
    <MotivationBanner className={st.banner} />
  </div>
)

export default Dashboard
