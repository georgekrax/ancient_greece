import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useMemo } from "react";

import { useSearchCtx } from "@lib/contexts";
import { useFilters } from "@lib/hooks";

import FilterItem from "../FilterItem";
import s from "./Color.module.scss";

const HOVER_STYLES = { bg: "primary.200", color: "gray.700" } as const;

type Props = {};

const Color = (props: Props): ComponentElement => {
  const { pureProducts } = useSearchCtx();
  const { hasFilter, getLinkHref } = useFilters();

  const colors = useMemo(() => {
    const colors = pureProducts
      .map(({ options }) => options)
      .flat()
      .filter(({ displayName }) => displayName.toLowerCase() === "color");

    let colorVals = colors
      .map(({ values }) => values.map(({ hexColors }) => hexColors))
      .flat(2) as string[];
    colorVals = Array.from([...new Set(colorVals)]);

    return colorVals;
    // eslint-disable-next-line
  }, [pureProducts.length]);

  return colors.length < 2 ? null : (
    <FilterItem name="Colors">
      {colors.map((clr, i) => {
        const isSelected = hasFilter("color", clr);
        const filterHref = getLinkHref({ key: "color", val: clr });

        return (
          <Link key={i} href={filterHref} className={s.link}>
            <Button
              size="sm"
              display="flex"
              _notLast={{ mb: 4 }}
              px={2}
              gap={4}
              bg="gray.100"
              color="gray.700"
              {...(isSelected && HOVER_STYLES)}
              _hover={{ sm: HOVER_STYLES }}
              _active={{ bg: "primary.300" }}
            >
              <Box
                bg={clr}
                boxSize={5}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="inherit"
              />
              {clr}
            </Button>
          </Link>
        );
      })}
    </FilterItem>
  );
};

Color.displayName = "SearchFilterColor";

export default Color;
