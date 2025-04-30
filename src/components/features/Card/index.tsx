import React from 'react'
import Button from '../../ui/Button'

import st from './LetterCard.module.scss'
import { IconCopy, IconTrash } from '@/assets'
import cn from 'classnames'

type LetterCardProps = {
  id: string
  content: string
  className?: string
}

const LetterCard: React.FC<LetterCardProps> = ({
  // id,
  content,
  className = '',
}) => {
  const handleDelete = () => {
    // onDelete(id)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
  }

  const previewContent = content.split('\n').slice(0, 4).join('\n')

  return (
    <div className={`${st.card} ${className}`}>
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
        <Button variant='clear' onClick={handleCopy} className={st.copyButton}>
          <span className={st.buttonText}>Copy to clipboard</span>
          <IconCopy className={cn(st.icon, st.copy)} />
        </Button>
      </div>
    </div>
  )
}

export default LetterCard
