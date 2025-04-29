import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Letter } from '@/types/letter'

interface LetterState {
  letters: Letter[]
  loading: boolean
  error: string | null
  currentLetters: number
  totalLetters: number
  createLetter: (content: string) => Letter
  deleteLetter: (id: string) => void
  loadLetters: () => void
}

const initialState = {
  letters: [],
  loading: false,
  error: null,
  currentLetters: 0,
  totalLetters: 5,
}

export const useLetterStore = create<LetterState>()(
  persist(
    immer((set) => ({
      ...initialState,
      createLetter: (content: string) => {
        const newLetter: Letter = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          createdAt: new Date(),
        }
        set((state) => {
          state.letters.push(newLetter)
          state.currentLetters = state.letters.length
        })
        return newLetter
      },
      deleteLetter: (id: string) => {
        set((state) => {
          state.letters = state.letters.filter((l) => l.id !== id)
          state.currentLetters = state.letters.length
        })
      },
      loadLetters: () => {
        // Заглушка, так как persist сам загружает из localStorage
      },
    })),
    {
      name: 'letters-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        letters: state.letters,
        currentLetters: state.currentLetters,
      }),
    }
  )
)
