'use server'

import OpenAI from 'openai'

interface LetterGenerationParams {
  company: string
  jobTitle: string
  skillsList: string
  additionalDetails: string
}

export async function generateLetter(
  params: LetterGenerationParams
): Promise<{ letter: string } | { error: string }> {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return { error: 'OpenAI API key not configured' }
    }

    if (!params.company || !params.jobTitle) {
      return { error: 'Missing required fields' }
    }

    const client = new OpenAI({
      apiKey: apiKey,
    })

    const prompt = createCoverLetterPrompt(params)

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are a professional cover letter writer.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const generatedText = response.choices[0].message.content?.trim() || ''

    return { letter: generatedText }
  } catch (error) {
    console.error('Error generating cover letter:', error)

    return { error: 'Failed to generate cover letter. Please try again later.' }
  }
}

function createCoverLetterPrompt(params: LetterGenerationParams): string {
  return `You are a professional cover letter writer. Write a professional and compelling cover letter for a candidate applying for the position of ${params.jobTitle} at ${params.company}.

Candidate's skills: ${params.skillsList}

Additional information about the candidate: ${params.additionalDetails}

Cover letter requirements:
1. The letter should be professional, concise, and compelling
2. Emphasize how the candidate's skills match the job requirements
3. Use formal business style
4. Avoid clichés and generic phrases
5. The letter structure should include: greeting, introduction with position reference, main body describing skills and experience, conclusion with a call to action
6. Length - no more than 300-350 words

Write only the letter text without additional comments.`
}
