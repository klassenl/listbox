import ListBox from '../listbox/listbox'
import Menu from '../menu/menu'
import { ListboxProps } from '../listbox/types'
import Checkbox from '../checkbox/checkbox'
import {
  dropdownButton,
  menu,
  listItem,
  selectedItemInner
} from './dropdown.css'
import { menuInner } from '../menu/menu.css'

const Dropdown = ({
  selectedValues,
  placeholder = 'Select an option',
  ...other
}: ListboxProps<any> & { placeholder?: string }) => {
  return (
    <Menu
      className={menu}
      mode="select"
      autoFocus
      trigger={
        <button type="button" className={[dropdownButton].join(' ')}>
          {selectedValues?.[0]?.content ?? placeholder}
        </button>
      }
    >
      <ListBox
        listBoxClass={menuInner}
        selectedValues={selectedValues}
        listItemClass={listItem}
        allowUnselected={false}
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
}

Dropdown.displayName = 'Dropdown'

export default Dropdown
