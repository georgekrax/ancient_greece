import { Box, BoxProps, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { useUI } from "@lib/contexts";

import BagItem from "./BagItem";
import WishlistItem from "./WishlistItem";
import AvatarItem from "./AvatarItem";

type Props = Pick<BoxProps, "className">;

const UserNav = ({ className }: Props): ComponentElement => {
  const { openSidebar } = useUI();

  return (
    <Flex align="center" position="relative" className={className}>
      <Flex as="ul" justify="flex-end" align="center" gap={6} h="100%">
        <BagItem />
        <WishlistItem />
        <AvatarItem />
        <Box as="li" display={{ base: "block", md: "none" }}>
          <Button
            variant="naked"
            display="flex"
            flexDir="column"
            alignItems="flex-end"
            justifyContent="space-between"
            w="icon.lg"
            minW="auto"
            py={3}
            px={0}
            aria-label="Menu"
            onClick={() => openSidebar({ view: "MOBILE_MENU_VIEW" })}
            _hover={{
              span: { _first: { width: "60%" }, _last: { width: "60%" } },
            }}
          >
            {[0, 1, 2].map(idx => (
              <Box
                as="span"
                key={idx}
                w="100%"
                h={0.5}
                bg="gray.700"
                borderRadius="full"
                transitionDuration="slow"
                transitionProperty="dimensions"
                transitionTimingFunction="ease-out"
              />
            ))}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserNav;
