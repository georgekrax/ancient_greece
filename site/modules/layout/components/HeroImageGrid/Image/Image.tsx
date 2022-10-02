import { Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextImage from "next/future/image";

import { HeroImageGridProps } from "@modules/layout/components";

export const IMAGE_PX = 12;
export const IMAGE_PY = 10;

export type Props = {
  img: HeroImageGridProps["images"][number];
  idx: number;
  activePage: number;
  isFirstElement?: { pt: number | string };
};

const Image = ({
  img: { src, alt, header, ...imgProps },
  idx,
  activePage,
  isFirstElement,
}: Props): ComponentElement => {
  return (
    <motion.div
      initial={false}
      animate={{ x: idx === activePage ? 0 : idx > activePage ? "100%" : "-100%" }}
      transition={{ x: { type: "just" } }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {header && (
        <Flex
          justify="flex-end"
          position="absolute"
          top={0}
          boxSize="100%"
          px={IMAGE_PX}
          py={IMAGE_PY}
          pt={{ base: IMAGE_PX, md: isFirstElement?.pt }}
          zIndex={5}
          textAlign="right"
          bg="blackAlpha.400"
        >
          <Heading maxW={{ base: "none", md: "75%" }} color="white" {...header}>
            {header.children}
          </Heading>
        </Flex>
      )}
      <NextImage src={src} alt={alt} priority={idx === 0} fill {...imgProps} style={{ objectFit: "cover" }} />
    </motion.div>
  );
};

Image.displayName = "HeroImageGridImage";

export default Image;
