import { useState, ReactNode, cloneElement, useId, useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import FocusLock from 'react-focus-lock'
import { menuOuter, menuDropdownOuter } from './menu.css'

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
      className={[menuOuter, className].join(' ')}
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
      <div id={contentId} className={menuDropdownOuter}>
        {open && (
          <div ref={ref as any}>
            <FocusLock returnFocus autoFocus={autoFocus}>
              {children}
            </FocusLock>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
