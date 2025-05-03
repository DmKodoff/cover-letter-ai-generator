import cn from 'classnames'

import { IconPlus } from '@/assets'
import Button from '@/components/ui/Button'

import st from './DashboardHeader.module.scss'

type TProps = {
  className?: string
}

const DashboardHeader: React.FC<TProps> = ({ className }) => (
  <div className={cn(st.container, className)}>
    <h1 className={st.title}>Applications</h1>
    <Button variant='primary' href='/create' className={st.btn}>
      <IconPlus className={st.icon} />
      <span className={st.buttonText}>Create New</span>
    </Button>
  </div>
)

export default DashboardHeader
