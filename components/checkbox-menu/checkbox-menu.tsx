import { srOnly } from '../../styles/app.css'
import { menuInner, menu } from './checkbox-menu.css'
import { ListboxProps, Option } from '../listbox/types'
import CheckboxGroup from '../checkbox-group/checkbox-group'
import Menu from '../menu/menu'
import { buttonStyle } from '../button/button.css'

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
        <button className={buttonStyle['menu']}>
          {`${buttonCopy(selectedValues as any, buttonText)}`}
          <span className={srOnly}>{name}</span>
        </button>
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
