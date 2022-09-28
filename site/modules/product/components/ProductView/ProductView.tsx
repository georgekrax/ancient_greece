import { Box, Flex, Heading } from "@chakra-ui/react";

import type { Product } from "@commerce/types/product";
import SEO from "@components/common/SEO";
import { Collapse } from "@components/ui";
import HeroImageGrid, { IMAGE_PX } from "@modules/layout/components/HeroImageGrid";
import { ProductCard } from "@modules/product";
import { Heartbox } from "@modules/wishlist";

import ProductSidebar from "../ProductSidebar";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1554537173-c4daede7794b",
    alt: "Hero image",
    priority: true,
  },
  {
    src: "https://cdn.plaisio.gr/mms/Product-Images/PlaisioGr/3/6/3/7/1/3/1/3637131.jpg",
    alt: "Hero image",
  },
  {
    src: "https://images.unsplash.com/photo-1574352067721-72d5913bd35c",
    alt: "Hero image",
  },
].map(img => ({ ...img, quality: 85 }));

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const ProductView = ({ product, relatedProducts }: Props): ComponentElement => {
  return (
    <>
      <HeroImageGrid
        variant="product_view"
        images={IMAGES}
        content={{ pb: 14 }}
        img={{
          minH: { base: "78vh" },
          maxH: { base: "auto", md: "calc(100vh)" },
          children: (
            <Heartbox
              productId={product.id}
              variant={product.variants[0]}
              zIndex="least"
              boxSize="icon.md"
              position="absolute"
              top={16}
              right={IMAGE_PX}
            />
          ),
        }}
      >
        <ProductSidebar key={product.id} product={product} />
      </HeroImageGrid>
      <Box mt={10}>
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the drop ends. Reminder:
          Bad Boys For Life. Shipping may take 10+ days due to COVID-19.
        </Collapse>
      </Box>
      <Box as="section" mt={24} mb={10}>
        <Heading as="h5" size="md" mb={4}>
          Related Products
        </Heading>
        <Flex
          gap={6}
          mr="-container.px"
          py={2}
          pr="container.px"
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {relatedProducts.map(p => (
            <Flex
              key={p.path}
              flex="1 0 auto"
              maxW={{ base: "68%", sm: "48%", md: "25%" }}
              className="animated fadeIn"
            >
              <ProductCard
                product={p}
                key={p.path}
                container={{ className: "animated fadeIn" }}
                imgProps={{ width: 300, height: 300 }}
              />
            </Flex>
          ))}
        </Flex>
      </Box>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: "website",
          title: product.name,
          description: product.description,
          images: product.images.map(({ url }) => ({
            url,
            width: "800",
            height: "600",

            alt: product.name,
          })),
        }}
      />
    </>
  );
};

export default ProductView;
