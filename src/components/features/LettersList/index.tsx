'use client'

import { useLetterStore } from '@/store/letterStore'
import LetterCard from '../Card'

import st from './LettersList.module.scss'
import cn from 'classnames'

type TProps = {
  className?: string
}

const LettersList: React.FC<TProps> = ({ className }) => {
  const letters = useLetterStore.use.letters()

  if (!letters?.length) return null

  return (
    <div className={cn(st.list, className)}>
      {letters.map((letter) => (
        <LetterCard key={letter.id} id={letter.id} content={letter.content} />
      ))}
    </div>
  )
}

export default LettersList
