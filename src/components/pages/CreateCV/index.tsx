'use client'

import cn from 'classnames'

import LetterForm from '@/components/features/LetterForm'
import MotivationBanner from '@/components/features/MotivationBanner'
import LetterPreview from '@/components/features/LetterPreview'
import { useCreateCVPage } from '@/hooks/useCreateCVPage'

import st from './CreateCV.module.scss'

const CreateCV = () => {
  const {
    formData,
    isGenerating,
    generatedLetter,
    isRetry,
    error,
    showMotivationBanner,
    pageTitle,
    handleFormChange,
    handleSubmit,
    handleRetry,
    previewRef,
  } = useCreateCVPage()

  return (
    <div className={st.container}>
      <div className={st.formColumn}>
        <h1
          className={cn(st.title, {
            [st.titleFilled]: formData?.jobTitle && formData?.company,
          })}
        >
          {pageTitle}
        </h1>
        <LetterForm
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          isGenerating={isGenerating}
          isRetry={isRetry}
          onRetry={handleRetry}
        />
      </div>

      <div className={st.previewColumn} ref={previewRef}>
        <LetterPreview
          isGenerating={isGenerating}
          generatedLetter={generatedLetter}
          error={error}
        />
      </div>

      {showMotivationBanner && (
        <div className={st.bannerWrapper}>
          <MotivationBanner />
        </div>
      )}
    </div>
  )
}

export default CreateCV
