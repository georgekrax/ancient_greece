import { Box, Button, Flex, Grid, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo, useState } from "react";

import useSearch from "@framework/product/use-search";
import { useSearchCtx, useUI } from "@lib/contexts";
import { useFilters } from "@lib/hooks";
import rangeMap from "@lib/range-map";
import { useSearchMeta } from "@lib/search";
import type { SearchPropsType } from "@lib/search-props";
import ProductCard from "@modules/product/components/ProductCard";

import SearchBox from "../Box";
import Sort from "../Sort";
import Status from "../Status";

export type HANDLE_CLICK_TYPE = (e: React.MouseEvent<HTMLAnchorElement>, filter: string) => void;

const SearchView = ({ pageProps: { categories } }: SearchPropsType): ComponentElement => {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;

  const [filters, setFilters] = useState({});
  const { filters: _filters } = useFilters();

  const { sidebarView, displaySidebar, openSidebar } = useUI();
  const { pureProducts, setPureProducts } = useSearchCtx();

  const { pathname, category } = useSearchMeta(asPath);
  const activeCategory = categories.find((cat: any) => cat.slug === category);

  const searchOptions = useMemo(
    () => ({
      search: typeof q === "string" ? q : "",
      categoryId: activeCategory?.id,
      sort: typeof sort === "string" ? sort : "",
      locale,
      filters,
    }),
    // eslint-disable-next-line
    [q, activeCategory?.id, sort, filters, locale]
  );

  const { data } = useSearch(searchOptions);
  console.log(data);

  useEffect(() => {
    if (data) setPureProducts(data.pureProducts);
    // eslint-disable-next-line
  }, [data?.pureProducts.length, setPureProducts]);

  useEffect(() => {
    if (!(sidebarView === "FILTERS_VIEW" && displaySidebar)) {
      setFilters(_filters);
    }
  }, [sidebarView, displaySidebar, _filters]);

  return (
    <Box mt={6} mb={20}>
      {/* Searchbox and status */}
      <Flex flexDir="column" align="center">
        <SearchBox w={{ base: "100%", md: "50%" }} />
        <Box minH={6} mt={4}>
          {(q || activeCategory) && <Status data={data} />}
        </Box>
      </Flex>
      {/* Sort and filters */}
      {data?.found !== false && (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
          gap={12}
          mt={10}
        >
          <Sort pathname={pathname} data={data} />
          <Button
            colorScheme="primary"
            size="sm"
            height="auto"
            px={8}
            py={3}
            isDisabled={!data?.found}
            alignSelf={{ base: "flex-end", md: "flex-start" }}
            onClick={() => openSidebar({ view: "FILTERS_VIEW" })}
          >
            Filters
          </Button>
        </Flex>
      )}
      {/* Products */}
      <Grid
        gap={{ base: 8, xl: 10 }}
        mt={10}
        templateColumns={{
          base: "repeat(1, minmax(0, 1fr))",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
          // xl: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {data ? (
          <>
            {data.products.map((product, i) => (
              <ProductCard
                key={product.path}
                product={product}
                imgProps={{ width: 480, height: 480, priority: i <= 3 }}
              />
            ))}
          </>
        ) : (
          <>
            {rangeMap(12, i => (
              <Skeleton
                key={i}
                borderRadius="regular"
                // sx={{ animationDelay: i * 300 + "ms" }}
              >
                <Box w={60} h={80} />
              </Skeleton>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default memo(SearchView);
