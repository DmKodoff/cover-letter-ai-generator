import cn from 'classnames'
import { useState } from 'react'

import { useLetterStore } from '@/store/letterStore'

import CopyButton from '../CopyButton'
import DeleteButton from './DeleteButton'
import LetterDialog from '../LetterDialog'

import st from './LetterCard.module.scss'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteLetter = useLetterStore.use.deleteLetter()

  const handleDelete = () => {
    deleteLetter(id)
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const previewContent = content.split('\n').slice(0, 6).join('\n')

  return (
    <>
      <div className={cn(st.card, className)}>
        <div className={st.content}>
          <p onClick={handleCardClick} className={st.text}>
            {previewContent}
          </p>
          <div className={st.overlay} />
        </div>
        <div className={st.actions}>
          <DeleteButton onDelete={handleDelete} className={st.btn} />
          <CopyButton text={content} className={st.btn} />
        </div>
      </div>

      <LetterDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        letter={content}
      />
    </>
  )
}

export default LetterCard
