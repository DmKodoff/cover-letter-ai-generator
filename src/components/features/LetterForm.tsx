'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

import st from './LetterForm.module.scss'

interface LetterFormProps {
  onSave: (content: string) => void
  onCancel: () => void
  initialContent?: string
}

/**
 * Компонент формы для создания/редактирования сопроводительного письма
 */
const LetterForm: React.FC<LetterFormProps> = ({
  onSave,
  onCancel,
  initialContent = '',
}) => {
  const [content, setContent] = useState(initialContent)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(content)
  }

  return (
    <form onSubmit={handleSubmit} className={st.form}>
      <div className={st.formGroup}>
        <label htmlFor='letterContent' className={st.label}>
          Введите текст сопроводительного письма
        </label>
        <textarea
          id='letterContent'
          className={st.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          placeholder='Начните писать здесь...'
        />
      </div>

      <div className={st.actions}>
        <Button variant='secondary' onClick={onCancel} type='button'>
          Отмена
        </Button>
        <Button variant='primary' type='submit'>
          Сохранить
        </Button>
      </div>
    </form>
  )
}

export default LetterForm
