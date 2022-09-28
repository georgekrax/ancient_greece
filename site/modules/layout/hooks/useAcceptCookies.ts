import { useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect } from "react";

const COOKIE_NAME = "accept_cookies";

export const useAcceptCookies = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) onOpen();
  }, [onOpen]);

  const onAcceptCookies = () => {
    Cookies.set(COOKIE_NAME, "accepted", { expires: 365 });
    onClose();
  };

  return {
    isOpen,
    hasAcceptedCookies: !isOpen,
    onClose,
    onAcceptCookies,
  };
};
