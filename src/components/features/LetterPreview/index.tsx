'use client'

import { ImageBall } from '@/assets'
import CopyButton from '@/components/features/CopyButton'
import st from './LetterPreview.module.scss'
import cn from 'classnames'

type LetterPreviewProps = {
  isGenerating: boolean
  generatedLetter: string
  className?: string
}

const LetterPreview: React.FC<LetterPreviewProps> = ({
  isGenerating,
  generatedLetter,
  className,
}) => {
  return (
    <div className={cn(st.preview, className)}>
      {isGenerating ? (
        <div className={st.loaderContainer}>
          <ImageBall className={st.ballLoader} />
        </div>
      ) : generatedLetter ? (
        <div className={st.letterContent}>{generatedLetter}</div>
      ) : (
        <p className={st.emptyText}>
          Your personalized job application will appear here...
        </p>
      )}
      <CopyButton
        text={generatedLetter}
        className={st.copyButton}
        disabled={isGenerating || !generatedLetter}
      />
    </div>
  )
}

export default LetterPreview
