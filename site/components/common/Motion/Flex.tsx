import { Flex as ChakraFlex, FlexProps as ChakraFlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PropsAtMotion, PropsWithMotion } from "./types";

export type Props = PropsWithMotion<ChakraFlexProps, "div">;

export const MotionFlex = motion<PropsAtMotion<ChakraFlexProps>>(ChakraFlex);

MotionFlex.displayName = "MotionFlex";

export default MotionFlex;