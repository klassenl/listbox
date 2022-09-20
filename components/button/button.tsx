import { forwardRef, PropsWithChildren } from 'react'
import { buttonStyle } from './button.css'

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<{ variant?: 'menu' | 'button' }>
>(({ children, variant = 'button', ...other }, ref) => (
  <button
    className={buttonStyle[variant]}
    type="button"
    ref={ref}
    {...other}
  >
    {children}
  </button>
))

Button.displayName = 'Button'

export default Button
