import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import type { Url } from "url";

import type { SearchFilterKey, SearchFilters } from "@commerce/types/product";
import { filterQuery } from "@lib/search";

const filterKeysArray = ["size", "color", "price"];

type GetLinkHrefOptions = {
  key: SearchFilterKey;
  val: string;
};

type FormatPriceOptions = { min: number; max: number } | [number, number];

type UseFiltersReturn = {
  filters: SearchFilters;
  /**
   * Get filter key from query params
   */
  getFilter: (key: SearchFilterKey) => string[];

  /**
   * Set filter key in query params
   */
  setFilter: (options: GetLinkHrefOptions) => void;

  /**
   * Returns a `boolean` wether a filter key (and value) is in the query params
   */
  hasFilter: (key: SearchFilterKey, val?: string) => boolean;

  /**
   * Remove filter key from query params
   */
  removeFilter: (key: SearchFilterKey) => void;

  /**
   * Given a price range returns a formatted `string`
   */
  formatPrice: (price: FormatPriceOptions) => string;

  /**
   * Given a formatted price `string` returns a `min` and `max` number object
   */
  parsePrice: (price: string) => SearchFilters["price"];

  /**
   * Get `href` object for `<Link />` component
   */
  getLinkHref: (options: GetLinkHrefOptions) => Partial<Url>;

  /**
   * Removes all filters and set initials values
   */
  resetFilters: () => void;
};

export const useFilters = (): UseFiltersReturn => {
  const { pathname, query, ...router } = useRouter();

  const goToUrl = (url: Partial<Url>) => {
    router.replace(url, undefined, { shallow: true });
  };

  /**
   * Add or remove filter in query params
   */
  const toggleFilter = ({ key, val: newVal }: GetLinkHrefOptions): string => {
    let val = getFilter(key);

    if (key === "price") {
      val = newVal ? [newVal] : [];
    } else {
      if (val.includes(newVal)) {
        const idx = val.indexOf(newVal);
        if (idx > -1) val.splice(idx, 1);
      } else {
        val.push(newVal);
      }
    }

    return val.join(",");
  };

  const getLinkHref: UseFiltersReturn["getLinkHref"] = ({ key, val }) => ({
    pathname,
    query: filterQuery({ ...query, [key]: toggleFilter({ key, val }) }),
  });

  const getFilter: UseFiltersReturn["getFilter"] = useCallback(
    key => {
      const filter = query[key]?.toString().split(",") ?? [];
      return filter;
    },
    [query]
  );

  const setFilter: UseFiltersReturn["setFilter"] = options => goToUrl(getLinkHref(options));

  const removeFilter: UseFiltersReturn["removeFilter"] = key => {
    goToUrl(getLinkHref({ key, val: "" }));
  };

  const hasFilter: UseFiltersReturn["hasFilter"] = (key, val) => {
    const filter = getFilter(key);
    return val ? filter.includes(val) : !!filter;
  };

  const formatPrice: UseFiltersReturn["formatPrice"] = priceRanges => {
    if (Array.isArray(priceRanges)) return priceRanges.join("-");
    else return `${priceRanges.min}-${priceRanges.max}`;
  };

  const parsePrice: UseFiltersReturn["parsePrice"] = price => {
    const arr = price.split("-");
    const min = price ? +arr[0] : undefined;
    const max = price ? +arr[1] : undefined;

    return { min, max };
  };

  const resetFilters = () => {
    const params = new URLSearchParams(query as {});
    filterKeysArray.forEach(val => params.delete(val));

    goToUrl({ pathname, query: params.toString() });
  };

  const colors: SearchFilters["colors"] = useMemo(() => getFilter("color"), [getFilter]);
  const sizes: SearchFilters["sizes"] = useMemo(() => getFilter("size"), [getFilter]);
  const price: SearchFilters["price"] = useMemo(() => {
    const { min, max } = parsePrice(getFilter("price").join(""));
    return { min, max };
  }, [getFilter]);

  const filters: SearchFilters = useMemo(
    () => ({ sizes, colors, price }),
    // eslint-disable-next-line
    [sizes.length, colors.length, price.min, price.max]
  );

  return {
    filters,
    getFilter,
    setFilter,
    hasFilter,
    removeFilter,
    resetFilters,
    getLinkHref,
    parsePrice,
    formatPrice,
  };
};
