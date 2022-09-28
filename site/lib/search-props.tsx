import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import commerce, { getPageProps } from "@lib/api/commerce";

export async function getSearchStaticProps({ preview, ...props }: GetStaticPropsContext) {
  const { config, pageProps } = await getPageProps({ ...props, preview });

  const productsPromise = commerce.getAllProducts({ config, preview }); // ! TODO: Remove
  const { products } = await productsPromise; // ! TODO: Remove
  return {
    props: {
      pageProps,
      products, // ! TODO: Remove
    },
    revalidate: 200,
  };
}

export type SearchPropsType = InferGetStaticPropsType<typeof getSearchStaticProps>;
