import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const menuInner = style({
  border: vars.line.light,
  marginTop: '.3rem',
  padding: `${vars.space.small} 0`,
  backgroundColor: vars.colors.white,
  borderRadius: vars.radius.default,
  boxShadow:'0 3px 10px rgb(0 0 0 / 0.2)',
})

export const menu = style({
  width: '200px',
})
