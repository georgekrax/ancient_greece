import { Flex, Box } from "@chakra-ui/react";
// import { AllProductsGrid } from '@modules/layout/home'
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import commerce, { getPageProps } from "@lib/api/commerce";
import { HeroImageGrid, Layout } from "@modules/layout/components";
import { SquareProducts } from "@modules/layout/home";
import {SearchBox} from "@modules/search/components";

export async function getStaticProps({ preview, ...props }: GetStaticPropsContext) {
  const { config, pageProps } = await getPageProps({ ...props, preview });
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
  });

  const { products } = await productsPromise;

  return {
    props: {
      pageProps,
      products,
    },
    revalidate: 60,
  };
}

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1554537173-c4daede7794b",
    alt: "Hero image",
    header: {
      children: "Explore all the available products",
    },
  },
  {
    src: "https://cdn.plaisio.gr/mms/Product-Images/PlaisioGr/3/6/3/7/1/3/1/3637131.jpg",
    alt: "Hero image",
    header: {
      children: "Thessaloniki, SKG",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1554537173-c4daede7794b",
    alt: "Hero image",
    header: {
      children: "Athens, ATH",
    },
  },
].map(item => ({ ...item, header: { ...item.header, pt: 3 } }));

export default function Home({
  pageProps,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout pageProps={pageProps} navbar={{ root: { requireShadow: true } }}>
      <HeroImageGrid
        images={[...IMAGES, ...IMAGES.slice(0, 2)]}
        intervalChange={5000}
        content={{ pt: 16 }}
      >
        <Flex flexDir="column" justify="space-between" gap={{ base: 10, md: 4 }} h="100%">
          <SearchBox />
          <SquareProducts
            products={[products[0], products[1], products[2], products[0]]}
            container={{ w: "100%", my: "auto" }}
          />
        </Flex>
      </HeroImageGrid>
      <Box mb={8} />
      {/* <SimpleGrid
        columns={2}
        gap={8}
        my={12}
        ml="auto"
        maxWidth="70%"
        templateColumns="repeat(4, 1fr)"
      >
        <ProductCard product={products[0]} />
        <ProductCard product={products[0]} />
        <ProductCard product={products[0]} />
        <ProductCard product={products[0]} />
      </SimpleGrid> */}
      {/* <Box minH="calc(100vh)" /> */}
      {/* <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      /> */}
      {/* <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid> */}
      {/* <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </Layout>
  );
}
