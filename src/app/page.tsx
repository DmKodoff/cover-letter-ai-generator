'use client'

import Header from '@/components/layout/Header'
import MotivationBanner from '@/components/features/MotivationBanner'
import LetterCard from '@/components/features/LetterCard'
import { useLetterStore } from '@/store/letterStore'
import FontFixel from '@/components/ui/Fonts/FixelFont'

import st from './page.module.scss'

export default function Dashboard() {
  const { letters, currentLetters, totalLetters, deleteLetter } =
    useLetterStore()

  const handleDelete = (id: string) => {
    deleteLetter(id)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    alert('Письмо скопировано в буфер обмена')
  }

  return (
    <main className={st.main}>
      <Header />
      <FontFixel />
      <div className={st.container}>
        <h1 className={st.title}>Applications</h1>
        <MotivationBanner
          current={currentLetters}
          total={totalLetters}
          className={st.banner}
        />

        {letters.length > 0 ? (
          <div className={st.letterGrid}>
            {letters.map((letter) => (
              <LetterCard
                key={letter.id}
                id={letter.id}
                content={letter.content}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          <div className={st.emptyState}>
            <p>У вас пока нет сохраненных писем</p>
          </div>
        )}
      </div>
    </main>
  )
}
