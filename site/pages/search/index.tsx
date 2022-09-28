import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getSearchStaticProps } from "@lib/search-props";
import { Layout } from "@modules/layout/components";
import { SearchView } from "@modules/search/components";

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context);
}

export default function Search(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SearchView {...props} />;
}

Search.Layout = Layout;
