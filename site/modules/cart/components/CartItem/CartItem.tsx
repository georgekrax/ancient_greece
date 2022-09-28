import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/future/image";
import NextLink from "next/link";
import { memo, useEffect, useState } from "react";

import type { LineItem } from "@commerce/types/cart";
import useUpdateItem from "@framework/cart/use-update-item";
import usePrice from "@framework/product/use-price";
import { QuantityInput } from "@components/common";
import { Cross } from "@components/icons";
import Link from "@components/ui/Link";
import { useUI } from "@lib/contexts";

import Options from "./Options";
import s from "./CartItem.module.scss";

const placeholderImg = "/product-img-placeholder.svg";

export type Props = {
  variant?: "default" | "display" | "bordered";
  item: LineItem;
  currencyCode: string;
};

const CartItem = ({
  item,
  variant = "default",
  currencyCode,
  ...rest
}: Props): ComponentElement => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const updateItem = useUpdateItem({ item });
  const { openModal, closeSidebarIfPresent, setItemIdToRemove } = useUI();

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  });

  const handleQuantityChange = async (newQuantity: number) => {
    setQuantity(newQuantity);
    await updateItem({ quantity: newQuantity });
  };

  const handleOnRemove = () => {
    openModal({ view: "CART_REMOVE_ITEM_VIEW", hasCloseSidebar: false });
    setItemIdToRemove(item.id);
  };

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const isDisplay = variant === "display";
  const isBordered = variant === "bordered";

  return (
    <Flex
      as="li"
      // flexDir="column"
      gap={4}
      mr={isBordered ? 0 : 2}
      mb={isBordered ? 4 : 0}
      px={isBordered ? 3 : 0}
      pt={isBordered ? 3 : 5}
      pb={!isBordered ? { base: 6, md: 8 } : undefined}
      border={isBordered ? "1px solid" : undefined}
      borderTop={!isBordered ? "1px solid" : undefined}
      borderColor="gray.300"
      borderRadius={isBordered ? "regular" : undefined}
      _first={{
        pt: 0,
        borderTop: "none",
      }}
      transitionProperty="common"
      transitionDuration="normal"
      transitionTimingFunction="ease-out"
      {...rest}
    >
      <Box
        position="relative"
        boxSize={{ base: 20, md: 24 }}
        bg="primary.400"
        cursor="pointer"
        overflow="hidden"
        borderRadius="regular"
        transitionProperty="common"
        transitionDuration="fast"
        transitionTimingFunction="ease-out"
        _hover={{ transform: "scale(0.9)" }}
      >
        <NextLink href={`/product${item.path}`}>
          <Image
            className={s.productImage}
            unoptimized
            width={150}
            height={150}
            src={item.variant.image?.url || placeholderImg}
            alt={item.variant.image?.altText || "Product Image"}
            onClick={() => closeSidebarIfPresent()}
          />
        </NextLink>
      </Box>
      <Flex flexDir="column" justify="space-between" gap={4} flex={1}>
        <Flex flexDir="inherit" gap={0.5}>
          <Flex justify="space-between" align="flex-start" gap={1}>
            <Link href={`/product${item.path}`} color="gray.800">
              <Text as="span" fontWeight="semibold" onClick={closeSidebarIfPresent}>
                {item.name}
              </Text>
            </Link>
            {variant !== "display" && (
              <Box cursor="pointer" onClick={handleOnRemove}>
                <Cross />
              </Box>
            )}
          </Flex>
          <Flex justify="space-between">
            <Text as="span" fontSize="sm" color="gray.700">
              {price}
            </Text>
          </Flex>
        </Flex>
        {isDisplay ? (
          <Text as="span" align="right" fontSize="sm" letterSpacing="wide">
            <Text as="strong" fontWeight="semibold">
              {quantity}
            </Text>
            x
          </Text>
        ) : (
          <Flex
            justify="space-between"
            align="flex-end"
            gap={4}
            mt={{ base: 2, md: 0 }}
          >
            <Options item={item} />
            <QuantityInput
              variant="cart_item"
              container={{ maxW: 32 }}
              onChange={async newVal => await handleQuantityChange(+newVal)}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(CartItem);
