'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Letter } from '@/types/letter'
import { createSelectors } from '@/lib/comon/createSelectors'

interface LetterState {
  letters: Letter[]
  loading: boolean
  error: string | null
  currentLettersCount: number
  minCountLetters: number
  createLetter: (content: string) => Letter
  deleteLetter: (id: string) => void
}

const initialState = {
  letters: [],
  loading: false,
  error: null,
  currentLettersCount: 0,
  minCountLetters: 5,
}

const useLetterStoreBase = create<LetterState>()(
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
          state.currentLettersCount = state.letters.length
        })
        return newLetter
      },
      deleteLetter: (id: string) => {
        set((state) => {
          state.letters = state.letters.filter((l) => l.id !== id)
          state.currentLettersCount = state.letters.length
        })
      },
    })),
    {
      name: 'letters-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        letters: state.letters,
        currentLettersCount: state.currentLettersCount,
      }),
    }
  )
)

export const useLetterStore = createSelectors(useLetterStoreBase)
