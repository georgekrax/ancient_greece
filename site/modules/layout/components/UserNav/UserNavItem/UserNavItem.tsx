import {
  Flex,
  FlexProps as _FlexProps,
  Menu,
  MenuButtonProps,
  SystemStyleObject,
} from "@chakra-ui/react";
import { callAllHandlers } from "@chakra-ui/utils";
import Link from "next/link";
import React, { useMemo } from "react";

import { useUI } from "@lib/contexts";

import AccountMenuBtn from "../AccountMenuBtn";

const TRANSITION_STYLES: Pick<
  _FlexProps,
  "transitionDuration" | "transitionProperty" | "transitionTimingFunction"
> = {
  transitionDuration: "fast",
  transitionProperty: "common",
  transitionTimingFunction: "ease-in-out",
};

type FlexProps = Omit<_FlexProps, "aria-label" | "onClick"> &
  Pick<Required<_FlexProps>, "aria-label">;

type ExtraProps =
  | {
      isLink: true;
      menuBtn?: never;
      onClick?: React.MouseEventHandler<HTMLDivElement>;
    }
  | {
      isLink: false;
      menuBtn?: never;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }
  | { isLink: "isAccount"; menuBtn?: MenuButtonProps; onClick?: never };

export type Props = FlexProps &
  ExtraProps & {
    atSidebarView?: boolean;
    label?: string;
  };

export type ItemProps = Pick<Props, "atSidebarView"> & {
  hasLabel?: boolean;
};

const UserNavItem = ({
  atSidebarView,
  isLink,
  label,
  menuBtn,
  "aria-label": ariaLabel,
  onClick,
  children: _children,
  ...props
}: Props): ComponentElement => {
  const { closeSidebarIfPresent } = useUI();

  const isAccount = isLink === "isAccount";
  const ContainerComponent = isAccount ? Menu : React.Fragment;

  const children = (
    <>
      {/* {_children} */}
      {label && <span>{label}</span>}
    </>
  );

  const HOVER_STYLES: SystemStyleObject = useMemo(
    () => ({
      opacity: 0.75,
      transform: !atSidebarView ? "scale(1.1)" : undefined,
    }),
    [atSidebarView]
  );

  return (
    <ContainerComponent {...(isAccount && { placement: "bottom-end" })}>
      <Flex
        as="li"
        justify={!atSidebarView ? "center" : "flex-start"}
        align="center"
        gap={4}
        position="relative"
        minW={6}
        color="gray.700"
        outline="none"
        cursor="pointer"
        {...TRANSITION_STYLES}
        {...(atSidebarView && {
          py: 2,
          fontSize: "xl",
          fontWeight: "bold",
        })}
        {...props}
        _hover={!isAccount ? HOVER_STYLES : undefined}
        onClick={isLink === true ? callAllHandlers(closeSidebarIfPresent, onClick) : undefined}
        sx={{
          "> *": {
            display: "flex",
            alignItems: "center",
            gap: "inherit",
            color: "inherit",
          },
        }}
      >
        {isAccount ? (
          <>
            <AccountMenuBtn
              menuBtn={menuBtn}
              atSidebarView={atSidebarView}
              transitionStyles={TRANSITION_STYLES}
              hoverStyles={HOVER_STYLES}
            />
            {children}
          </>
        ) : isLink ? (
          <Link aria-label={ariaLabel} href="/wishlist">
            {children}
          </Link>
        ) : (
          <button aria-label={ariaLabel} onClick={onClick}>
            {children}
          </button>
        )}
      </Flex>
    </ContainerComponent>
  );
};

UserNavItem.displayName = "UserNavItem";

export default UserNavItem;
