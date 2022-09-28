import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle(props => {
  const { colorScheme: c } = props;

  return { _hover: { color: ["primary"].includes(c) ? "white" : undefined } };
});

const buttonTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
});

export default buttonTheme;
