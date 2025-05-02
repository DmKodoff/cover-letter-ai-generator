interface CoverLetter {
  id: string
  company: string
  jobTitle: string
  skills: string[]
  additionalDetails: string
  createdAt: string
  content: string
}

interface LetterFormData {
  company: string
  jobTitle: string
  skillsList: string
  additionalDetails: string
}

interface Letter {
  id: string
  content: string
  createdAt: Date
}
