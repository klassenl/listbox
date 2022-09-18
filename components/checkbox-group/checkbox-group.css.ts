import { style, globalStyle } from '@vanilla-extract/css'
import { listItem } from '../listbox/listbox.css'
import { vars } from '../../styles/theme.css'

export const checkboxItem = style({
  pointerEvents: 'none',
  display: 'inline-grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  gap: vars.space.small,
})

globalStyle(`${checkboxItem} input`, {
  marginRight: vars.space.medium,
})

export const item = style([
  listItem,
  {
    padding: vars.padding.listItem,
    ':hover': {
      backgroundColor: vars.colors.lightestGray,
    },
    ':focus-visible': {
      outline: `2px solid ${vars.colors.accent}`
    },
    selectors: {
      '&[aria-selected="true"]': {},
    },
  },
])
