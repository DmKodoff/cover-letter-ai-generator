import { useState, useEffect } from 'react'
import { Letter } from '@/types/letter'

/**
 * Хук для работы с сопроводительными письмами
 * Предоставляет методы для получения, создания, удаления писем
 */
export const useLetters = () => {
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentLettersCount, setCurrentLetters] = useState(0)
  const minCountLetters = 5 // Максимальное количество писем

  // Загрузка писем при монтировании компонента
  useEffect(() => {
    loadLetters()
  }, [])

  // Загрузка писем из localStorage
  const loadLetters = () => {
    try {
      setLoading(true)
      setLetters(fetchedLetters)
      setCurrentLetters(fetchedLetters.length)
      setError(null)
    } catch (err) {
      setError('Ошибка при загрузке писем')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Создание нового письма
  const createLetter = (content: string) => {
    try {
      if (!content.trim()) {
        throw new Error('Текст письма не может быть пустым')
      }

      setLetters([newLetter, ...letters])
      setCurrentLetters((prev) => prev + 1)
      return newLetter
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка при создании письма'
      )
      throw err
    }
  }

  // Удаление письма
  const deleteLetter = (id: string) => {
    try {
      setLetters(letters.filter((letter) => letter.id !== id))
      setCurrentLetters((prev) => prev - 1)
    } catch (err) {
      setError('Ошибка при удалении письма')
      console.error(err)
    }
  }

  return {
    letters,
    loading,
    error,
    currentLettersCount,
    minCountLetters,
    createLetter,
    deleteLetter,
    loadLetters,
  }
}
