import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import type { Product } from "@commerce/types/product";
import { useAddItem, useCart, useRemoveItem, useUpdateItem } from "@framework/cart";
import usePrice from "@framework/product/use-price";
import { QuantityInput } from "@components/common";
import { Cross } from "@components/icons";
import { useUI } from "@lib/contexts";
import { ProductOptions } from "@modules/product";

import { getProductVariant, selectDefaultOptionFromProduct, SelectedOptions } from "../..";

type Props = {
  product: Product;
};

const ProductSidebar = ({ product }: Props): ComponentElement => {
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const { openSidebar } = useUI();

  const { data } = useCart();
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const removeItem = useRemoveItem();

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });

  const variant = getProductVariant(product, selectedOptions);

  const cartItem = data?.lineItems.find(
    item => item =>
      item.productId === Number(product.id) &&
      item.variantId === Number(variant?.id || product.variants[0].id)
  );

  const handleCart = async () => {
    setIsLoading(true);
    try {
      if (cartItem) {
        await removeItem({ id: cartItem.id });
        //Remove
      } else {
        await addItem({
          quantity,
          productId: String(product.id),
          variantId: String(variant ? variant.id : product.variants[0].id),
        });

        openSidebar({ view: "CART_VIEW" });
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  return (
    <>
      <Flex flexDir="column" gap={2} mb={12}>
        <Heading as="h2" size="md" color="gray.700">
          {product.name}
        </Heading>
        <Text as="span" color="gray.500" fontSize="sm">
          {price}&nbsp;{product.price?.currencyCode}
        </Text>
      </Flex>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Box
        my={6}
        pb={4}
        overflowWrap="break-word"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
      />
      {/* <Flex justify="space-between" align="center">
        <Rating value={4} />
        <Box pr={1} color="gray.500" fontSize="sm" fontWeight="semibold">
          36 reviews
        </Box>
      </Flex> */}
      <Flex gap={{ base: 10, sm: 12 }} mt="auto">
        <QuantityInput onChange={newVal => setQuantity(+newVal)} />
        <Button
          aria-label="Add to Cart"
          colorScheme="primary"
          onClick={handleCart}
          // isLoading={isLoading}
          isDisabled={variant?.availableForSale === false}
          px={8}
          py={4}
          h="auto"
          alignItems="center"
          gap={2}
          flexShrink={0}
        >
          {variant?.availableForSale === false ? (
            "Not Available"
          ) : !!cartItem ? (
            <>
              <Cross boxSize="icon.sm" />
              Remove
            </>
          ) : (
            // <>
            //   <Check />
            //   In cart
            // </>
            "Add To Cart"
          )}
        </Button>
      </Flex>
    </>
  );
};

export default ProductSidebar;
