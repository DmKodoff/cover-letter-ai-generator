'use client'

import { forwardRef } from 'react'
import cn from 'classnames'

import st from './TextArea.module.scss'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  charCount?: number
  maxChars?: number
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = false,
      charCount,
      maxChars,
      ...props
    },
    ref
  ) => {
    const showCharCount =
      typeof charCount === 'number' && typeof maxChars === 'number'

    return (
      <div className={cn(st.container, { [st.fullWidth]: fullWidth })}>
        {label && <label className={st.label}>{label}</label>}

        <textarea
          ref={ref}
          className={cn(st.textarea, { [st.errorInput]: error }, className)}
          {...props}
        />

        <div className={st.bottomRow}>
          {showCharCount && (
            <span className={cn(st.charCount, { [st.error]: error })}>
              {charCount}/{maxChars}
            </span>
          )}

          {error && <span className={st.error}>{error}</span>}
        </div>
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
