import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const button = style({
  borderRadius: vars.radius.default,
  padding: '.5rem .75rem',
  border: 'none',
  backgroundColor: vars.colors.accent,
  ':focus-visible': {
    outline: `2px solid ${vars.colors.accent}`,
    outlineOffset: '1px',
  },
})

export const buttonStyle = styleVariants({
  button: [button, {
  }],
  menu: [button, {
    minWidth: '140px',
    ':first-letter': {
      textTransform: 'uppercase',
    },
  }]
})
