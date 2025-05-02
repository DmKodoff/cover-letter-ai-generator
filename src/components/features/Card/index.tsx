import cn from 'classnames'

import { useLetterStore } from '@/store/letterStore'

import CopyButton from '../CopyButton'
import DeleteButton from './DeleteButton'

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
        <DeleteButton onDelete={handleDelete} className={st.deleteButton} />
        <CopyButton text={content} className={st.copyButton} />
      </div>
    </div>
  )
}

export default LetterCard
