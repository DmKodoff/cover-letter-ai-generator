'use client'

import { forwardRef } from 'react'
import cn from 'classnames'

import st from './Input.module.scss'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = false, ...props }, ref) => (
    <div className={cn(st.container, { [st.fullWidth]: fullWidth })}>
      {!!label && <label className={st.label}>{label}</label>}

      <input
        ref={ref}
        className={cn(st.input, { [st.errorInput]: error }, className)}
        {...props}
      />

      {!!error && <span className={st.error}>{error}</span>}
    </div>
  )
)

Input.displayName = 'Input'

export default Input
