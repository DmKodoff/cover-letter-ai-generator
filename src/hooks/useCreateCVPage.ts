'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useLetterStore } from '@/store/letterStore'
import { useLetterGeneration } from '@/hooks/useLetterGeneration'

export const useCreateCVPage = () => {
  const [formData, setFormData] = useState<LetterFormData | null>(null)

  const {
    isGenerating,
    generatedLetter,
    isRetry,
    error,
    generateLetter,
    resetLetter,
  } = useLetterGeneration()

  const currentLettersCount = useLetterStore.use.currentLettersCount()
  const minCountLetters = useLetterStore.use.minCountLetters()

  const showMotivationBanner = useMemo(
    () => generatedLetter && currentLettersCount < minCountLetters,
    [generatedLetter, currentLettersCount, minCountLetters]
  )

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

  return {
    formData,
    isGenerating,
    generatedLetter,
    isRetry,
    error,
    showMotivationBanner,
    pageTitle,
    handleFormChange,
    handleSubmit,
    handleRetry,
    previewRef,
  }
}
