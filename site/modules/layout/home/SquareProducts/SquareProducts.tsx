// /* eslint-disable react-hooks/exhaustive-deps */
// import { AspectRatio, AspectRatioProps, SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { useMemo } from "react";

// import { PropsAtMotion } from "@components/common/Motion";
// import { ProductCard, ProductCardProps } from "@modules/product/components";

// const MotionAspectRatio = motion<PropsAtMotion<AspectRatioProps>>(AspectRatio);

// type ProductType = ProductCardProps["product"];

// type Props = {
//   products: [ProductType, ProductType, ProductType, ProductType];
//   container?: SimpleGridProps;
// };

// const SquareProducts = ({ products: _products, container }: Props): ComponentElement => {
//   const products = useMemo(() => {
//     return _products.map((product, i) => {
//       const isSmall = i % 3 === 0;
//       const isRight = [1, 3].includes(i);

//       const borderRadius = `borderTop${isRight ? "Right" : "Left"}Radius`;
//       const infoStyles: Required<ProductCardProps>["tags"]["info"] = {
//         bg: "primary.50",
//         [borderRadius]: "inherit",
//         className: "info",
//         pr: "calc(12px * 2 + 8px)",
//       };

//       const addToCartStyles: Required<ProductCardProps>["tags"]["addToCart"] = {
//         className: "hey",
//         visibility: "hidden",
//       };

//       return (
//         <MotionAspectRatio
//           key={i}
//           ratio={1}
//           boxSize={{ base: "100%", md: isSmall ? "80%" : "100%" }}
//           justifySelf={i === 0 ? "end" : undefined}
//           alignSelf={i === 0 ? "end" : undefined}
//         >
//           <ProductCard
//             product={product}
//             tags={{ wishlist: false, info: infoStyles, addToCart: addToCartStyles }}
//             container={{
//               bg: isSmall ? "orange.200" : "pink.200",
//               _hover: {
//                 ".info": { transform: "translateY(-100%)" },
//                 ".hey": { visibility: "visible" },
//               },
//             }}
//           />
//         </MotionAspectRatio>
//       );
//     });
//   }, [
//     _products.length,
//     _products[0].slug,
//     _products[1].slug,
//     _products[2].slug,
//     _products[3].slug,
//   ]);

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 5 }} {...container}>
//       {products}
//     </SimpleGrid>
//   );
// };

// SquareProducts.displayName = "SquareProducts";

// export default SquareProducts;

/* eslint-disable react-hooks/exhaustive-deps */
import {
  AspectRatio,
  AspectRatioProps,
  SimpleGrid,
  SimpleGridProps,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

import { PropsAtMotion } from "@components/common/Motion";
import { ProductCard, ProductCardProps } from "@modules/product/components";

const MotionAspectRatio = motion<PropsAtMotion<AspectRatioProps>>(AspectRatio);

type ProductType = ProductCardProps["product"];

type Props = {
  products: [ProductType, ProductType, ProductType, ProductType];
  container?: SimpleGridProps;
};

const SquareProducts = ({ products: _products, container }: Props): ComponentElement => {
  const isMd = useBreakpointValue({ base: false, md: true }, { fallback: "base" });

  const products = useMemo(() => {
    return _products.map((product, i) => {
      const isSmall = i % 3 === 0;
      const isRight = [1, 3].includes(i);

      const borderRadius = `borderTop${isRight ? "Right" : "Left"}Radius`;
      const infoStyles: Required<ProductCardProps>["tags"]["info"] = {
        bg: "primary.50",
        [borderRadius]: "inherit",
        className: "info",
        pr: "calc(12px * 2 + 8px)",
      };

      const addToCartStyles: Required<ProductCardProps>["tags"]["addToCart"] = {
        className: "hey",
        visibility: "hidden",
      };

      const Component = isMd ? MotionAspectRatio : React.Fragment;

      return (
        <Component
          key={i}
          {...(isMd && {
            ratio: 1,
            boxSize: { base: "100%", md: isSmall ? "80%" : "100%" },
            justifySelf: i === 0 ? "end" : undefined,
            alignSelf: i === 0 ? "end" : undefined,
          })}
        >
          <ProductCard
            product={product}
            imgProps={isMd ? undefined : { style: { height: 240 } }}
            tags={{
              wishlist: false,
              ...(isMd && { info: infoStyles, addToCart: addToCartStyles }),
            }}
            container={{
              bg: (isMd ? isSmall : i % 2 === 0) ? "orange.100" : "pink.100",
              _hover: {
                ".info": { transform: "translateY(-100%)" },
                ".hey": { visibility: "visible" },
              },
            }}
          />
        </Component>
      );
    });
  }, [
    isMd,
    _products.length,
    _products[0].slug,
    _products[1].slug,
    _products[2].slug,
    _products[3].slug,
  ]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 8, md: 5 }} {...container}>
      {products}
    </SimpleGrid>
  );
};

SquareProducts.displayName = "SquareProducts";

export default SquareProducts;
