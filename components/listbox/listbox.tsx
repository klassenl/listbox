import { useRef, forwardRef } from 'react'
import { focus, getFirstSelectedItem } from '../util'
import { Option, ListboxProps } from './types'
import { listBox, listItem } from './listbox.css'

const ListBox = <T,>({
  id,
  options,
  name,
  selectType,
  selectedValues,
  handleSelect,
  allowUnselected,
  listBoxClass,
  listItemClass,
  handleDeselect,
  disabled,
  render
}: ListboxProps<T>) => {
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])
  const checkForSelected = (value: T | undefined) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.some((val) => val.value === value)
    }
    return selectedValues === value
  }

  const handleSelectOrDeselect = (option: Option<T>) => {
    const isSelected = checkForSelected(option.value)
    if (selectType === 'single') {
      handleSelect(isSelected && allowUnselected ? undefined : option.value)
    } else {
      if (isSelected) {
        handleDeselect && option?.value && handleDeselect(option.value)
      } else {
        handleSelect(option.value)
      }
    }
  }

  return (
    <ul
      id={id}
      data-autofocus
      aria-label={name}
      role="listbox"
      tabIndex={0}
      className={listBoxClass ? listBoxClass : listBox}
      aria-readonly={disabled}
      onFocus={() => {
        const activeEl = document?.activeElement
        if (activeEl?.tagName === 'LI') return
        const selectedItem = getFirstSelectedItem(itemsRef?.current)
        if (selectedItem) {
          selectedItem.focus()
        } else if (itemsRef?.current?.length) {
          itemsRef?.current[0]?.focus()
        }
      }}
    >
      {options.map((option, i) => {
        return (
          <ListItem
            key={`item-chk-${option.value}`}
            handleSelectOrDeselect={handleSelectOrDeselect}
            checkForSelected={checkForSelected}
            className={listItemClass ? listItemClass : listItem}
            ref={(el: HTMLLIElement) => (itemsRef.current[i] = el)}
            option={option}
            render={render}
          />
        )
      })}
    </ul>
  )
}

const ListItem = forwardRef(
  (
    {
      option,
      className,
      checkForSelected,
      handleSelectOrDeselect,
      render
    }: {
      option: Option<unknown>
      className: string
      handleSelectOrDeselect: (option: Option<any>) => void
      checkForSelected: (value: any) => boolean
      render?: (option: Option<any>, selected: boolean) => JSX.Element
    },
    ref
  ) => {
    return (
      <li
        ref={ref as any}
        className={className}
        role="option"
        tabIndex={-1}
        aria-selected={checkForSelected(option.value) || false}
        onClick={() => handleSelectOrDeselect(option)}
        onKeyDown={(e) => {
          const target = e.target as HTMLElement
          const key = e.key ? e.code : e.key
          switch (key) {
            case 'ArrowDown': {
              focus.next(target)
              break
            }
            case 'ArrowUp': {
              focus.prev(target)
              break
            }
            case 'Space': {
              handleSelectOrDeselect(option)
              break
            }

            case 'Home': {
              focus.first(target)
              break
            }
            case 'End': {
              focus.last(target)
              break
            }
          }
        }}
      >
        <span>
          {render
            ? render(option, checkForSelected(option.value) || false)
            : option.content}
        </span>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

export default ListBox
