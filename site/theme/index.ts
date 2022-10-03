// import { extendHashtagTheme, ThemeComponents, ThemeConfig, ThemeOverride } from "@hashtag-design-system/components";
import { extendTheme, ThemeComponents, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

import Button from "./Button";

const CSS_VAR_PREFIX = "hashtag";

const config: ThemeConfig = {
  disableTransitionOnChange: true,
  cssVarPrefix: CSS_VAR_PREFIX,
  initialColorMode: "system",
  
  // * Note: When using system as initial color mode, the theme will change with the system preference. However, if another theme is manually selected by the user then that theme will be used on the next page load. To reset it to system preference, simply remove the chakra-ui-color-mode entry from localStorage.
  // https://chakra-ui.com/docs/styled-system/color-mode#setup
  useSystemColorMode: true,
};

const components: ThemeComponents = {
  Button,
};

const commonSpacesAndSizes: ThemeOverride["sizes"] = {
  container: {
    px: "2rem",
    overflow: {
      width: `calc((100vw - var(--${CSS_VAR_PREFIX}-sizes-container-xl)) / 2)`,
      withScrollbar: `calc((var(--100vw) - var(--${CSS_VAR_PREFIX}-sizes-container-xl)) / 2)`,
      withPx: `calc((var(--100vw) - var(--${CSS_VAR_PREFIX}-sizes-container-xl)) / 2 + var(--hashtag-sizes-container-px))`,
    },
  },
  icon: {
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    default: "1rem",
  },
  navbar: {
    h: "4.25rem",
  },
};

const overrides: ThemeOverride = {
  config,
  components,
  space: commonSpacesAndSizes,
  sizes: commonSpacesAndSizes,
  zIndices: {
    least: 9,
    navbar: 40,
    md: 99,
    lg: 999,
  },
  shadows: {
    navbar: "0px 8px 24px rgb(0 2 46 / 30%)",
  },
  radii: {
    regular: "0.875rem",
    half: "0.5rem",
    loginDialog: "20px",
    sm: "0.25rem",
    base: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  },
  colors: {
    primary: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
    },
  },
};

const theme = extendTheme(overrides);

export default theme;
