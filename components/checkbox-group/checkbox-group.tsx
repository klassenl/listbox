import ListBox from '../listbox/listbox'
import { ListboxProps } from '../listbox/types'
import { checkboxItem, item } from './checkbox-group.css'
import Checkbox from '../checkbox/checkbox'

const CheckboxGroup = <T,>({
  options,
  name,
  selectedValues,
  ...other
}: ListboxProps<T>) => {
  const checkboxOptions = () => {
    return options.map((option) => {
      const isChecked = checkForSelected(
        option.value,
        selectedValues as unknown[]
      )
      return {
        ...option,
        content: (
          <div className={checkboxItem}>
            <Checkbox checked={isChecked} aria-hidden readOnly tabIndex={-1} />
            {option.content}
          </div>
        )
      }
    })
  }
  return (
    <ListBox
      name={name}
      options={checkboxOptions()}
      selectedValues={selectedValues}
      listItemClass={item}
      {...other}
    />
  )
}

const checkForSelected = (
  value: unknown | undefined,
  selectedValues: Array<unknown>
) => {
  if (Array.isArray(selectedValues)) {
    return selectedValues.some((val) => val.value === value)
  }
  return selectedValues === value
}

export default CheckboxGroup
