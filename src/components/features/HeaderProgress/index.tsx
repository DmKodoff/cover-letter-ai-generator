'use client'

import { useMemo } from 'react'

import { useLetterStore } from '@/store/letterStore'
import { IconCheck } from '@/assets'
import ProgressBar from '@/components/ui/ProgressBar'

import st from './HeaderProgress.module.scss'

const HeaderProgress = () => {
  const currentLettersCount = useLetterStore.use.currentLettersCount()
  const minCountLetters = useLetterStore.use.minCountLetters()

  const isSuccess = currentLettersCount >= minCountLetters

  const progress = useMemo(() => {
    if (isSuccess) {
      return (
        <div className={st.success}>
          <IconCheck width={14} />
        </div>
      )
    }

    return <ProgressBar variant='dots' />
  }, [isSuccess])

  return (
    <div className={st.progressBarWrapper}>
      {currentLettersCount}/{minCountLetters} applications generated {progress}
    </div>
  )
}

export default HeaderProgress
