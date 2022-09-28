import { Box } from "@chakra-ui/react";
import Link from "next/link";

import { Avatar } from "@components/common";
import { useUI } from "@lib/contexts";
import { NavbarProps, SidebarLayout } from "@modules/layout/components";

import BagItem from "../BagItem";
import UserNavItem from "../UserNavItem";
import WishlistItem from "../WishlistItem";
import AvatarItem from "../AvatarItem";

type Props = Pick<NavbarProps, "links">;

export default function MenuSidebarView({ links = [] }: Props): ComponentElement {
  const { closeSidebar } = useUI();

  return (
    <SidebarLayout
      header={{}}
      body={{
        display: "flex",
        flex: 1,
        zIndex: "md",
        w: { sm: "100%" },
      }}
    >
      <Box as="nav" w="100%">
        <ul>
          {[{ label: "All", href: "/search" }, ...links].map(({ href, label }) => (
            <UserNavItem key={href} isLink aria-label="me" atSidebarView>
              <Link href={href}>{label}</Link>
            </UserNavItem>
          ))}
          {/* Divider */}
          <Box as="li" w="100%" h="1px" mt={12} mb={4} bg="gray.300" />
          <BagItem hasLabel atSidebarView />
          <WishlistItem hasLabel atSidebarView />
          <AvatarItem hasLabel atSidebarView />
        </ul>
      </Box>
    </SidebarLayout>
  );
}

MenuSidebarView;
