import useSearch, { UseSearch } from "@vercel/commerce/product/use-search";
import { SWRHook } from "@vercel/commerce/utils/types";

import type { SearchProductsHook } from "../types/product";

export default useSearch as UseSearch<typeof handler>;

// export type SearchProductsInput = {
//   search?: string
//   categoryId?: number | string
//   brandId?: number
//   sort?: string
//   locale?: string
// }

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: "/api/catalog/products",
    method: "GET",
  },
  fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, "http://a");

    if (search) url.searchParams.set("search", search);
    if (Number.isInteger(Number(categoryId))) {
      url.searchParams.set("categoryId", String(categoryId));
    }
    if (Number.isInteger(brandId)) {
      url.searchParams.set("brandId", String(brandId));
    }
    if (sort) url.searchParams.set("sort", sort);

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    });
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      const res = useData({
        input: [
          ["search", input.search],
          ["categoryId", input.categoryId],
          ["brandId", input.brandId],
          ["sort", input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      });

      let filteredProducts = res.data?.products ?? [];

      const { sizes, colors, price } = input.filters || {};

      // Sizes and colors
      if ((colors && colors.length > 0) || (sizes && sizes.length > 0)) {
        filteredProducts = filteredProducts.filter(({ options }) => {
          const arr = options.filter(({ displayName, values }) => {
            if (displayName.toLowerCase() === "size") {
              if (sizes && sizes.length > 0) {
                return values.some(({ label }) => sizes.includes(label));
              }
            } else {
              if (colors && colors.length > 0) {
                return values.some(({ hexColors }) => {
                  return hexColors?.every(clr => colors.includes(clr));
                });
              }
            }

            return false;
          });
          return arr.length > 0;
        });
      }

      // Price
      if (price?.min !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price.value >= price.min!);
      }
      if (price?.max !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price.value <= price.max!);
      }

      if (res.data) {
        return {
          ...res,
          data: {
            ...res.data,
            products: filteredProducts,
          },
        };
      }

      return res;
    },
};
