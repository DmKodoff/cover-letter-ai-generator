import * as yup from 'yup'

export const MAX_CHARS = 1200

export const letterFormSchema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  jobTitle: yup.string().required('Job title is required'),
  skillsList: yup.string().required('Skills are required'),
  additionalDetails: yup
    .string()
    .required('Additional information is required')
    .max(MAX_CHARS, `Maximum length is ${MAX_CHARS} characters`),
})

export type LetterFormValues = yup.InferType<typeof letterFormSchema>
