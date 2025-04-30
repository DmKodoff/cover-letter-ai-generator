import { IconPlus } from '@/assets'
import st from './DashboardHeader.module.scss'
import Button from '@/components/ui/Button'

const DashboardHeader = () => (
  <div className={st.container}>
    <h1 className={st.title}>Applications</h1>
    <Button variant='primary' href='/create' className={st.btn}>
      <IconPlus className={st.icon} />
      <span className={st.buttonText}>Create New</span>
    </Button>
  </div>
)

export default DashboardHeader
