import { Button, Flex } from "@chakra-ui/react";

import Motion from "@components/common/Motion";
import { ArrowLeft, ArrowRight } from "@components/icons";

import { Props as HeroImageGridProps } from "..";
import type { ImageProps } from "../Image";
import { IMAGE_PX, IMAGE_PY } from "../Image";

const CAROUSEL_INDICATOR_SIZE = {
  normal: 14,
  hover: 14 * 2,
  expanded: 14 * 3,
};

const variants = {
  expanded: (isSelected: boolean) => ({
    width: isSelected ? CAROUSEL_INDICATOR_SIZE.expanded : CAROUSEL_INDICATOR_SIZE.normal,
  }),
  onHover: (isSelected: boolean) => ({
    width: isSelected ? CAROUSEL_INDICATOR_SIZE.expanded : CAROUSEL_INDICATOR_SIZE.hover,
  }),
};

type OnClickParams =
  | { newPage: number; newDirection?: never }
  | { newDirection: number; newPage?: never };

export type Props = Pick<HeroImageGridProps, "variant"> &
  Pick<ImageProps, "activePage"> & {
    imgsLength: number;
    onClick: (params: OnClickParams) => void;
  };

const CarouselIndicators = ({
  activePage,
  imgsLength,
  variant,
  onClick,
}: Props): ComponentElement => {
  const isProductView = variant === "product_view";

  return (
    <Flex
      align="center"
      gap={isProductView ? 0 : 3.5}
      position="absolute"
      bottom={IMAGE_PY}
      right={IMAGE_PX}
      zIndex="md"
    >
      {isProductView ? (
        <>
          {[0, 1].map(idx => {
            const isPrevious = idx === 0;
            const isDisabled =
              (isPrevious && activePage === 0) || (!isPrevious && activePage === imgsLength - 1);
            return (
              <Button
                key={idx}
                px={6}
                color="white"
                bg="transparent"
                borderRadius="sm"
                border="1px solid"
                borderColor="gray.50"
                isDisabled={isDisabled}
                {...{ [`border${isPrevious ? "Right" : "Left"}Radius`]: 0 }}
                _hover={{ bg: "blackAlpha.500" }}
                _active={{}} // Leave it as empty object {}
                onClick={() => onClick({ newDirection: isPrevious ? -1 : 1 })}
              >
                {isPrevious ? <ArrowLeft /> : <ArrowRight />}
              </Button>
            );
          })}
        </>
      ) : (
        <>
          {[...Array(imgsLength).keys()].map(idx => (
            <Motion.Box
              key={idx}
              height={CAROUSEL_INDICATOR_SIZE.normal + "px"}
              bg="white"
              cursor="pointer"
              borderRadius="full"
              initial={false}
              animate="expanded"
              whileHover="onHover"
              variants={variants}
              custom={idx === activePage}
              transition={{ duration: 0.4 }}
              onClick={() => onClick({ newPage: idx })}
            />
          ))}
        </>
      )}
    </Flex>
  );
};

CarouselIndicators.displayName = "HeroImageGridCarouselIndicators";

export default CarouselIndicators;
