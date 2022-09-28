import { Box as ChakraBox, BoxProps as ChakraBoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PropsAtMotion, PropsWithMotion } from "./types";

export type Props = PropsWithMotion<ChakraBoxProps, "div">;

const MotionBox = motion<PropsAtMotion<ChakraBoxProps>>(ChakraBox);

MotionBox.displayName = "MotionBox";

export default MotionBox;

// export const Box = forwardRef<HTMLDivElement, Props>(({ children, ...props }, ref) => {
//   return (
//     <MotionChakraBox {...props} ref={ref}>
//       {children}
//     </MotionChakraBox>
//   );
// });
