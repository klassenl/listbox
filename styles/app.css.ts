import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

globalStyle(`html *`, {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  fontWeight: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'inherit'
})

globalStyle(`html`, {
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSize.body,
  color: vars.colors.text.normal,
  lineHeight: '1.2'
})

export const heading = style({
  fontSize: '1.5rem'
  //marginBottom: vars.space.xLarge,
})

export const subHeading = style({
  fontSize: vars.fontSize.accent,
  marginBottom: vars.space.xLarge
})

export const componentHeading = style({
  marginBottom: vars.space.small,
  color: vars.colors.gray
})

export const componentGrid = style({
  display: 'grid',
  gap: vars.space.large,
  gridAutoFlow: 'column',
  marginBottom: vars.space.xLarge
})

export const navList = style({
  fontSize: vars.fontSize.accent,
  display: 'inline-grid',
  gridAutoFlow: 'row',
  gap: vars.space.medium
})

export const link = style({
  color: vars.colors.accent,
  textDecoration: 'none',
  textUnderlineOffset: vars.space.small,
  borderRadius: vars.radius.default,
  fontWeight: 400,
  ':hover': {
    color: vars.colors.accent,
    textDecoration: 'underline',
    textDecorationThickness: '2px'
  },
  ':focus': {}
})

export const container = style({
  padding: '0 1.5rem',
  maxWidth: '1000px',
  width: '100%',
  margin: '0 auto'
})

export const header = style([
  container,
  {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
])

export const p = style({
  marginBottom: vars.space.medium
})

export const footer = style([
  container,
  {
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
])

export const appContainer = style({
  height: '100vh',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

globalStyle(`${appContainer} main`, {
  flex: 1
})

globalStyle(`${appContainer} main section`, {
  marginBottom: vars.space.xLarge
})

export const srOnly = style({
  border: ' 0',
  clip: ' rect(0, 0, 0, 0)',
  height: ' 1px',
  margin: '-1px',
  overflow: ' hidden',
  padding: ' 0',
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap'
})

export const inlineLabel = style({
  display: 'inline-grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  gap: vars.space.xLarge
})
