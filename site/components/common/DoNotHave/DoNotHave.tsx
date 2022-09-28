import { Box, Flex,FlexProps, Heading, Text } from "@chakra-ui/react";

type Props = FlexProps & {
  msg?: string;
  emoji?: string;
};

const DoNotHave = ({ msg, emoji, children, ...props }: Props): ComponentElement => {
  return (
    <Flex flexDir="column" justify="center" align="center" w="100%" my={16} {...props}>
      {emoji && (
        <Text as="span" mb={6} transform="scale(1.5)">
          {emoji}
        </Text>
      )}
      <Heading as="h2" size="md" textAlign="center" fontWeight="semibold">
        {msg}
      </Heading>
      <Box mt={4}>{children}</Box>
    </Flex>
  );
};

DoNotHave.displayName = "DoNotHave";

export default DoNotHave;
