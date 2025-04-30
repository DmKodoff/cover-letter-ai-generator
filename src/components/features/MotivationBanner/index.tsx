'use client'

import cn from 'classnames'

import { IconPlus } from '@/assets'
import { useLetterStore } from '@/store/letterStore'
import Button from '../../ui/Button'
import ProgressBar from '../../ui/ProgressBar'

import st from './MotivationBanner.module.scss'

type MotivationBannerProps = {
  className?: string
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({ className }) => {
  const current = useLetterStore.use.currentLettersCount()
  const total = useLetterStore.use.minCountLetters()

  if (current >= total) {
    return null
  }

  return (
    <div className={cn(st.banner, className)}>
      <div className={st.content}>
        <h3 className={st.title}>Hit your goal</h3>

        <p className={st.text}>
          Generate and send out couple more job applications today to get hired
          faster
        </p>

        <Button variant='primary' href='/create' className={st.btn}>
          <IconPlus className={st.icon} />
          Create New
        </Button>
      </div>

      <div className={st.progressWrapper}>
        <ProgressBar variant='bars' className={st.progress} />

        <p className={st.progressDescription}>
          {current} out of {total}
        </p>
      </div>
    </div>
  )
}

export default MotivationBanner
