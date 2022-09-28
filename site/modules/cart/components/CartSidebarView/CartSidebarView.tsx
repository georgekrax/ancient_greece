import { Box, Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useCart } from "@framework/cart";
import usePrice from "@framework/product/use-price";
import { DoNotHave } from "@components/common";
import { Check, Cross } from "@components/icons";
import { useUI } from "@lib/contexts";
import { useScrollArrived } from "@lib/hooks";
import SidebarLayout from "@modules/layout/components/SidebarLayout";

import CartItem from "../CartItem";

const products = [
  {
    id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    name: "New Short Sleeve T-Shirt",
    vendor: "Next.js",
    quantity: 1,
    path: "/new-short-sleeve-t-shirt",
    slug: "new-short-sleeve-t-shirt",
    descriptionHtml:
      "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    images: [
      {
        url: "/assets/drop-shirt-0.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/drop-shirt-1.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/drop-shirt-2.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
    ],
    variant: {
      id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss=",
      options: [
        {
          __typename: "MultipleChoiceOption",
          id: "asd",
          displayName: "Size",
          values: [
            {
              label: "XL",
            },
          ],
        },
      ],
      price: 25,
      listPrice: 25,
      currencyCode: "USD",
      image: {
        url: "/assets/drop-shirt-0.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
    },
    options: [
      {
        id: "option-color",
        displayName: "Color",
        values: [
          {
            label: "color",
            hexColors: ["#222"],
          },
        ],
      },
      {
        id: "option-size",
        displayName: "Size",
        values: [
          {
            label: "S",
          },
          {
            label: "M",
          },
          {
            label: "L",
          },
        ],
      },
    ],
  },
  {
    id: "Z2lkOi8vc2hvcGlmeS9Qcm9ksdWN0LzU0NDczMjUwMjQ0MjA=",
    name: "Lightweight Jacket",
    vendor: "Next.js",
    path: "/lightweight-jacket",
    slug: "lightweight-jacket",

    descriptionHtml:
      "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    quantity: 1,
    images: [
      {
        url: "/assets/lightweight-jacket-0.png",
        altText: "Lightweight Jacket",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/lightweight-jacket-1.png",
        altText: "Lightweight Jacket",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/lightweight-jacket-2.png",
        altText: "Lightweight Jacket",
        width: 1000,
        height: 1000,
      },
    ],
    variant: {
      id: "Z2lkOid8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss=",
      options: [
        {
          __typename: "MultipleChoiceOption",
          id: "asd",
          displayName: "Size",
          values: [
            {
              label: "XL",
            },
          ],
        },
      ],
      price: 249.99,
      listPrice: 249.99,
      currencyCode: "USD",
      image: {
        url: "/assets/lightweight-jacket-0.png",
        altText: "Lightweight Jacket",
        width: 1000,
        height: 1000,
      },
    },
    options: [
      {
        id: "option-color",
        displayName: "Color",
        values: [
          {
            label: "color",
            hexColors: ["#222"],
          },
        ],
      },
      {
        id: "option-size",
        displayName: "Size",
        values: [
          {
            label: "S",
          },
          {
            label: "M",
          },
          {
            label: "L",
          },
        ],
      },
    ],
  },
  {
    id: "Z2lkOis8vc2hvcGlmsddeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=",
    name: "Shirt",
    vendor: "Next.js",
    path: "/shirt",
    slug: "shirt",
    quantity: 1,
    descriptionHtml:
      "<p><span>Show off your love for Next.js and Vercel with this unique,&nbsp;</span><strong>limited edition</strong><span>&nbsp;t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made!&nbsp;</span><strong>All proceeds will be donated to charity.</strong></p>",
    images: [
      {
        url: "/assets/t-shirt-0.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/t-shirt-1.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/t-shirt-2.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/t-shirt-3.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
      {
        url: "/assets/t-shirt-4.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
    ],
    variant: {
      id: "Z2lkOi8vc2hvcGlmeS9Qcms9kdWN0LzU0NDczMjUwMjQ0MjAss=",
      options: [
        {
          __typename: "MultipleChoiceOption",
          id: "asd",
          displayName: "Size",
          values: [
            {
              label: "XL",
            },
          ],
        },
      ],
      price: 25,
      listPrice: 25,

      currencyCode: "USD",
      image: {
        url: "/assets/t-shirt-0.png",
        altText: "Shirt",
        width: 1000,
        height: 1000,
      },
    },
    options: [
      {
        id: "option-color",
        displayName: "Color",
        values: [
          {
            label: "color",
            hexColors: ["#222"],
          },
        ],
      },
      {
        id: "option-size",
        displayName: "Size",
        values: [
          {
            label: "S",
          },
          {
            label: "M",
          },
          {
            label: "L",
          },
        ],
      },
    ],
  },
];

const CartSidebarView = (): ComponentElement => {
  const [offset, setOffset] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { setSidebarView } = useUI();

  const { data, isLoading, isEmpty } = useCart();
  const [_, hasArrived] = useScrollArrived({ element: contentRef.current, offset: offset - 4 });

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  );

  // ! TODO: Fix
  // const { price: total } = usePrice(
  //   data && {
  //     amount: Number(data.totalPrice),
  //     currencyCode: data.currency.code,
  //   }
  // );
  const { price: total } = usePrice({
    amount: 50,
    currencyCode: "EUR",
  });

  const goToCheckout = () => setSidebarView("CHECKOUT_VIEW");

  useEffect(() => {
    if (!contentRef.current || offset) return;
    setOffset(contentRef.current.scrollHeight - contentRef.current.offsetHeight);
    // eslint-disable-next-line
  }, []);

  const error = null;
  const success = null;

  const icon = useMemo(() => {
    if (success) return <Check />;
    else if (error) return <Cross width={24} height={24} />;
  }, [success, error]);

  const emoji = useMemo(() => {
    if (isLoading || isEmpty || error) return "😢";
    else if (success) return "🎉";
  }, [isLoading, isEmpty, error]);

  const msg = useMemo(() => {
    if (isLoading || isEmpty) return "Your shopping cart is empty";
    else if (success) return "Thank you for your order!";
    else if (error) {
      return "We couldn’t process the purchase. Please check your card information and try again.";
    }
  }, [isLoading, isEmpty, success, error]);

  return (
    <SidebarLayout
      overflow="auto"
      body={{ pb: 0, ref: contentRef }}
      header={{
        children: (
          <Text as="span" fontWeight="normal">
            <strong>My</strong> cart
          </Text>
        ),
      }}
    >
      {false && (isLoading || isEmpty || error || success) ? (
        <Flex flexDir="column" justify="center" align="center" px={4} flex={1}>
          {icon && <Box p={10}>{icon}</Box>}
          <DoNotHave emoji={emoji} msg={msg} mt={!icon ? 36 : 0}>
            {(isLoading || isEmpty) && (
              <NextLink href={{ pathname: "/search" }}>🛒 Continue searching to fill it!</NextLink>
            )}
          </DoNotHave>
        </Flex>
      ) : (
        <>
          <Box as="ul" mt={{ base: 4, sm: 0 }} py={4}>
            {/* {data!.lineItems.map((item: any) => (
                <CartItem key={item.id} item={item} currencyCode={data!.currency.code} />
              ))} */}
            {[...products, ...products].map((item: any, i) => (
              <CartItem key={i} item={item} currencyCode={item.variant.currencyCode} />
            ))}
          </Box>
          <Box
            position="sticky"
            bottom={0}
            left={0}
            right={0}
            w="100%"
            mt={8}
            px={6}
            py={6}
            pb={10}
            bg="white"
            fontSize="sm"
            flexShrink={0}
            zIndex="least"
            borderTopRadius="2xl"
            boxShadow="0 -2px 15px -3px rgba(0, 0, 0, 0.25)"
          >
            <Box
              as="ul"
              overflow="hidden"
              pb={hasArrived ? 2 : 0}
              mb={hasArrived ? 0 : -4}
              maxH={hasArrived ? 28 : 0}
              borderBottom={hasArrived ? "1px solid" : undefined}
              borderColor="gray.300"
              transitionDuration="slow"
              transitionProperty="max-height"
              transitionTimingFunction="ease-out"
            >
              {[
                { key: "Subtotal", value: subTotal },
                { key: "Taxes", value: "Calculated at checkout" },
                { key: "Shipping", value: "FREE" },
              ].map(({ key, value }, i) => {
                const isShipping = key === "Shipping";
                return (
                  <Flex as="li" key={i} justify="space-between" py={1}>
                    <span>{key}</span>
                    <Text
                      as="span"
                      {...(isShipping && { fontWeight: "bold", letterSpacing: "wide" })}
                    >
                      {value}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
            <Flex justify="space-between" align="flex-end" mb={3} py={3} fontWeight="bold">
              <span>Total</span>
              <Text as="span" fontSize="2xl" fontWeight="semibold">
                {total}
              </Text>
            </Flex>
            <Button colorScheme="primary" w="100%" fontSize="lg" onClick={goToCheckout}>
              {/* Proceed to Checkout ({total}) */}
              Checkout
            </Button>
          </Box>
        </>
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
