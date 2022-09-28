import { GetStaticPropsContext } from "next";

import { getCommerceApi } from "@framework/api";

const commerceApi = getCommerceApi();

export default commerceApi;

export const getPageProps = async ({ locale, locales, preview }: GetStaticPropsContext) => {
  const config = { locale, locales };
  const pagesPromise = commerceApi.getAllPages({ config, preview });
  const siteInfoPromise = commerceApi.getSiteInfo({ config, preview });

  const { pages } = await pagesPromise;
  const { categories, brands } = await siteInfoPromise;
  // ! Check if `brands` necessary

  return { config, pageProps: { pages, categories, brands } };
};
