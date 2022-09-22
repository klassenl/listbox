import React, { useRef, forwardRef } from 'react'
import { focus, getFirstSelectedItem } from '../util'
import { Option, ListboxProps } from './types'
import { listBox, listItem } from './listbox.css'

const ListBox = forwardRef(
  <T,>(
    {
      id,
      options,
      name,
      selectType = 'single',
      selectedValues,
      handleSelect,
      allowUnselected,
      listBoxClass,
      listItemClass,
      handleDeselect,
      disabled,
      render,
      afterSelect,
      initialFocus,
      readOnly,
      required
      // todo: fix this any ts
    }: ListboxProps<any> & { initialFocus?: 'first' | 'last' },
    ref: any
  ) => {
    const itemsRef = useRef<Array<HTMLLIElement | null>>([])
    const checkForSelected = (value: T | undefined) => {
      if (Array.isArray(selectedValues)) {
        return selectedValues.some((val) => val.value === value)
      }
      return selectedValues === value
    }

    const select = {
      tab: (option: Option<any>) => {
        const isSelected = checkForSelected(option.value)
        if (!isSelected && selectType === 'single') {
          handleSelect(option.value)
        }
        afterSelect && afterSelect()
      },
      orDeselect: (option: Option<any>) => {
        const isSelected = checkForSelected(option.value)
        if (selectType === 'single') {
          if (!isSelected) {
            handleSelect(option.value)
            afterSelect && afterSelect()
          } else {
            afterSelect && afterSelect()
          }
          return
        }
        if (isSelected && handleDeselect && allowUnselected) {
          handleDeselect(option.value)
          afterSelect && afterSelect()
          return
        }

        handleSelect(option.value)
        afterSelect && afterSelect()
      }
    }
    return (
      <ul
        id={id}
        ref={ref}
        tabIndex={0}
        role="listbox"
        aria-label={name}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        aria-required={required}
        aria-multiselectable={selectType === 'multi'}
        className={listBoxClass ? listBoxClass : listBox}
        onFocus={(e) => {
          e.stopPropagation()
          const activeEl = document?.activeElement
          if (activeEl?.tagName === 'LI') return
          const selectedItem = getFirstSelectedItem(itemsRef?.current)
          if (selectedItem) {
            selectedItem.focus()
          } else if (initialFocus === 'last') {
            itemsRef.current[itemsRef.current.length - 1]?.focus()
          } else if (initialFocus === 'first' || itemsRef?.current?.length) {
            itemsRef?.current[0]?.focus()
          }
        }}
      >
        {options.map((option, i) => {
          return (
            <ListItem
              option={option}
              render={render}
              select={select}
              key={`item-chk-${option.value}`}
              ref={(el: HTMLLIElement) => (itemsRef.current[i] = el)}
              checkForSelected={checkForSelected}
              className={listItemClass ? listItemClass : listItem}
            />
          )
        })}
      </ul>
    )
  }
)
ListBox.displayName = 'ListBox'

const ListItem = forwardRef(
  (
    {
      option,
      className,
      checkForSelected,
      render,
      select
    }: {
      option: Option<unknown>
      className: string
      checkForSelected: (value: any) => boolean
      render?: (option: Option<any>, selected: boolean) => JSX.Element
      select: {
        orDeselect: (option: Option<unknown>) => void
        tab: (option: Option<unknown>) => void
      }
    },
    ref
  ) => {
    const isSelected = checkForSelected(option.value) || false
    return (
      <li
        ref={ref as any}
        className={className}
        role="option"
        tabIndex={-1}
        aria-selected={isSelected}
        onClick={(e) => {
          e.preventDefault()
          select.orDeselect(option)
        }}
        onKeyDown={(e) => {
          const target = e.target as HTMLElement
          const key = e.key ? e.code : e.key
          if (key !== 'Tab') {
            // listbox spec diverges from select
            // tab moves you out of listbox
            e.preventDefault()
          }

          switch (key) {
            case 'ArrowDown': {
              focus.next(target)
              break
            }
            case 'ArrowUp': {
              focus.prev(target)
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
            case 'Space': {
              select.orDeselect(option)
              break
            }
            case 'Enter': {
              select.orDeselect(option)
              break
            }
            case 'Tab': {
              // select and leave menu - one difference from native select
              select.tab(option)
              break
            }
          }
        }}
      >
        <>{render ? render(option, isSelected) : option.content}</>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
export default ListBox
