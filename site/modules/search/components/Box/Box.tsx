import { Flex, Input, useToken } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Btn from "./Btn";

export type HANDLE_SEARCH_TYPE =
  | React.MouseEvent<HTMLButtonElement>
  | React.KeyboardEventHandler<HTMLInputElement>;

type Props = React.ComponentProps<typeof Flex> & {
  size?: "sm" | "md";
};

const Box = ({ size = "md", ...props }: Props): ComponentElement => {
  const router = useRouter();
  const shadowColor = useToken("colors", "blue.200");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => inputRef.current?.focus();

  const handleSearch: HANDLE_SEARCH_TYPE = ({ type, key, currentTarget: { value: q } }) => {
    type = type.toLowerCase();
    key = key?.toLowerCase();

    if (type === "click" && inputRef.current) q = inputRef.current.value;

    if (q.replace(/ +/g, "").length === 0) {
      handleFocus();
      return;
    }

    if (type === "click" || (type === "keyup" && key === "enter")) {
      router.push({ pathname: `/search`, query: q ? { q } : {} }, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    router.prefetch("/search");
  }, [router]);

  const isMd = size === "md";

  return (
    <Flex
      px={isMd ? 2 : 4}
      py={isMd ? 1.5 : 2}
      pr={2}
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius="full"
      transitionProperty="common"
      transitionDuration="normal"
      transitionTimingFunction="ease-in"
      boxShadow="0 2px 12px 2px rgba(0, 0, 0, 0.0875)"
      {...props}
      _focusWithin={{ boxShadow: "0 2px 8px 2px " + shadowColor, ...props._focusWithin }}
    >
      <Input
        ref={inputRef}
        size={size}
        variant="outline"
        placeholder="Search"
        defaultValue={router.query.q}
        border="none"
        _focusVisible={{ boxShadow: "none" }}
        onKeyUp={handleSearch}
      />
      <Btn size={size} handleSearch={handleSearch} />
    </Flex>
  );
};

Box.displayName = "SearchBox";

export default Box;
