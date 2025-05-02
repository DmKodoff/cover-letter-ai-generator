'use client'

import { useLetterStore } from '@/store/letterStore'
import LetterCard from '../Card'

import st from './LettersList.module.scss'

const LettersList = () => {
  const letters = useLetterStore.use.letters()
  return (
    <div className={st.list}>
      {letters.length > 0 &&
        letters.map((letter) => (
          <LetterCard key={letter.id} id={letter.id} content={letter.content} />
        ))}
    </div>
  )
}

export default LettersList
