import React from 'react'
import Button from '../../ui/Button'

import st from './LetterCard.module.scss'

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
    // onCopy(content)
  }

  // Получаем первые 4 строки письма для предпросмотра
  const previewContent = content.split('\n').slice(0, 4).join('\n')

  return (
    <div className={`${st.card} ${className}`}>
      <div className={st.content}>
        <p className={st.text}>{previewContent}</p>
        <div className={st.overlay} />
      </div>
      <div className={st.actions}>
        <Button
          variant='secondary'
          onClick={handleDelete}
          className={st.deleteButton}
        >
          Удалить
        </Button>
        <Button
          variant='secondary'
          onClick={handleCopy}
          className={st.copyButton}
        >
          Копировать в буфер
        </Button>
      </div>
    </div>
  )
}

export default LetterCard
