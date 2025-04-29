import React from 'react'
import styles from './LetterCard.module.scss'
import Button from '../ui/Button'

type LetterCardProps = {
  id: string
  content: string
  onDelete: (id: string) => void
  onCopy: (content: string) => void
  className?: string
}

const LetterCard: React.FC<LetterCardProps> = ({
  id,
  content,
  onDelete,
  onCopy,
  className = '',
}) => {
  const handleDelete = () => {
    onDelete(id)
  }

  const handleCopy = () => {
    onCopy(content)
  }

  // Получаем первые 4 строки письма для предпросмотра
  const previewContent = content.split('\n').slice(0, 4).join('\n')

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.content}>
        <p className={styles.text}>{previewContent}</p>
        <div className={styles.overlay} />
      </div>
      <div className={styles.actions}>
        <Button
          variant='secondary'
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          Удалить
        </Button>
        <Button
          variant='secondary'
          onClick={handleCopy}
          className={styles.copyButton}
        >
          Копировать в буфер
        </Button>
      </div>
    </div>
  )
}

export default LetterCard
