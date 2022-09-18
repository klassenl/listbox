import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const menuOuter = style({
 position: 'relative',
});

export const menuDropdownOuter = style({
  backgroundColor: vars.colors.white,
  position: "absolute",
  width: "100%",
  zIndex: 1,
})
