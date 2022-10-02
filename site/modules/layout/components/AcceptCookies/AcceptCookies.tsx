import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";

import Link from "@components/ui/Link";
import { useAcceptCookies } from "@modules/layout/hooks";

const AcceptCookies = (): ComponentElement => {
  const { isOpen, onAcceptCookies, onClose } = useAcceptCookies();

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay backdropFilter="auto" backdropBlur="8px" />
      <DrawerContent
        w={{ base: "100%", lg: "80%" }}
        maxW="container.lg !important"
        mx="auto"
        borderTopRadius="3xl"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justify="space-between"
          mt={2}
          mb={{ base: 8, md: 0 }}
        >
          <div>
            <DrawerHeader pb={0}>This site uses cookies to improve your experience.</DrawerHeader>
            {/* ! updated link around "Privacy Policy" */}
            <DrawerBody pb={10}>
              By clicking, you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.
            </DrawerBody>
          </div>
          <DrawerFooter gap={6}>
            <Button colorScheme="orange" size="lg" borderRadius="full" onClick={onAcceptCookies}>
              Yes, I accept
            </Button>
            <Button variant="outline" size="lg" mr={3} borderRadius="full" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

AcceptCookies.displayName = "AcceptCookies";

export default AcceptCookies;
