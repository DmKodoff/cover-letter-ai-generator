'use client'

import fontFixelDisplay from '@/styles/fonts/fontFixelDisplay'
import fontFixelText from '@/styles/fonts/fontFixelText'

const FixelFont = () => (
  <style global jsx>{`
    :root {
      --font-fixel-display: ${fontFixelDisplay.style.fontFamily};
      --font-fixel-text: ${fontFixelText.style.fontFamily};
    }
  `}</style>
)

export default FixelFont
