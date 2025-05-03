'use client'

import cn from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { memo, useEffect } from 'react'

import { IconLoading, IconRepeat } from '@/assets'

import st from './LetterForm.module.scss'
import Button from '@/components/ui/Button'

const MAX_CHARTS = 1200

type LetterFormProps = {
  onSubmit: (data: LetterFormData) => Promise<void>
  onFormChange?: (data: LetterFormData, isValid: boolean) => void
  isGenerating?: boolean
  isRetry?: boolean
  onRetry?: () => void
}

const LetterForm: React.FC<LetterFormProps> = ({
  onSubmit,
  onFormChange,
  isGenerating = false,
  isRetry = false,
}) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<LetterFormData>({
    defaultValues: {
      company: '',
      jobTitle: '',
      skillsList: '',
      additionalDetails: '',
    },
    mode: 'onChange',
  })

  const formValues = watch()
  const additionalDetailsValue = watch('additionalDetails') || ''

  useEffect(() => {
    if (onFormChange && formValues) {
      onFormChange(getValues(), isValid)
    }
  }, [formValues, isValid, onFormChange, getValues])

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data)
  })

  return (
    <form className={st.form} onSubmit={onSubmitHandler}>
      <div className={st.fieldGroup}>
        <div className={st.field}>
          <label className={st.label}>Job title</label>
          <Controller
            name='jobTitle'
            control={control}
            rules={{ required: 'Job title is required' }}
            render={({ field }) => (
              <input
                {...field}
                className={cn(st.input, { [st.errorInput]: errors.jobTitle })}
                placeholder='Product manager'
                disabled={isGenerating}
              />
            )}
          />
          {errors.jobTitle && (
            <span className={st.error}>{errors.jobTitle.message}</span>
          )}
        </div>

        <div className={st.field}>
          <label className={st.label}>Company</label>
          <Controller
            name='company'
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field }) => (
              <input
                {...field}
                className={cn(st.input, { [st.errorInput]: errors.company })}
                placeholder='Apple'
                disabled={isGenerating}
              />
            )}
          />
          {errors.company && (
            <span className={st.error}>{errors.company.message}</span>
          )}
        </div>
      </div>

      <div className={st.field}>
        <label className={st.label}>I am good at...</label>
        <Controller
          name='skillsList'
          control={control}
          rules={{ required: 'Skills is required' }}
          render={({ field }) => (
            <input
              {...field}
              className={cn(st.input, { [st.errorInput]: errors.skillsList })}
              placeholder='HTML, CSS and doing things in time'
              disabled={isGenerating}
              autoComplete='off'
            />
          )}
        />
        {errors.skillsList && (
          <span className={st.error}>{errors.skillsList.message}</span>
        )}
      </div>

      <div className={st.field}>
        <label className={st.label}>Additional details</label>
        <Controller
          name='additionalDetails'
          control={control}
          rules={{
            required: 'Details is required',
            maxLength: {
              value: MAX_CHARTS,
              message: '',
            },
          }}
          render={({ field }) => (
            <textarea
              {...field}
              className={cn(st.textarea, {
                [st.errorInput]: errors.additionalDetails,
              })}
              placeholder='Describe why you are a great fit or paste your bio'
              disabled={isGenerating}
            />
          )}
        />
        <span
          className={cn(st.charCount, { [st.error]: errors.additionalDetails })}
        >
          {additionalDetailsValue.length}/{MAX_CHARTS}
        </span>
        {errors.additionalDetails && (
          <span className={st.error}>{errors.additionalDetails.message}</span>
        )}
      </div>

      <Button
        type='submit'
        variant={isRetry ? 'secondary' : 'primary'}
        className={cn(
          st.submitButton,
          { [st.retry]: isRetry },
          { [st.loading]: isGenerating }
        )}
        disabled={isGenerating || !isValid}
      >
        {isGenerating ? (
          <IconLoading className={st.loadingIcon} />
        ) : isRetry ? (
          <>
            <IconRepeat className={st.repeatIcon} />
            Try Again
          </>
        ) : (
          'Generate Now'
        )}
      </Button>
    </form>
  )
}

export default memo(LetterForm)
