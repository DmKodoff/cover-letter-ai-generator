'use client'

import cn from 'classnames'
import { useLetterStore } from '@/store/letterStore'

import st from './ProgressBar.module.scss'

type ProgressBarProps = {
  className?: string
  variant?: 'dots' | 'bars'
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  variant = 'dots',
}) => {
  const current = useLetterStore.use.currentLettersCount()
  const total = useLetterStore.use.minCountLetters()

  return (
    <div className={cn(st.progressBar, st[variant], className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(st.bar, { [st.active]: index < current })}
        />
      ))}
    </div>
  )
}

export default ProgressBar
