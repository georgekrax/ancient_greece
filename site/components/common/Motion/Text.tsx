import { Text as ChakraText, TextProps as ChakraTextProps, forwardRef } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PropsAtMotion, PropsWithMotion } from "./types";

const MotionChakraText = motion<PropsAtMotion<ChakraTextProps>>(ChakraText);

export type Props = PropsWithMotion<ChakraTextProps, "span">;

const Text = forwardRef<Props, "span">(({ children, ...props }, ref) => {
  return (
    <MotionChakraText as="span" {...props} ref={ref}>
      {children}
    </MotionChakraText>
  );
});

Text.displayName = "MotionText";

export default Text;

