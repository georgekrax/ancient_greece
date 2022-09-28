import {
  Box,
  BoxProps,
  DrawerCloseButton,
  Flex,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import Image from "next/future/image";
import { useState } from "react";

import { Logo } from "@components/ui";
import { useUI } from "@lib/contexts";

const LOGIN_SHAPE: BoxProps = {
  position: "absolute",
  boxSize: 20,
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 25%)",
};

type Props = React.PropsWithChildren<{
  afterLink?: React.ReactNode;
  link?: {
    primaryText?: string;
    secondaryText?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<HTMLAnchorElement>;
  };
}>;

const variants: Variants = {
  visible: {
    x: 0,
    opacity: 1,
  },
  initial: (bool: boolean) => ({
    x: bool ? "100%" : "-100%",
    opacity: 0,
  }),
  exit: (bool: boolean) => ({
    x: !bool ? "100%" : "-100%",
    opacity: 0,
  }),
};

const DialogLayout = ({ link, afterLink, children }: Props): ComponentElement => {
  const { modalView, modalDirection } = useUI();

  return (
    <>
      <ModalHeader
        position="relative"
        minH={24}
        mb={-2}
        p={0}
        zIndex={1}
        borderBottomRightRadius="2xl"
      >
        <Box position="absolute" top={-12} left={-16}>
          <Image src="/palm_leaf.png" alt="Palm leaf" width={280} height={200} quality={85} />
        </Box>
        <Box
          bottom={-8}
          right="15%"
          bg="#ffcb10"
          borderRadius={10}
          transform="rotate(-20deg)"
          {...LOGIN_SHAPE}
        />
        <Box top={-6} right={-6} bg="#0124A1" borderRadius="50%" {...LOGIN_SHAPE} />
      </ModalHeader>
      <ModalBody
        position="relative"
        py={6}
        px={10}
        bg="white"
        zIndex="least"
        overflowY="auto"
        overflowX="hidden"
        borderTopRadius={32}
        boxShadow="-5px -5px 15px rgba(0, 0, 0, 0.15)"
      >
        <DrawerCloseButton top={4} right={6} />
        <Flex justify="center" mb={8}>
          <Logo width="3rem" height="3rem" />
        </Flex>
        <motion.div
          initial="initial"
          animate="visible"
          exit="exit"
          variants={variants}
          custom={modalDirection > 0}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
        {link && (
          <Box mt={6} textAlign="center" fontSize="sm">
            {link.secondaryText && (
              <Text as="span" color="gray.700">
                {link.secondaryText}
              </Text>
            )}
            &nbsp;
            {link.primaryText && (
              <Box
                as="a"
                cursor="pointer"
                color="gray.700"
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }}
                onClick={link.onClick}
              >
                {link.primaryText}
              </Box>
            )}
          </Box>
        )}
        {afterLink}
      </ModalBody>
    </>
  );
};

DialogLayout.displayName = "AuthDialogLayout";

export default DialogLayout;
