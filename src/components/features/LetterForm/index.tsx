'use client'

import cn from 'classnames'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { useLetterStore } from '@/store/letterStore'
import { IconLoading } from '@/assets'

import st from './LetterForm.module.scss'

const MAX_CHARTS = 1200

const LetterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const createLetter = useLetterStore.use.createLetter()

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LetterFormData>({
    defaultValues: {
      company: '',
      jobTitle: '',
      skillsList: '',
      additionalDetails: '',
    },
  })

  const additionalDetailsValue = watch('additionalDetails') || ''

  const onSubmit = async (data: LetterFormData) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const generatedText = `Dear ${data.company} Team,
I am writing to express my interest in the ${data.jobTitle} position.My experience in the realm combined with my skills in ${data.skillsList} make me a strong candidate for this role.
${data.additionalDetails}
I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`

      createLetter(generatedText)
    } catch (error) {
      console.error('Error generating letter:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitHandler = async (data: LetterFormData) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={st.form} onSubmit={handleSubmit(onSubmitHandler)}>
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
                className={st.input}
                placeholder='Product manager'
                disabled={isLoading}
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
                className={st.input}
                placeholder='Apple'
                disabled={isLoading}
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
              className={st.input}
              placeholder='HTML, CSS and doing things in time'
              disabled={isLoading}
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
            maxLength: {
              value: MAX_CHARTS,
              message: `Max length is ${MAX_CHARTS}`,
            },
          }}
          render={({ field }) => (
            <textarea
              {...field}
              className={st.textarea}
              placeholder='Describe why you are a great fit or paste your bio'
              disabled={isLoading}
              maxLength={MAX_CHARTS}
            />
          )}
        />
        <span
          className={cn(st.charCount, { [st.error]: errors.additionalDetails })}
        >
          {additionalDetailsValue.length}/{MAX_CHARTS}
        </span>
      </div>

      <button type='submit' className={st.submitButton} disabled={isLoading}>
        {isLoading ? <IconLoading /> : 'Generate Now'}
      </button>
    </form>
  )
}

export default LetterForm
