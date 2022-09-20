import { useState, cloneElement, useId, useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import FocusLock from 'react-focus-lock'
import { menuOuter, menuDropdownOuter } from './menu.css'

const Menu = ({
  children,
  trigger,
  onOpen,
  className = '',
  autoFocus,
  type = 'listbox',
  labelId,
}: {
  children: JSX.Element
  trigger: JSX.Element
  className?: string
  onOpen?: () => void
  autoFocus?: boolean
  type?: 'listbox'
  labelId?: string
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
        ['aria-haspopup']: type === 'listbox' ? 'listbox' : undefined
      })}
      <div className={menuDropdownOuter}>
        {open && (
          <div ref={ref as any}>
            <FocusLock returnFocus autoFocus={autoFocus}>
              {cloneElement(children, {
                id: contentId,
                onClick: () => {
                  setOpen(!open)
                  if (open && onOpen) {
                    onOpen()
                  }
                },
                'aria-labelledby': labelId ?? triggerId,
                ['aria-controls']: contentId,
                ['aria-expanded']: open,
                ['aria-haspopup']: type === 'listbox' ? 'listbox' : undefined
              })}
            </FocusLock>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
