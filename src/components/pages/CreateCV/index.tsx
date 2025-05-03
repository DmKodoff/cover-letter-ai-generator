'use client'

import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import LetterForm from '@/components/features/LetterForm'
import MotivationBanner from '@/components/features/MotivationBanner'
import LetterPreview from '@/components/features/LetterPreview'
import { useLetterStore } from '@/store/letterStore'
import { useLetterGeneration } from '@/hooks/useLetterGeneration'

import st from './CreateCV.module.scss'

const CreateCV = () => {
  const [formData, setFormData] = useState<LetterFormData | null>(null)

  const {
    isGenerating,
    generatedLetter,
    isRetry,
    generateLetter,
    resetLetter,
  } = useLetterGeneration()

  const currentLettersCount = useLetterStore.use.currentLettersCount()
  const minCountLetters = useLetterStore.use.minCountLetters()

  const showMotivationBanner =
    generatedLetter && currentLettersCount < minCountLetters

  const pageTitle = useMemo(() => {
    if (formData?.jobTitle && formData?.company) {
      return `${formData.jobTitle}, ${formData.company}`
    }
    return 'New application'
  }, [formData?.company, formData?.jobTitle])

  const handleFormChange = useCallback((data: LetterFormData) => {
    setFormData(data)
  }, [])

  const previewRef = useRef<HTMLDivElement>(null)

  const scrollToPreview = useCallback(() => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (generatedLetter && !isGenerating) {
      scrollToPreview()
    }
  }, [generatedLetter, isGenerating, scrollToPreview])

  const handleSubmit = useCallback(
    async (data: LetterFormData) => {
      await generateLetter(data)
    },
    [generateLetter]
  )

  const handleRetry = useCallback(() => {
    resetLetter()
  }, [resetLetter])

  return (
    <div className={st.container}>
      <div className={st.formColumn}>
        <h1
          className={cn(st.title, {
            [st.titleFilled]: formData?.jobTitle && formData?.company,
          })}
        >
          {pageTitle}
        </h1>
        <LetterForm
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          isGenerating={isGenerating}
          isRetry={isRetry}
          onRetry={handleRetry}
        />
      </div>

      <div className={st.previewColumn} ref={previewRef}>
        <LetterPreview
          isGenerating={isGenerating}
          generatedLetter={generatedLetter}
        />
      </div>

      {showMotivationBanner && (
        <div className={st.bannerWrapper}>
          <MotivationBanner />
        </div>
      )}
    </div>
  )
}

export default CreateCV
