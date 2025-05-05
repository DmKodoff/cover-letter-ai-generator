'use client'

import cn from 'classnames'
import { useMemo } from 'react'

import { ImageBall } from '@/assets'
import CopyButton from '@/components/features/CopyButton'

import st from './LetterPreview.module.scss'

type LetterPreviewProps = {
  isGenerating: boolean
  generatedLetter: string
  error?: string | null
  className?: string
}

const LetterPreview: React.FC<LetterPreviewProps> = ({
  isGenerating,
  generatedLetter,
  error,
  className,
}) => {
  const previewContent = useMemo(() => {
    switch (true) {
      case isGenerating: {
        return (
          <div className={st.loaderContainer}>
            <ImageBall className={st.ballLoader} />
          </div>
        )
      }

      case !!generatedLetter: {
        return <div className={st.letterContent}>{generatedLetter}</div>
      }

      default: {
        return (
          <p className={st.emptyText}>
            Your personalized cover letter will appear here...
          </p>
        )
      }
    }
  }, [isGenerating, generatedLetter])

  return (
    <>
      <div className={cn(st.preview, className)}>
        {previewContent}
        <CopyButton
          text={generatedLetter}
          className={st.copyButton}
          disabled={isGenerating || !generatedLetter || !!error}
        />
      </div>

      {!!error && (
        <div className={st.errorInfoContainer}>
          <p className={st.errorInfo}>
            API Error: {error}. <br />
            The email was generated using a template.
          </p>
        </div>
      )}
    </>
  )
}

export default LetterPreview
