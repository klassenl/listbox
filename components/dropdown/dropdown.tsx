import { forwardRef } from 'react'
import ListBox from '../listbox/listbox'
import Menu from '../menu/menu'
import { ListboxProps } from '../listbox/types'
import Checkbox from '../checkbox/checkbox'
import { dropdownButton, menu, listItem, menuInner, selectedItemInner } from './dropdown.css'
const Dropdown = forwardRef<
  HTMLButtonElement,
  ListboxProps<unknown> & { placeholder?: string; name?: string }
>(({ selectedValues, placeholder = 'Select an option', ...other }, ref) => {
  return (
    <Menu
      className={menu}
      trigger={
        <button ref={ref} className={[dropdownButton].join(' ')}>
          {selectedValues?.[0]?.content ?? placeholder}
        </button>
      }
    >
      <ListBox
        listBoxClass={menuInner}
        selectedValues={selectedValues}
        listItemClass={listItem}
        render={(option, selected) =>
          selected ? (
            <div className={selectedItemInner}>
              {option.content}
              <Checkbox disabled checked />
            </div>
          ) : (
            <>{option.content}</>
          )
        }
        {...other}
      />
    </Menu>
  )
})

Dropdown.displayName = 'Dropdown'

export default Dropdown
