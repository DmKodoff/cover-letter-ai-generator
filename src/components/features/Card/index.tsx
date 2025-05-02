import React from 'react'
import Button from '../../ui/Button'
import CopyButton from '../CopyButton'

import st from './LetterCard.module.scss'
import { IconTrash } from '@/assets'
import cn from 'classnames'
import { useLetterStore } from '@/store/letterStore'

type LetterCardProps = {
  id: string
  content: string
  className?: string
}

const LetterCard: React.FC<LetterCardProps> = ({
  id,
  content,
  className = '',
}) => {
  const deleteLetter = useLetterStore.use.deleteLetter()

  const handleDelete = () => {
    deleteLetter(id)
  }

  const previewContent = content.split('\n').slice(0, 6).join('\n')

  return (
    <div className={cn(st.card, className)}>
      <div className={st.content}>
        <p className={st.text}>{previewContent}</p>
        <div className={st.overlay} />
      </div>
      <div className={st.actions}>
        <Button
          variant='clear'
          onClick={handleDelete}
          className={st.deleteButton}
        >
          <IconTrash className={st.icon} />
          <span className={st.buttonText}>Delete</span>
        </Button>
        <CopyButton text={content} className={st.copyButton} />
      </div>
    </div>
  )
}

export default LetterCard
