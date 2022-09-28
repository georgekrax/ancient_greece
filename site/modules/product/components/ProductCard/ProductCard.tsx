import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { callAllHandlers } from "@chakra-ui/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/future/image";
import { useState } from "react";

import type { Product } from "@commerce/types/product";
import { useAddItem, useCart, useRemoveItem } from "@framework/cart";
import usePrice from "@framework/product/use-price";
import Motion from "@components/common/Motion";
import { Plus } from "@components/icons";
import Link from "@components/ui/Link";
import { Heartbox, HeartboxProps } from "@modules/wishlist";

const ICON_SIZE = 4;
const CART_GAP = 1.5;
const CART_WIDTH = 16;
const CONTROL_PADDING = 3;
export const INFO_PADDING = 3;

export const INFO_PR = (CONTROL_PADDING * 4 * 2 + INFO_PADDING * 4 + ICON_SIZE * 4) / 16 + "rem";

const MotionPlusIcon = motion(Plus);

type TagsType = {
  // Info
  name?: boolean;
  price?: boolean;
  info?: false | FlexProps;

  // Control
  control?: boolean;
  addToCart?: false | FlexProps;
  wishlist?: false | HeartboxProps;
};

export type Props = {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "images" | "variants">;
  tags?: TagsType;
  imgProps?: Omit<Partial<ImageProps>, "src" | "placeholder" | "blurDataURL">;
  container?: React.ComponentProps<typeof Motion.Box>;
};

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard = ({ product, imgProps, tags, container }: Props): ComponentElement => {
  tags = { name: true, price: true, ...tags };
  tags = {
    ...tags,
    info: !tags.name && !tags.price ? false : tags.info,
    control: tags.wishlist !== false || tags.addToCart !== false ? true : false,
  };
  const [_isInCart, setIsInCart] = useState(false);

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });

  const { data } = useCart();
  const addItem = useAddItem();
  const removeItem = useRemoveItem();

  const cartItem = data?.lineItems.find(
    item => item =>
      item.productId === Number(product.id) && item.variantId === Number(product.variants[0].id)
  );
  const isInCart = _isInCart || !!cartItem;

  const handleCart: React.MouseEventHandler<HTMLDivElement> = async e => {
    e.preventDefault();

    if (isInCart) {
      setIsInCart(false); // ! Remove
      // await removeItem({ id: cartItem.id }); // ! Uncomment
    } else {
      setIsInCart(true); // ! Remove
      // await addItem({
      //   productId: product.id,
      //   variantId: product.variants[0],
      // }); // ! Uncomment
    }
  };

  const img = product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={product.name}
      display="flex"
      overflow="visible !important"
      _hover={{ opacity: 1 }}
    >
      <Motion.Flex
        flexDir="column"
        align="stretch"
        bg="primary.50"
        border="1px solid"
        borderColor="gray.300"
        width="100%"
        height="100%"
        overflow="hidden"
        borderRadius="xl"
        position="relative"
        initial={{ scale: 1, boxShadow: "none" }}
        whileHover={{
          scale: 1.025,
          boxShadow: "0 8px 25px -4px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        {...container}
      >
        <Image
          src={
            "https://cdn.plaisio.gr/mms/Product-Images/PlaisioGr/3/6/3/7/1/3/1/3637131.jpg" ||
            img.url || placeholderImg
          }
          alt={img.altText || "Product Image"}
          quality={85}
          width={240}
          height={240}
          {...imgProps}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            ...imgProps?.style,
          }}
        />

        {tags.info !== false && (
          <Flex
            flexDir="column"
            gap={1}
            position="relative"
            p={INFO_PADDING}
            pr={INFO_PR}
            pb={{ base: 5, md: INFO_PADDING }}
            transitionProperty="transform"
            transitionDuration="normal"
            {...tags.info}
          >
            {tags.name && (
              <Box color="gray.700" fontWeight="bold">
                {product.name.replace("New", "")}
              </Box>
            )}
            {tags.price && (
              <Text
                as={!tags.name ? "span" : "small"}
                display="block"
                color="gray.600"
                fontWeight={!tags.name ? "bold" : undefined}
                // minH={(ICON_SIZE + (CONTROL_PADDING * 4) + (INFO_GAP * 4)) / 16 + "rem"}
              >
                {price}
              </Text>
              // Bubble price
              // <Text
              //   p={INFO_PADDING}
              //   bg="gray.50"
              //   borderTopLeftRadius="xl"
              //   as={!tags.name ? "span" : "small"}
              //   display="block"
              //   color="gray.600"
              //   fontWeight={!tags.name ? "bold" : undefined}
              // >
              //   {price}
              // </Text>
            )}
          </Flex>
        )}
        {tags.control && (
          <>
            {tags.wishlist !== false && (
              <Heartbox
                position="absolute"
                top={INFO_PADDING}
                right={INFO_PADDING}
                borderRadius="full"
                {...tags.wishlist}
                productId={product.id}
                variant={product.variants[0]}
                onClick={callAllHandlers(e => e.preventDefault(), tags.wishlist?.onClick)}
              />
            )}
            {tags.addToCart !== false && (
              <Flex
                align="center"
                gap={CART_GAP}
                alignSelf={{ base: "flex-end", md: "auto" }}
                position="absolute"
                bottom={0}
                right={{
                  base: 0,
                  md: isInCart ? 0 : `calc((${CART_WIDTH / 4}rem + ${CART_GAP / 4}rem) * -1)`,
                }}
                p={CONTROL_PADDING}
                zIndex="least"
                color="white"
                bg="primary.400"
                borderTopLeftRadius="xl"
                transitionDuration="slow"
                transitionProperty="position"
                transitionTimingFunction="ease-out"
                {...tags.addToCart}
                _hover={{ right: 0, span: { opacity: 1 }, ...tags.addToCart?._hover }}
                onClick={callAllHandlers(handleCart, tags.addToCart?.onClick)}
              >
                <MotionPlusIcon boxSize={ICON_SIZE} animate={{ rotate: isInCart ? "45deg" : 0 }} />
                <Text
                  as="span"
                  fontSize="xs"
                  flexShrink={0}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  opacity={{ md: isInCart ? 1 : 0 }}
                  w={isInCart ? 12 : CART_WIDTH}
                  transitionProperty="dimensions"
                  transitionDuration="inherit"
                  transitionTimingFunction="inherit"
                >
                  {isInCart ? "Remove" : "Add to cart"}
                </Text>
              </Flex>
            )}
          </>
        )}
      </Motion.Flex>
    </Link>
  );
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
