import { HTMLMotionProps, MotionProps } from "framer-motion";
import { ReactHTML } from "react";

export type PropsAtMotion<P extends object = {}> = Omit<P, keyof MotionProps>;
export type PropsWithMotion<
  P extends object = {},
  Element extends keyof ReactHTML = "div"
> = PropsAtMotion<P> & HTMLMotionProps<Element>;
