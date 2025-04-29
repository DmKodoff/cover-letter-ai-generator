import React from 'react'
import styles from './MotivationBanner.module.scss'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import { useRouter } from 'next/navigation'

type MotivationBannerProps = {
  current: number
  total: number
  className?: string
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({
  current,
  total,
  className = '',
}) => {
  const router = useRouter()

  const handleCreateNew = () => {
    router.push('/create')
  }

  if (current >= total) {
    return null
  }

  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.bannerContent}>
        <h3 className={styles.bannerTitle}>
          Создайте еще {total - current} писем
        </h3>
        <p className={styles.bannerDescription}>
          Чтобы получить максимальную пользу от приложения, рекомендуем создать
          не менее {total} писем
        </p>
        <div className={styles.progressWrapper}>
          <ProgressBar current={current} total={total} />
        </div>
      </div>
      <Button onClick={handleCreateNew} variant='primary'>
        Создать новое письмо
      </Button>
    </div>
  )
}

export default MotivationBanner
