import { Text } from "@chakra-ui/react";

import { LineItem } from "@commerce/types/cart";
import { useCart } from "@framework/cart";
import { Bag } from "@components/icons";
import { useUI } from "@lib/contexts";

import UserNavItem, { ItemProps } from "../UserNavItem";

const countItem = (count: number, item: LineItem) => count + item.quantity;

const BagItem = ({ hasLabel, ...props }: ItemProps): ComponentElement => {
  const { openSidebar } = useUI();

  const { data } = useCart();
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0;

  return (
    <UserNavItem
      isLink={false}
      label={hasLabel ? "Shopping cart" : undefined}
      aria-label={`Cart items: ${itemsCount}`}
      onClick={() => openSidebar({ view: "CART_VIEW" })}
      {...props}
    >
      <Bag boxSize="icon.lg" />
      {itemsCount > 0 && (
        <Text
          as="span"
          position="absolute"
          bottom={1}
          left={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minW={5}
          minH={5}
          pl={1}
          pr={1}
          border="1px solid"
          borderColor="gray.100"
          bg="black"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          borderRadius="full"
        >
          {itemsCount}
        </Text>
      )}
    </UserNavItem>
  );
};

BagItem.displayName = "UserNavBagItem";

export default BagItem;
