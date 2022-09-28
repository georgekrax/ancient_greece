import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Input,
  StyleProps,
  useNumberInput,
  UseNumberInputProps,
} from "@chakra-ui/react";

import { Minus, Plus } from "@components/icons";

const ICON_PROPS: StyleProps = {
  // boxSize: 3,
};

type Props = UseNumberInputProps & {
  container?: FlexProps;
  variant?: 'product_page' | "cart_item";
};

const QuantityInput = ({ variant = "product_page", container, ...props }: Props): ComponentElement => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
    ...props,
  });

  const BTN_PROPS: ButtonProps = {
    borderRadius: "inherit",
    colorScheme: "blackAlpha",
    size: variant === "product_page" ?"sm": "xs",
    _disabled: {
      bg: "gray.200",
    },
  };

  const input = getInputProps();
  const inc = getIncrementButtonProps(BTN_PROPS);
  const dec = getDecrementButtonProps(BTN_PROPS);

  return (
    <Flex align="center" gap={2} maxW={40} borderRadius="full" {...container}>
      <Button {...dec}>
        <Minus {...ICON_PROPS} />
      </Button>
      <Input
        textAlign="center"
        size="sm"
        borderRadius="inherit"
        borderColor="gray.400"
        {...input}
      />
      <Button {...inc}>
        <Plus {...ICON_PROPS} />
      </Button>
    </Flex>
  );
};

QuantityInput.displayName = "QuantityInput";

export default QuantityInput;
