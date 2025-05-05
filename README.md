# Cover Letter Generator

This application allows you to create professional cover letters using the OpenAI GPT-4.1-nano model.

## About the Project

Cover Letter Generator is a web application that helps users quickly generate personalized cover letters for job applications. It uses the OpenAI API to produce professionally written letters based on the information provided by the user.

## Tech Stack

- **Frontend**: React 19, Next.js 15.3
- **Styling**: SASS
- **Form Management**: React Hook Form with Yup for validation
- **State Management**: Zustand with Immer
- **API Integration**: OpenAI API
- **Typing**: TypeScript

## Project Structure

- `src/app` – Next.js pages and routing
- `src/components` – React components
- `src/hooks` – Custom React hooks
- `src/lib` – Utilities and services
- `src/store` – Application state management (Zustand)
- `src/styles` – SASS styles
- `src/types` – TypeScript types

## Cover Letter Generation Functionality

### Usage

1. Fill out the form with job and skills information
2. Click the "Generate Now" button to create a cover letter
3. The generated letter will appear on the right side of the screen
4. You can copy the letter by clicking the copy button

### OpenAI Integration Architecture

#### OpenAI Service

The integration with the OpenAI API is implemented in the `src/lib/actions/generate-letter.ts` module. This module handles:

- Interacting with the OpenAI API
- Creating a service instance using the API key from environment variables
- Prompting the model to generate professional cover letters

#### `useLetterGeneration` Hook

The `useLetterGeneration` hook in `src/hooks/useLetterGeneration.ts` manages the letter generation process:

- Initializes the OpenAI service
- Handles loading and error states
- Provides a fallback generation option if the API key is not set

#### Error Handling

The application handles various errors that may occur during letter generation:

- Missing API key
- OpenAI API errors
- Network issues

When an error occurs, the user is shown a clear message with recommendations on how to resolve the issue.

## Installation and Running

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Build

```bash
# Build the project
npm run build

# Start the production version
npm start
```

## Additional Info

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for automatic font optimization and loading [Geist](https://vercel.com/font), a new font family by Vercel.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

For more information, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Author

**DM-Kotov**

Email: [dmitrii.kot.off@gmail.com](mailto:dmitrii.kot.off@gmail.com)

---

This project was created using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
