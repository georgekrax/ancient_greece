import React from "react";

import { MotionFlex, MotionFlexProps } from "@components/common/Motion";

type FlexProps = Omit<MotionFlexProps, "aria-label"> &
  Required<Pick<MotionFlexProps, "aria-label">>;

export type Props = React.PropsWithChildren<FlexProps>;

const Iconbox = ({ children, "aria-label": ariaLabel, ...props }: Props): ComponentElement => {
  return (
    <MotionFlex
      display="inline-flex"
      justify="center"
      align="center"
      p={1.5}
      bg="white"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.400"
      borderRadius="regular"
      transitionProperty="common"
      transitionDuration="normal"
      transitionTimingFunction="ease-out"
      title={ariaLabel}
      {...props}
      aria-label={ariaLabel}
      _hover={{ opacity: 0.75, ...props._hover }}
      _active={{ opacity: 0.75, bg: "gray.50", ...props._active }}
    >
      {children}
    </MotionFlex>
  );
};

Iconbox.displayName = "Iconbox";

export default Iconbox;
