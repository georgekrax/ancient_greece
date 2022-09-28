import type { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getSearchStaticProps } from "@lib/search-props";
import { Layout } from "@modules/layout/components";
import { SearchView } from "@modules/search/components";

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context);
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function SearchCategory(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SearchView {...props} />;
}

SearchCategory.Layout = Layout;
