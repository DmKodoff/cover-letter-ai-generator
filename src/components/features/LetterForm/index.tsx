'use client'

import { memo, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { IconLoading, IconRepeat } from '@/assets'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'

import { letterFormSchema, MAX_CHARS } from './validationSchema'
import st from './LetterForm.module.scss'

type LetterFormProps = {
  onSubmit: (data: LetterFormData) => Promise<void>
  onFormChange?: (data: LetterFormData) => void
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
  } = useForm<LetterFormData>({
    defaultValues: {
      company: '',
      jobTitle: '',
      skillsList: '',
      additionalDetails: '',
    },
    resolver: yupResolver(letterFormSchema),
    mode: 'onChange',
  })

  const formValues = watch()
  const additionalDetailsValue = watch('additionalDetails') || ''

  useEffect(() => {
    if (onFormChange && formValues) {
      onFormChange(formValues)
    }
  }, [formValues, onFormChange])

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data)
  })

  const buttonText = useMemo(() => {
    if (isGenerating) {
      return <IconLoading className={st.loadingIcon} />
    }

    if (isRetry) {
      return (
        <>
          <IconRepeat className={st.repeatIcon} />
          Try Again
        </>
      )
    }

    return 'Generate Now'
  }, [isGenerating, isRetry])

  return (
    <form className={st.form} onSubmit={onSubmitHandler}>
      <div className={st.fieldGroup}>
        <Controller
          name='jobTitle'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label='Job title'
              placeholder='Product manager'
              disabled={isGenerating}
              error={errors.jobTitle?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name='company'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label='Company'
              placeholder='Apple'
              disabled={isGenerating}
              error={errors.company?.message}
              fullWidth
            />
          )}
        />
      </div>

      <Controller
        name='skillsList'
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label='I am good at...'
            placeholder='HTML, CSS and doing things in time'
            disabled={isGenerating}
            error={errors.skillsList?.message}
            autoComplete='off'
            fullWidth
          />
        )}
      />

      <Controller
        name='additionalDetails'
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label='Additional details'
            placeholder='Describe why you are a great fit or paste your bio'
            disabled={isGenerating}
            error={errors.additionalDetails?.message}
            charCount={additionalDetailsValue.length}
            maxChars={MAX_CHARS}
            fullWidth
          />
        )}
      />

      <Button
        type='submit'
        variant={isRetry ? 'secondary' : 'primary'}
        className={cn(st.submitButton, { [st.retry]: isRetry })}
        disabled={isGenerating || !isValid}
      >
        {buttonText}
      </Button>
    </form>
  )
}

export default memo(LetterForm)
