import { useState, useEffect } from 'react'
import cn from 'classnames'

import Button from '../../ui/Button'
import { IconCopy, IconCheck } from '@/assets'

import st from './CopyButton.module.scss'

type CopyButtonProps = {
  text: string
  className?: string
  showTextOnMobile?: boolean
  disabled?: boolean
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  showTextOnMobile = false,
  disabled,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setIsCopied(true)
  }

  return (
    <Button
      variant='clear'
      onClick={handleCopy}
      className={cn(st.copyButton, className, {
        [st.copied]: isCopied,
        [st.showTextOnMobile]: showTextOnMobile,
      })}
      disabled={disabled}
    >
      {!isCopied ? (
        <>
          <span className={st.buttonText}>Copy to clipboard</span>
          <IconCopy className={cn(st.icon, st.copyIcon)} />
        </>
      ) : (
        <>
          <span className={st.buttonText}>Copied!</span>
          <IconCheck className={cn(st.icon, st.copiedIcon)} />
        </>
      )}
    </Button>
  )
}

export default CopyButton
