'use client'

import { useState, useCallback } from 'react'
import { useLetterStore } from '@/store/letterStore'

export const useLetterGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isRetry, setIsRetry] = useState(false)

  const createLetter = useLetterStore.use.createLetter()

  const generateLetter = useCallback(
    async (data: LetterFormData) => {
      setIsGenerating(true)
      setGeneratedLetter('')

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const generatedText = `Dear ${data.company} Team,
I am writing to express my interest in the ${data.jobTitle} position. My experience in the realm combined with my skills in ${data.skillsList} make me a strong candidate for this role.
${data.additionalDetails}
I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`

        setGeneratedLetter(generatedText)
        createLetter(generatedText)
        setIsRetry(true)
      } catch (error) {
        console.error('Error generating letter:', error)
      } finally {
        setIsGenerating(false)
      }
    },
    [createLetter]
  )

  const resetLetter = useCallback(() => {
    setIsRetry(false)
    setGeneratedLetter('')
  }, [])

  return {
    isGenerating,
    generatedLetter,
    isRetry,
    generateLetter,
    resetLetter,
  }
}
