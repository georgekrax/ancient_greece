import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import usePrice from "@framework/product/use-price";
import { useSearchCtx } from "@lib/contexts";
import { useFilters } from "@lib/hooks";

import FilterItem from "../FilterItem";

type Props = {};

const Price = (props: Props): ComponentElement => {
  const [priceRange, setPriceRange] = useState([0, 0]);

  const { pureProducts } = useSearchCtx();
  const { filters, setFilter, removeFilter, formatPrice } = useFilters();

  const { min, max } = filters.price;

  const { minPrice, maxPrice, step, currencyCode } = useMemo(() => {
    const prices = pureProducts.map(({ price }) => price.value);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const dif = Math.round(maxPrice) - Math.round(minPrice);
    const numberOfZeros = dif.toString().length - 1;

    return {
      minPrice,
      maxPrice,
      step: parseInt("1".padEnd(numberOfZeros, "0")),
      currencyCode: pureProducts[0].price.currencyCode || "EUR",
    };
    // eslint-disable-next-line
  }, [pureProducts.length]);

  const { price: minPriceFormatted } = usePrice({
    amount: min || minPrice,
    currencyCode,
  });
  const { price: maxPriceFormatted } = usePrice({
    amount: max || maxPrice,
    currencyCode,
  });

  const handleChangeEnd: RangeSliderProps["onChangeEnd"] = (val: [number, number]) => {
    if (val[0] === minPrice && val[1] === maxPrice) {
      removeFilter("price");
    } else {
      setFilter({ key: "price", val: formatPrice(val) });
    }
  };

  useEffect(() => {
    if (min !== undefined && max !== undefined) setPriceRange([min, max]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (min === undefined && max === undefined) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [min, max, minPrice, maxPrice]);

  return (
    <FilterItem name="Price" as={Flex} flexDir="column">
      <Flex justify="space-between" mb={4} fontSize="xs" fontWeight="semibold">
        <Box>{minPriceFormatted}</Box>
        <Box>{maxPriceFormatted}</Box>
      </Flex>
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        step={step}
        minStepsBetweenThumbs={1}
        w="95%"
        alignSelf="center"
        colorScheme="primary"
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["Minimum price", "Maximum price"]}
        value={priceRange}
        defaultValue={[minPrice, maxPrice]}
        onChange={setPriceRange}
        onChangeEnd={handleChangeEnd}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        {[0, 1].map(i => (
          <RangeSliderThumb key={i} index={i} bg="primary.500" />
        ))}
      </RangeSlider>
    </FilterItem>
  );
};

Price.displayName = "SearchFilterPrice";

export default Price;
