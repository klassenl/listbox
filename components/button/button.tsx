import { forwardRef, PropsWithChildren } from 'react'
import { button, menuButton } from './button.css'

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<{ variant?: 'menu' }>
>(({ children, variant, ...other }, ref) => (
  <button
    className={variant === 'menu' ? menuButton : button}
    type="button"
    ref={ref}
    {...other}
  >
    {children}
  </button>
))

Button.displayName = 'Button'

export default Button
