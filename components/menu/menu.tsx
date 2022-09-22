import React, {
  useState,
  cloneElement,
  useId,
  useRef,
  forwardRef,
  useEffect,
  ForwardedRef
} from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import { menuOuter, menuDropdownOuter } from './menu.css'
import { ListboxProps } from '../listbox/types'

interface MenuProps {
  children: JSX.Element
  trigger: JSX.Element
  className?: string
  onOpen?: () => void
  autoFocus?: boolean
  labelId?: string
  mode?: 'select' | 'listbox'
  disabled?: boolean
  triggerId?: string
}
const Menu = ({
  children,
  trigger,
  onOpen,
  className = '',
  autoFocus,
  labelId,
  mode,
  disabled,
  triggerId
}: MenuProps) => {
  const [open, setOpen] = useState(false)
  const [initialFocus, setInitialFocus] = useState<'first' | 'last'>()
  const triggerRef = useRef<HTMLElement | undefined>()
  const triggerId2 = useId()
  const contentId = useId()

  const returnFocusToTrigger = () => {
    const el = triggerRef?.current as HTMLElement
    if (el) {
      el.focus()
    }
  }
  const triggerElement = cloneElement(trigger, {
    id: triggerId ?? triggerId2,
    ref: triggerRef,
    onKeyDown: (e: any) => {
      setInitialFocus(undefined)
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setOpen(!open)
        if (e.key === 'ArrowUp') {
          setInitialFocus('last')
        }
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
    disabled: disabled,
    ['data-trigger']: true,
    ['aria-disabled']: disabled,
    ['aria-controls']: contentId,
    ['aria-expanded']: open,
    ['aria-haspopup']: 'listbox'
  })

  const listElement = cloneElement(children, {
    id: contentId,
    'aria-labelledby': labelId ?? triggerId,
    triggerRef: triggerRef,
    initialFocus: initialFocus,
    afterSelect:
      mode === 'select'
        ? () => {
            setOpen(false)
            triggerRef?.current?.focus()
          }
        : undefined
  } as Partial<ListboxProps<unknown>>)
  return (
    <div
      className={[menuOuter, className].join(' ')}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false)
          triggerRef?.current?.focus()
        }
      }}
    >
      {triggerElement}
      <div className={menuDropdownOuter}>
        {open && (
          <MenuPopUp
            //@ts-ignore
            ref={triggerRef}
            visible={open}
            autoFocus={autoFocus ?? false}
            setOpen={setOpen}
            listboxElement={listElement}
            returnFocusToTrigger={returnFocusToTrigger}
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
      listboxElement,
      returnFocusToTrigger
    }: {
      setOpen: (open: boolean) => void
      autoFocus: boolean
      listboxElement: JSX.Element
      returnFocusToTrigger: () => void
    },
    ref: ForwardedRef<HTMLElement>
  ) => {
    const contentRef = useOutsideClick({
      clickCallback: () => {
        setOpen(false)
        returnFocusToTrigger()
      },
      trigger: ref
    })

    useEffect(() => {
      if (autoFocus) {
        const listbox = contentRef?.current?.children[0] as HTMLUListElement
        if (listbox) {
          listbox.focus()
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <div ref={contentRef as any}>
        <>{listboxElement}</>
      </div>
    )
  }
)
MenuPopUp.displayName = 'MenuPopUp'
export default Menu
