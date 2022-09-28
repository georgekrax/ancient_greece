import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import commerce, { getPageProps } from "@lib/api/commerce";
import { Layout } from "@modules/layout/components";
import { ProductView } from "@modules/product";

export async function getStaticProps({
  params,
  preview,
  ...props
}: GetStaticPropsContext<{ slug: string }>) {
  const { config, pageProps } = await getPageProps({ ...props, preview });
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  });

  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  });
  const { product } = await productPromise;
  const { products: relatedProducts } = await allProductsPromise;

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      pageProps,
      product,
      relatedProducts,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths();

  return {
    fallback: "blocking",
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`);
          });
          return arr;
        }, [])
      : products.map((product: any) => `/product${product.path}`),
  };
}

export default function Slug({
  pageProps,
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <Layout navbar={{ root: { requireShadow: true } }} pageProps={pageProps}>
      {router.isFallback ? (
        <h1>Loading</h1>
      ) : (
        <ProductView product={product} relatedProducts={relatedProducts} />
      )}
    </Layout>
  );
}
