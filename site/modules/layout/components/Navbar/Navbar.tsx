import { Flex, FlexProps } from "@chakra-ui/react";

import { Logo } from "@components/ui";
import Link from "@components/ui/Link";

import UserNav from "../UserNav";
import NavbarRoot, { Props as NavbarRootProps } from "./NavbarRoot";

type Link = {
  href: string;
  label: string;
};

export type Props = FlexProps & {
  links?: Link[];
  root?: NavbarRootProps;
};

const Navbar = ({ links = [], root, ...props }: Props): ComponentElement => (
  <NavbarRoot {...root}>
    <Flex
      justify="space-between"
      align="center"
      gap={6}
      position="relative"
      height="inherit"
      px="container.px"
      {...props}
    >
      <Flex align="inherit" gap={6}>
        {/* <Link
          href="/"
          aria-label="Logo"
          borderRadius="full"
          borderWidth="1px"
          transitionDuration="faster"
          transitionTimingFunction="ease-in-out"
          _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
        >
          <Logo />
        </Link> */}
        {/* <Flex as="nav" gap={4} display={{ base: "none", md: "flex" }}>
          {[{ label: "All products", href: "/search" }].concat(links).map(({ label, href }) => (
            <Link key={href} href={href} color="gray.800">
              {label}
            </Link>
          ))}
        </Flex> */}
      </Flex>
      {/* <UserNav /> */}
    </Flex>
  </NavbarRoot>
);

export default Navbar;
