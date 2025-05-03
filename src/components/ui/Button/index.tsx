import cn from 'classnames'
import Link from 'next/link'

import st from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'clear' | 'danger'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  href?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const buttonContent = <>{children}</>

  const buttonClassName = cn(st.button, st[`button-${variant}`], className)

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      {buttonContent}
    </button>
  )
}

export default Button
