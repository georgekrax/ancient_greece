import { Button, MenuButton, MenuButtonProps, SystemStyleObject, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import { useCustomer } from "@framework/customer";
import { Avatar } from "@components/common";

import { UserNavItemProps } from "..";

type Props = Pick<UserNavItemProps, "menuBtn" | "atSidebarView"> & {
  hoverStyles: SystemStyleObject;
  transitionStyles: SystemStyleObject;
};

const AccountMenuBtn = ({
  menuBtn,
  atSidebarView,
  hoverStyles: HOVER_STYLES,
  transitionStyles: TRANSITION_STYLES,
}: Props): ComponentElement => {
  const { data: isCustomerLoggedIn } = useCustomer();

  const btnProps: MenuButtonProps = useMemo(() => {
    if (isCustomerLoggedIn) {
      return {
        as: Button,
        px: { md: 2 },
        py: { md: 1.5 },
        bg: { md: "primary.100" },
        _hover: { bg: { md: "primary.200" } },
        _active: { bg: { md: "primary.200" } },
      };
    } else {
      return {
        _hover: { span: HOVER_STYLES },
      };
    }
    // eslint-disable-next-line
  }, [isCustomerLoggedIn, HOVER_STYLES.transform]);

  return (
    <MenuButton
      {...btnProps}
      {...menuBtn}
      sx={{
        span: { ...TRANSITION_STYLES, ...(menuBtn?.sx as any)["span"] },
        "+ div": {
          right: "0px !important",
          left: "auto !important",
        },
      }}
    >
      {isCustomerLoggedIn && (
        <Text as="span" color="gray.600" display={{ base: "none", md: "block" }}>
          Hello, {isCustomerLoggedIn.firstName}!
        </Text>
      )}
      <Avatar {...(atSidebarView && { boxSize: "icon.lg" })} />
    </MenuButton>
  );
};

AccountMenuBtn.displayName = "UserNavAccountMenuBtn";

export default AccountMenuBtn;
