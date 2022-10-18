import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { useMemo } from "react";

import { useSearchCtx } from "@lib/contexts";
import { useFilters } from "@lib/hooks";

import FilterItem from "../FilterItem";
import s from "./Size.module.scss";

const HOVER_STYLES = { bg: "primary.500", color: "white", borderColor: "primary.500" } as const;

const SORT_WEIGHT: Record<string, number> = {
  S: 0,
  M: 1,
  L: 2,
};

type Props = {};

const Size = (props: Props): ComponentElement => {
  const { pureProducts } = useSearchCtx();
  const { hasFilter, getLinkHref } = useFilters();

  const sizes = useMemo(() => {
    const sizes = pureProducts
      .map(({ options }) => options)
      .flat()
      .filter(({ displayName }) => displayName.toLowerCase() === "size");

    let sizeVals = sizes.map(({ values }) => values.map(({ label }) => label)).flat(2);
    sizeVals = sizeVals.map(size => {
      const textBetweenParentheses = size.match(/\(([^)]+)\)/)![1];
      const [label, height] = textBetweenParentheses.split("-").map(val => val.trim());
      return label;
    });

    sizeVals = Array.from([...new Set(sizeVals)]);

    return sizeVals.sort((a, b) => SORT_WEIGHT[a] - SORT_WEIGHT[b]);
    // eslint-disable-next-line
  }, [pureProducts.length]);

  return sizes.length < 2 ? null : (
    // @ts-expect-error
    <FilterItem name="Size" as={SimpleGrid} columns={4} gap={6}>
      {sizes.map((label, i) => {
        const isSelected = hasFilter("size", label);
        console.log(isSelected);
        const filterHref = getLinkHref({ key: "size", val: label });

        return (
          <Link key={i} className={s.link} href={filterHref}>
            <Button
              variant="outline"
              colorScheme="primary"
              w="100%"
              h="auto"
              py={2}
              borderRadius="xs"
              color="gray.700"
              borderColor="gray.700"
              fontWeight="semibold"
              {...(isSelected && HOVER_STYLES)}
              _hover={{ sm: HOVER_STYLES }}
              _active={{ bg: "primary.200" }}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </FilterItem>
  );
};

Size.displayName = "SearchFilterSize";

export default Size;
