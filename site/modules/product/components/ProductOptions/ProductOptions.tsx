import { memo } from "react";

import type { ProductOption } from "@commerce/types/product";
import { Swatch } from "@modules/product";

import { SelectedOptions } from "../..";
import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  options: ProductOption[];
  selectedOptions: SelectedOptions;
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
};

const ProductOptions = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: Props): ComponentElement => {
  return (
    <Flex gap={16} wrap="wrap">
      {options.map(opt => (
        <div className="pb-4" key={opt.displayName}>
          <Heading as="h4" fontSize="xs" color="gray.700" textTransform="uppercase">{opt.displayName}</Heading>
          <div role="listbox" className="flex flex-row py-4">
            {opt.values.map((v, i: number) => {
              const active = selectedOptions[opt.displayName.toLowerCase()];
              return (
                <Swatch
                  key={`${opt.id}-${i}`}
                  active={v.label.toLowerCase() === active}
                  variant={opt.displayName}
                  color={v.hexColors ? v.hexColors[0] : ""}
                  label={v.label}
                  onClick={() => {
                    setSelectedOptions(selectedOptions => {
                      return {
                        ...selectedOptions,
                        [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                      };
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </Flex>
  );
};

export default memo(ProductOptions);
