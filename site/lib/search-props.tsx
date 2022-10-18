import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import commerce, { getPageProps } from "@lib/api/commerce";

export async function getSearchStaticProps({ preview, ...props }: GetStaticPropsContext) {
  const { config, pageProps } = await getPageProps({ ...props, preview });

  return {
    props: {
      pageProps,
    },
    revalidate: 200,
  };
}

export type SearchPropsType = InferGetStaticPropsType<typeof getSearchStaticProps>;
