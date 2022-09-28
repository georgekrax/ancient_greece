import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import type {
  Product,
  ProductOptionValues,
  SearchFilterKey,
  SearchProductsBody,
} from '@vercel/commerce/types/product'
import { SWRHook } from '@vercel/commerce/utils/types'

export default useSearch as UseSearch<typeof handler>

const filterOption = (
  arr: Product[],
  key: SearchFilterKey,
  filterFunc: (
    value: ProductOptionValues,
    index: number,
    array: ProductOptionValues[]
  ) => unknown
) => {
  return arr.filter(({ options }) => {
    const arr = options.filter(({ displayName, values }) => {
      const isSize = displayName.toLowerCase() === key
      const hasLabel = values.some(filterFunc)
      return isSize && hasLabel
    })
    return arr.length > 0
  })
}

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook: () => (input: SearchProductsBody) => {
    let filteredProducts = ((input as any).products ?? []) as Product[]

    const { sizes, colors, price } = input.filters || {}

    // Sizes
    if (sizes && sizes.length > 0) {
      filteredProducts = filterOption(filteredProducts, 'size', ({ label }) => {
        return sizes.includes(label)
      })
    }

    // Colors
    if (colors && colors.length > 0) {
      filteredProducts = filterOption(
        filteredProducts,
        'color',
        ({ hexColors }) => {
          return hexColors?.every((clr) => colors.includes(clr))
        }
      )
    }

    // Price
    if (price?.min !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price.value >= price.min!
      )
    }
    if (price?.max !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price.value <= price.max!
      )
    }

    return {
      data: {
        found: filteredProducts.length > 0,
        products: filteredProducts,
      },
    }
  },
}
