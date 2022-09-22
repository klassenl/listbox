import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'
import { buttonStyle } from './button.css'

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'menu' | 'button' }
  >
>(({ children, type = 'button', variant = 'button', ...other }, ref) => (
  <button
    ref={ref as any}
    className={buttonStyle[variant]}
    type={type}
    {...other}
  >
    {children}
  </button>
))

Button.displayName = 'Button'

export default Button
