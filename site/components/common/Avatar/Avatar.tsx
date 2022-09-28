import { Box, BoxProps } from "@chakra-ui/react";
import { useRef } from "react";

import { useUserAvatar } from "@lib/hooks/useUserAvatar";

const Avatar = (props: BoxProps): ComponentElement => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  let { userAvatar } = useUserAvatar();

  return (
    <Box
      ref={ref}
      display="inline-block"
      boxSize={8}
      borderRadius="full"
      border="2px solid"
      borderColor="white"
      backgroundImage={userAvatar}
      transitionProperty="common"
      transitionDuration="fast"
      transitionTimingFunction="linear"
      {...props}
      _hover={{
        ...props._hover,
        borderColor: "gray.700",
      }}
      _focus={{
        ...props._focus,
        borderColor: "gray.700",
      }}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </Box>
  );
};

export default Avatar;
