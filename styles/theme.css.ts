import { createGlobalTheme } from "@vanilla-extract/css";

const accent = '#2997ff'
export const vars = createGlobalTheme(":root", {
  space: {
    small: ".25rem",
    medium: ".5rem",
    semiLarge: ".75rem",
    large: "1rem",
    xLarge: "1.5rem",
  },
  fonts: {
    body: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    body: '17px',
    accent: '19px',
    headline: '48px',
  },
  colors: {
    white: 'white',
    gray: '#BEBEBE',
    lightGray: 'gainsboro',
    lightestGray: 'whitesmoke',
    accent: `${accent}`,
    text: {
      normal: "#1F2937",
      dimmed: "#6B7280",
    },
  },
  padding: {
    button: ".5rem .75rem",
    listItem: ".5rem .75rem",
  },
  outline: {
    focus: `2px solid ${accent}`,
  },
  line: {
    base: `1px solid gainsboro`,
    light: `1px solid whitesmoke`,
  },
  radius: {
    default: ".25rem",
  },
});
