import { MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

import useLogout from "@framework/auth/use-logout";
import { useCustomer } from "@framework/customer";
import { useUI } from "@lib/contexts";

import UserNavItem, { ItemProps } from "../UserNavItem";

const LINKS = [
  { label: "My Cart", href: "/cart" },
  { label: "My Orders", href: "/orders" },
  { label: "My Profile", href: "/profile" },
];

const AvatarItem = ({ hasLabel, ...props }: ItemProps): ComponentElement => {
  const { openModal } = useUI();

  const logout = useLogout();
  const { data: isCustomerLoggedIn } = useCustomer();

  const handleClick: React.MouseEventHandler<HTMLElement> = e => {
    if (!isCustomerLoggedIn) {
      e.preventDefault();
      openModal({ view: "LOGIN_VIEW" });
    }
  };

  return (
    <UserNavItem
      isLink="isAccount"
      aria-label="Account"
      label={hasLabel ? "Account" : undefined}
      position="relative"
      display={!props.atSidebarView ? { base: "none", md: "flex" } : undefined}
      menuBtn={{
        "aria-label": "Account menu",
        onClick: handleClick,
        sx: {
          span: {
            display: "flex",
            alignItems: "center",
            gap: isCustomerLoggedIn ? 2.5 : 0,
          },
        },
      }}
      {...props}
    >
      <MenuList minW={200}>
        {LINKS.map(({ label }, i) => (
          <MenuItem key={i}>{label}</MenuItem>
        ))}
        <MenuDivider />
        {/* <MenuItem
          color="red.400"
          fontWeight="semibold"
          _hover={{ bg: "red.400", color: "white" }}
          onClick={logout}
        >
          Log out
        </MenuItem> */}
      </MenuList>
    </UserNavItem>
  );
};

AvatarItem.displayName = "UserNavAvatarItem";

export default AvatarItem;
