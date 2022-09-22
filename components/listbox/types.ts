export type SelectType = 'single' | 'multi'

export interface Option<T> {
  ariaLabel?: string
  selected?: boolean
  content?: string | JSX.Element
  value?: T
}

export interface ListboxProps<T> {
  id?: string
  options: Array<Option<T>>
  name?: string
  selectType: SelectType
  selectedValues: Array<Option<T>> | undefined
  handleSelect: (value: T | undefined) => void
  handleDeselect?: (value: T | undefined) => void
  allowUnselected?: boolean
  listBoxClass?: string
  listItemClass?: string
  disabled?: boolean
  render?: (option: Option<any>, selected: boolean) => JSX.Element
  afterSelect?: () => void
  required?: boolean
  readOnly?: boolean
}
