import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

import { filterQuery } from "@lib/search";
import { UseSearch } from "@commerce/product/use-search";

const SORT = {
  "trending-desc": "Trending",
  "latest-desc": "Latest arrivals",
  "price-asc": "Price: Low to high",
  "price-desc": "Price: High to low",
  "price-me": "Price: High to low",
  "price-hello": "Price: High to low",
};

type Props = Pick<NextRouter, "pathname"> & Pick<ReturnType<UseSearch>, "data">;

const Sort = ({ pathname, data }: Props): ComponentElement => {
  const router = useRouter();
  const { sort, ...query } = router.query;

  return (
    <Flex as="ul" align="center" wrap="wrap" gap={4}>
      <Box as="li" mr={2} color="gray.600" fontSize="sm" fontWeight="semibold">
        Sort
      </Box>
      {[["relevance", "Relevance"], ...Object.entries(SORT)].map(([key, label]) => {
        const isRelevance = key === "relevance";
        const isSelected = isRelevance && !sort ? true : key === sort;

        return (
          <li key={key}>
            <Link
              tabIndex={-1}
              href={{
                pathname,
                query: filterQuery({ ...query, sort: !isRelevance ? key : undefined }),
              }}
            >
              <Button
                size="sm"
                py={2.5}
                px={4}
                h="auto"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                fontWeight="normal"
                colorScheme="primary"
                _hover={{ bg: "primary.500", color: "white" }}
                {...(!isSelected && { bg: "white", color: "gray.800" })}
                isDisabled={!data?.found}
              >
                {label}
              </Button>
            </Link>
          </li>
        );
      })}
    </Flex>
  );
};

Sort.displayName = "SearchSort";

export default Sort;
