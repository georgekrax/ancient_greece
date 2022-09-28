import { Box, Flex } from "@chakra-ui/react";

import { Link, LinkProps } from "@components/ui";

export type Props = React.PropsWithChildren<{
  header: string;
  links?: (LinkProps & { name: string })[];
}>;

const InfoColumn = ({ header, links, children }: Props): ComponentElement => {
  return (
    <Box fontSize="sm" color="gray.600">
      <Box mb={3} color="gray.800" fontWeight="bold" textTransform="uppercase">
        {header}
      </Box>
      {links && links.length > 0 && (
        <Flex flexDir="column" gap={2}>
          {links?.map(({ name, ...props }, i) => (
            <Link
              key={name + "_" + i}
              prefetch={false}
              color="inherit"
              whiteSpace="nowrap"
              {...props}
            >
              {name}
            </Link>
          ))}
        </Flex>
      )}
      {children}
    </Box>
  );
};

InfoColumn.displayName = "InfoColumn";

export default InfoColumn;
