import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const menu = style({
  maxWidth: '250px',
  width: '250px'
})

const menuItem = style({
  backgroundColor: vars.colors.white,
  padding: '0.5rem 1rem',
  width: '100%',
  textAlign: 'left',
  ':first-letter': {
    textTransform: 'uppercase'
  }
})

export const dropdownButton = style([
  menuItem,
  {
    border: vars.line.base,
    borderRadius: vars.radius.default
  }
])

export const listItem = style([
  menuItem,
  {
    ':hover': {
      backgroundColor: vars.colors.lightestGray
    },
    selectors: {
      '&[aria-selected="true"]': {
        color: vars.colors.accent
      }
    }
  }
])

export const selectedItemInner = style({
  display: 'flex',
  justifyContent: 'space-between'
})

/** checkbox as temporary checkmark until get icon */
globalStyle(`${selectedItemInner} > input`, {
  alignSelf: 'end',
  marginTop: '2px',
  border: 0
})
