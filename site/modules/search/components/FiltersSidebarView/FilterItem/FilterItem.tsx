import {
  AccordionButton,
  AccordionItem,
  AccordionPanelProps,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Transition } from "framer-motion";

const TRANSITION: Transition = {
  duration: 0.4,
};

type Props = AccordionPanelProps & {
  name: string;
};

const FilterItem = ({ name, children, ...props }: Props): ComponentElement => {
  return (
    <AccordionItem mb={2} _first={{ borderTop: "none" }} _last={{ borderBottom: "none" }}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton bg="transparent !important" px={0} py={4}>
              <Box flex="1" textAlign="left" textTransform="uppercase">
                {name}
              </Box>
              <Box
                position="relative"
                boxSize={3}
                transform={`rotate(${isExpanded ? "-90deg" : 0})`}
                transitionDuration="slower"
                transitionProperty="common"
                transitionTimingFunction="ease-in"
              >
                {[0, 1].map(i => (
                  <Box
                    key={i}
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform={`translate(-50%, -50%) ${i === 1 ? "rotate(90deg)" : ""}`}
                    w="100%"
                    h="px"
                    bg="gray.800"
                    opacity={isExpanded && i === 0 ? 0 : 1}
                    transition="inherit"
                  />
                ))}
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel
            px={0}
            pb={8}
            fontSize="sm"
            motionProps={{ transition: { enter: TRANSITION, exit: TRANSITION } }}
            {...props}
          >
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

FilterItem.displayName = "AuthFilterItem";

export default FilterItem;
