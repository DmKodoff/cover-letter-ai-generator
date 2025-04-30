'use client'

import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import { useLetterStore } from '@/store/letterStore'

import st from './MotivationBanner.module.scss'

type MotivationBannerProps = {
  className?: string
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({
  className = '',
}) => {
  const current = useLetterStore.use.currentLettersCount()

  const total = useLetterStore.use.minCountLetters()

  if (current >= total) {
    return null
  }

  return (
    <div className={`${st.banner} ${className}`}>
      <div className={st.bannerContent}>
        <h3 className={st.bannerTitle}>Создайте еще {total - current} писем</h3>
        <p className={st.bannerDescription}>
          Чтобы получить максимальную пользу от приложения, рекомендуем создать
          не менее {total} писем
        </p>
        <div className={st.progressWrapper}>
          <ProgressBar variant='bars' />
        </div>
      </div>
      <Button variant='primary' href='/create'>
        Создать новое письмо
      </Button>
    </div>
  )
}

export default MotivationBanner
