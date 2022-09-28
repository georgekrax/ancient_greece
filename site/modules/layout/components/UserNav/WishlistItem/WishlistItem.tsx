import { Heart } from "@components/icons";

import UserNavItem, { ItemProps } from "../UserNavItem";

const WishlistItem = ({ hasLabel, ...props }: ItemProps): ComponentElement => {
  return (
    <UserNavItem
    isLink
      aria-label="Wishlist"
      label={hasLabel ? "Wishlist" : undefined}
      display={!props.atSidebarView ? { base: "none", md: "flex" } : undefined}
      {...props}
    >
      <Heart boxSize="icon.lg" />
    </UserNavItem>
  );
};

WishlistItem.displayName = "UserNavWishlistItem";

export default WishlistItem;
