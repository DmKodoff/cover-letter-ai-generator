import React from 'react'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  current: number
  total: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100)

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <div className={styles.progressItems}>
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`${styles.progressItem} ${
              index < current ? styles.active : ''
            }`}
          />
        ))}
      </div>
      <div className={styles.progressText}>
        {current}/{total} писем создано
      </div>
    </div>
  )
}

export default ProgressBar
