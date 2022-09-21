import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const menuOuter = style({
 position: 'relative',
})

export const menuDropdownOuter = style({
  backgroundColor: vars.colors.white,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
})

export const menuInner = style({
  border: vars.line.light,
  marginTop: '.15rem',
  padding: `${vars.space.small} 0`,
  backgroundColor: vars.colors.white,
  borderRadius: vars.radius.default,
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  listStyle: ' none'
})
