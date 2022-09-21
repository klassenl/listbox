import { useState, cloneElement, useId, useRef, forwardRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import FocusLock from 'react-focus-lock'
import { menuOuter, menuDropdownOuter } from './menu.css'

const Menu = ({
  children,
  trigger,
  onOpen,
  className = '',
  autoFocus,
  labelId,
  mode
}: {
  children: JSX.Element
  trigger: JSX.Element
  className?: string
  onOpen?: () => void
  autoFocus?: boolean
  labelId?: string
  mode?: 'select' | 'listbox'
}) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | undefined>()
  const triggerId = useId()
  const contentId = useId()

  const triggerElement = cloneElement(trigger, {
    id: triggerId,
    ref: triggerRef,
    onKeyDown: (e: any) => {
      if (e.key === 'ArrowDown') {
        setOpen(!open)
        if (open && onOpen) {
          onOpen()
        }
      }
    },
    onClick: () => {
      setOpen(!open)
      if (open && onOpen) {
        onOpen()
      }
    },
    ['aria-controls']: contentId,
    ['aria-expanded']: open,
    ['aria-haspopup']: 'listbox'
    //role: comboBox ? 'combobox' : undefined
  })

  const listElement = cloneElement(children, {
    id: contentId,
    'aria-labelledby': labelId ?? triggerId,
    afterSelect:
      mode === 'select'
        ? () => {
            console.log('closing, menu is open:', open)
            setOpen(false)
          }
        : undefined
  })
  return (
    <div
      className={[menuOuter, className].join(' ')}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
    }}
    >
      {triggerElement}
      <div className={menuDropdownOuter}>
        {open && (
          <MenuPopUp
            ref={triggerRef}
            autoFocus={autoFocus ?? false}
            setOpen={setOpen}
            listboxElement={listElement}
          />
        )}
      </div>
    </div>
  )
}

const MenuPopUp = forwardRef(
  (
    {
      setOpen,
      autoFocus,
      listboxElement
    }: {
      setOpen: (open: boolean) => void
      autoFocus: boolean
      listboxElement: JSX.Element
    },
    ref
  ) => {
    const contentRef = useOutsideClick({
      clickCallback: () => setOpen(false),
      trigger: ref as any
    })
    return (
      <div ref={contentRef as any}>
        <FocusLock returnFocus autoFocus={autoFocus}>
          {listboxElement}
        </FocusLock>
      </div>
    )
  }
)
export default Menu
