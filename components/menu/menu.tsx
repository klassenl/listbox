import {
  useState,
  ReactNode,
  cloneElement,
  useId,
  useRef,
} from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import FocusLock from 'react-focus-lock'
import { vars } from '../../styles/theme.css'

const Menu = ({
  children,
  trigger,
  onOpen,
  className = '',
  autoFocus,
}: {
  children: ReactNode;
  trigger: JSX.Element;
  className?: string;
  onOpen?: () => void;
  autoFocus?: boolean;
}) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | undefined>()
  const triggerId = useId()
  const contentId = useId()
  const ref = useOutsideClick(() => setOpen(false), triggerRef as any)

  return (
    <div
      className={className}
      style={{
        position: 'relative',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }}
    >
      {cloneElement(trigger, {
        id: triggerId,
        ref: triggerRef,
        onClick: () => {
          setOpen(!open)
          if (open && onOpen) {
            onOpen()
          }
        },
        ['aria-controls']: contentId,
        ['aria-expanded']: open,
      })}
      <div
        id={contentId}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          backgroundColor: vars.colors.white,
        }}
      >
        {open && (
          <div ref={ref as any}>
            <FocusLock returnFocus autoFocus={autoFocus}>{children}</FocusLock>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
