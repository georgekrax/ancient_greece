import { chakra, forwardRef } from "@chakra-ui/react";
import cn from "clsx";
import NextLink from "next/link";

const ChakraNextLink = chakra(NextLink, {
  shouldForwardProp: prop => {
    return [
      "href",
      "as",
      "replace",
      "soft",
      "scroll",
      "shallow",
      "passHref",
      "prefetch",
      "locale",
      "legacyBehavior",
      "target",
      "children",
      "onMouseEnter",
      "onTouchStart",
      "onClick",
    ].includes(prop);
  },
});

export type Props = React.ComponentProps<typeof ChakraNextLink> & {
  newTab?: boolean;
};

const Link = forwardRef<Props, "a">(
  ({ href, newTab, children, ...props }, _ref): ComponentElement => {
    const className = cn("link", props.className);

    return (
      <ChakraNextLink
        href={href}
        target={newTab ? "_blank" : undefined}
        {...props}
        className={className}
        ref={_ref}
      >
        {children}
      </ChakraNextLink>
    );
  }
);

export default Link;
