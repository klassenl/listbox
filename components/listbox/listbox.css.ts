import { style, globalStyle } from '@vanilla-extract/css'

export const listBox = style({
  listStyle: 'none',
})

globalStyle(`${listBox} li`, {
  listStyle: 'none',
})

export const listItem = style({
  listStyle: 'none',
  cursor: 'pointer',
})
