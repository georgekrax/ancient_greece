import { Box, Flex, Grid, GridItem, GridItemProps, HeadingProps, useToken } from "@chakra-ui/react";
import NextImage, { ImageProps } from "next/future/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useCSS, useDisableAnimationsWhileResizing } from "@lib/hooks";

import CarouselIndicators, { Props as CarouselIndicatorsProps } from "./CarouselIndicators";
import Image from "./Image";

const CONTENT_MT = 8;

type ImageType = Pick<Required<ImageProps>, "src" | "alt"> &
  Pick<ImageProps, "priority" | "quality"> & {
    header?: HeadingProps;
  };

export type Props = React.PropsWithChildren<{
  images: ImageType[];
  img?: GridItemProps;
  content?: GridItemProps;
  isFirstElement?: boolean;
  variant?: "simple" | "product_view";
  /**
   * in milliseconds
   */
  intervalChange?: number;
}>;

const HeroImageGrid = ({
  images,
  img,
  content,
  isFirstElement = false,
  variant = "simple",
  intervalChange,
  children,
}: Props): ComponentElement => {
  const [activePage, setActivePage] = useState(0);
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);

  const space6 = useToken("space", 6);
  const navbarH = useToken("sizes", "navbar.h");

  content = { py: space6, ...content };
  const { paddingTop: pt, paddingBottom: pb } = useCSS(content);

  const isProductView = variant === "product_view";
  useDisableAnimationsWhileResizing();

  const goToPage: CarouselIndicatorsProps["onClick"] = useCallback(
    ({ newPage: _newPage, newDirection = 0 }) => {
      let newPage: number;
      if (_newPage != null) newPage = _newPage;
      else newPage = activePage + newDirection;

      if (newPage < 0) newPage = 0;
      else if (newPage >= images.length) newPage = 0;

      setActivePage(newPage);
      if (!thumbnailsContainerRef.current) return;

      const nextActiveEl = document.getElementById(`thumb-${newPage}`);
      if (!nextActiveEl) return;

      const { offsetLeft } = nextActiveEl;
      thumbnailsContainerRef.current.scrollTo({
        left: offsetLeft - nextActiveEl.clientWidth * 0.8,
        behavior: "smooth",
      });
    },
    [activePage, images.length]
  );

  useEffect(() => {
    let pageInterval: NodeJS.Timer | undefined;
    if (intervalChange)
      pageInterval = setInterval(() => goToPage({ newDirection: 1 }), intervalChange);

    return () => {
      if (intervalChange && pageInterval) clearInterval(pageInterval);
    };
  }, [intervalChange, goToPage]);

  // const [_, hasArrived] = useScrollArrived({ offset: (contentSize?.height || 0) * 0.9 });
  // const navbarRootProps: React.ComponentProps<typeof Navbar>["root"] = useMemo(() => {
  //   return {
  //     position: "fixed",
  //     mx: "auto",
  //     style: { width: hasArrived ? "100%" : contentSize?.width || 0 },
  //     className: cx(s.navbarRoot, hasArrived && s.hasArrived),
  //   };
  // }, [hasArrived, contentSize?.width]);

  return (
    <>
      {/* {layout?.navbar && <Navbar root={navbarRootProps} />} */}
      <Grid
        gap={{ base: 12, md: 4 }}
        templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
        h={{ md: `calc(100vh - ${isFirstElement ? navbarH : "0px"})` }}
        position="relative"
        mt={{ base: -3, md: 0 }}
      >
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left="-container.px"
          h="100%"
          w={{ base: 0, md: 12 }}
          zIndex="least"
          bgGradient="linear(to-r, gray.50, transparent)"
        />
        {/* Images */}
        <GridItem
          as={Flex}
          flexDir="column"
          gap={isProductView ? 3 : 0}
          position="relative"
          minH={{ base: "75vh ", md: undefined }}
          ml="-container.px"
          mr={{ base: "-container.px", md: 0 }}
          gridColumn={{ base: "span 2", md: "span 6", lg: "span 7" }}
          overflow="hidden"
          borderTopRightRadius={0}
          borderBottomRightRadius={{ base: 0, md: isProductView ? 0 : 32 }}
          {...img}
        >
          <Box
            position="relative"
            flex={1}
            overflow="inherit"
            borderTopRightRadius="inherit"
            borderBottomRightRadius={{ base: 0, md: isProductView ? 32 : "inherit" }}
          >
            {images.map((img, idx) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image key={idx} img={img} idx={idx} activePage={activePage} />
            ))}
            <CarouselIndicators
              variant={variant}
              imgsLength={images.length}
              activePage={activePage}
              onClick={goToPage}
            />
          </Box>
          {isProductView && (
            <Flex
              ref={thumbnailsContainerRef}
              gap={2}
              h={{ base: 32, md: 48 }}
              overflowX="auto"
              overflowY="visible"
              {...(activePage !== 0 && {
                ml: -2.5,
              })}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {images.map(({ src, alt }, idx) => (
                <Box
                  key={idx}
                  id={`thumb-${idx}`}
                  position="relative"
                  boxSize="100%"
                  flex="1 0 auto"
                  cursor="pointer"
                  w={{ base: "calc(100% / 3)", lg: 60 }}
                  minW={{ base: "calc(100% / 3)", md: 32 }}
                  overflow="hidden"
                  borderRadius="regular"
                  borderLeftRadius={idx === 0 ? 0 : undefined}
                  _hover={{ transform: "scale(1)" }}
                  {...(activePage !== idx && {
                    transform: "scale(0.92)",
                  })}
                  transitionDuration="faster"
                  transitionProperty="common"
                  transitionTimingFunction="ease-out"
                  onClick={() => goToPage({ newPage: idx })}
                >
                  <NextImage
                    src={src}
                    alt={alt}
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Flex>
          )}
          {img?.children}
        </GridItem>
        {/* Content sidebar */}
        <GridItem
          px={{ base: 0, md: 6 }}
          flexDir="column"
          gridColumn={{ base: "span 2", md: "span 6", lg: "span 5" }}
          display={isProductView ? "flex" : "block"}
          {...content}
          pt={{
            base: 0,
            md: isFirstElement ? `calc(${pt} + ${navbarH} - ${CONTENT_MT / 4}rem)` : pt,
          }}
          pb={{ base: 0, md: pb }}
        >
          {children}
        </GridItem>
      </Grid>
    </>
  );
};

HeroImageGrid.displayName = "HeroImageGrid";

export default HeroImageGrid;
