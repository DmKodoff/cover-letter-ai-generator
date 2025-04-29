'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/layout/Header'
import Button from '@/components/ui/Button'
import { useLetterStore } from '@/store/letterStore'

import st from './page.module.scss'

export default function CreateLetter() {
  const router = useRouter()
  const [letterContent, setLetterContent] = useState('')
  const { createLetter } = useLetterStore()

  const handleSave = () => {
    try {
      // Используем метод из хука для создания письма
      createLetter(letterContent)

      // Перенаправляем пользователя на страницу дашборда
      router.push('/')
    } catch (error) {
      // Показываем ошибку пользователю
      alert(
        error instanceof Error
          ? error.message
          : 'Пожалуйста, введите текст письма'
      )
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <main className={st.main}>
      <Header />
      <div className={st.container}>
        <h1 className={st.title}>Создание сопроводительного письма</h1>

        <div className={st.formGroup}>
          <label htmlFor='letterContent' className={st.label}>
            Введите текст сопроводительного письма
          </label>
          <textarea
            id='letterContent'
            className={st.textarea}
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            rows={15}
            placeholder='Начните писать здесь...'
          />
        </div>

        <div className={st.actions}>
          <Button variant='secondary' onClick={handleCancel}>
            Отмена
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </main>
  )
}
