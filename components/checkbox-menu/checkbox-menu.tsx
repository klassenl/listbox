import { srOnly } from '../../styles/app.css'
import { menuInner, menu } from './checkbox-menu.css'
import { ListboxProps, Option } from '../listbox/types'
import CheckboxGroup from '../checkbox-group/checkbox-group'
import Button from '../button/button'
import Menu from '../menu/menu'

const CheckboxMenu = <T,>({
  options,
  name,
  buttonText,
  selectType,
  selectedValues,
  ...other
}: Omit<ListboxProps<T>, 'inMenu'> & { buttonText: string }) => {
  return (
    <Menu
      className={menu}
      trigger={
        <Button variant="menu">
          {`${buttonCopy(selectedValues as any, buttonText)}`}
          <span className={srOnly}>{name}</span>
        </Button>
      }
    >
      <div className={menuInner}>
        <CheckboxGroup<Option<any>['value']>
          name={name}
          selectedValues={selectedValues}
          selectType={selectType}
          options={options}
          {...other}
        />
      </div>
    </Menu>
  )
}

const buttonCopy = (selectedValues: Option<unknown>[], text: string) => {
  const first = selectedValues[0]?.content
  const additional =
    selectedValues.length > 1 ? `+${selectedValues.length - 1}` : ''
  return first ? `${first ?? text} ${additional} ` : text
}

export default CheckboxMenu
