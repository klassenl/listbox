
import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const realCheckbox = style({
  appearance: 'none',
  backgroundColor: vars.colors.white,
  margin: '0',
  font: 'inherit',
  color: 'currentColor',
  width: '1.1em',
  height:' 1.1em',
  border: `0.1em solid ${vars.colors.gray}`,
  borderRadius:' 0.15em',
  transform: 'translateY(-0.075em)',
  display: 'grid',
  placeContent: 'center',
})

globalStyle(`${realCheckbox}:before`, {
  content: '',
  width: '0.65em',
  height:' 0.65em',
  transform: 'scale(0)',
  transition: '120ms transform ease-in-out',
  boxShadow: `inset 1em 1em ${vars.colors.accent}`,
  transformOrigin: 'bottom left',
  clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
})

globalStyle(`${realCheckbox}:checked:before`, {
  transform: 'scale(1)',
})
