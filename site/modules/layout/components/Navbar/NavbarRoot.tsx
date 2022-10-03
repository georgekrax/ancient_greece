import { Box, BoxProps } from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";
import { memo } from "react";

import { useScrollArrived } from "@lib/hooks";

import s from "./NavbarRoot.module.scss";

export type Props = BoxProps & {
  requireShadow?: boolean;
};

const NavbarRoot = ({
  boxShadow = "2xl",
  requireShadow = false,
  children,
  ...props
}: Props): ComponentElement => {
  const [_, hasArrived] = useScrollArrived({ offset: 0 });

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      h="navbar.h"
      maxW="container.xl"
      mx="-container.px"
      // mx="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      zIndex="navbar"
      borderBottomRadius="xl"
      transitionDuration="slow"
      transitionTimingFunction="ease-out"
      transitionProperty="left,right,width,box-shadow,transform"
      {...props}
      // Better use className for smoother animation experience
      className={cx(props.className, (hasArrived || requireShadow) && s.magicalShadow)}
    >
      {children}
    </Box>
  );
};

export default memo(NavbarRoot);
