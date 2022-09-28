import { Flex, FlexProps } from "@chakra-ui/react";

import { CartItemProps } from "@modules/cart/components";

type ItemOption = {
  id: number;
  displayName: string;
  values: { label: string; hexColors?: string[] }[];
};

type Props = Pick<CartItemProps, "item"> & FlexProps;

const Options = ({ item, ...props }: Props): ComponentElement => {
  const options = item.options as ItemOption[];

  if (options.length === 0) return;

  return (
    <Flex align="center" gap={2} pb={1} {...props}>
      {options.map(({ displayName, values: [value] }) => {
        const isColor = displayName === "Color";
        const color = value.hexColors?.[0];
        const size = value.label;

        return (
          <Flex
            key={`${item.id}-${displayName}`}
            justify="center"
            align="center"
            p={1}
            fontWeight="semibold"
            color="gray.700"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="md"
            overflow="hidden"
            bg={isColor ? color : "transparent"}
            title={`${displayName}: ${isColor ? color : size}`}
            {...(isColor ? { boxSize: 5, fontSize: "xs" } : { h: 5, minW: 5, fontSize: "sm" })}
          >
            {!isColor && size}
          </Flex>
        );
      })}
    </Flex>
  );
};

Options.displayName = "CartItemOptions";

export default Options;
