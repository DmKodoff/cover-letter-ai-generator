'use client'

import { useState, useCallback } from 'react'
import { useLetterStore } from '@/store/letterStore'
import { generateLetter as serverGenerateLetter } from '@/lib/actions/generate-letter'

const createLetterFromTemplate = (data: LetterFormData): string => {
  const { company, jobTitle, skillsList, additionalDetails } = data

  return `Dear Employer,

I was very excited to see the ${jobTitle} opening at ${company}, and I would like to express my interest in this position.

My key skills include: ${skillsList}. These skills make me a strong candidate for this role.

${
  additionalDetails
    ? `Additional information: ${additionalDetails}

`
    : ''
}
I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`
}

export const useLetterGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isRetry, setIsRetry] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createLetter = useLetterStore.use.createLetter()

  const generateLetter = useCallback(
    async (data: LetterFormData) => {
      setIsGenerating(true)
      setGeneratedLetter('')
      setError(null)

      try {
        const result = await serverGenerateLetter(data)

        if ('error' in result) {
          throw new Error(result.error || 'Failed to generate letter')
        }

        const generatedText = result?.letter

        setGeneratedLetter(generatedText)
        createLetter(generatedText)
        setIsRetry(true)
      } catch (error) {
        console.error('Error generating letter:', error)

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An error occurred while generating the letter'

        setError(errorMessage)

        const fallbackLetter = createLetterFromTemplate(data)

        setGeneratedLetter(fallbackLetter)
        createLetter(fallbackLetter)
        setIsRetry(true)
      } finally {
        setIsGenerating(false)
      }
    },
    [createLetter]
  )

  const resetLetter = useCallback(() => {
    setIsRetry(false)
    setGeneratedLetter('')
    setError(null)
  }, [])

  return {
    isGenerating,
    generatedLetter,
    isRetry,
    error,
    generateLetter,
    resetLetter,
  }
}
