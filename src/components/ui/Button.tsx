import React from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[`button-${variant}`]} ${className}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
