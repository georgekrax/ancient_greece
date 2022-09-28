import { Accordion, Button, Flex } from "@chakra-ui/react";
import { useFilters } from "@lib/hooks";

import { SidebarLayout } from "@modules/layout/components";

import Color from "./Color";
import Price from "./Price";
import Size from "./Size";

const FiltersSidebarView = (): ComponentElement => {
  const { resetFilters } = useFilters();

  return (
    <SidebarLayout
      overflow="auto"
      header={{
        children: (
          <Flex justify="space-between" align="center" w="100%">
            <div>Filters</div>
            <Button onClick={resetFilters}>Reset</Button>
          </Flex>
        ),
      }}
    >
      <Accordion allowMultiple defaultIndex={[]}>
        <Size />
        <Color />
        <Price />
      </Accordion>
    </SidebarLayout>
  );
};

FiltersSidebarView.displayName = "SearchFiltersSidebarView";

export default FiltersSidebarView;
