import {
  forwardRef,
  HTMLProps,
} from 'react'
import { realCheckbox } from './checkbox.css'

const Checkbox = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>(({ ...other }, ref) => (
  <input ref={ref} className={realCheckbox} type="checkbox" {...other} />
))

Checkbox.displayName = 'Checkbox'

export default Checkbox
