import { Button, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

import Motion from "@components/common/Motion";
import { Search } from "@components/icons";

import Box, { HANDLE_SEARCH_TYPE } from "../Box";

const MotionButton = motion(Button);

const btnVariants: Variants = {
  visible: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { bounce: 1 } },
  exit: { opacity: 0, x: 60 },
};

type Props = Pick<React.ComponentProps<typeof Box>, "size"> & {
  handleSearch: HANDLE_SEARCH_TYPE;
};

const Btn = ({ size, handleSearch }: Props): ComponentElement => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const isSm = size === "sm";

  const BTN_SIZE = {
    DEFAULT: isSm ? "2em" : "2.5em",
    ON_HOVER: "5em",
  };

  const handleHover = (timing: "start" | "end") => {
    if (!isSm) setIsBtnHovered(timing === "start");
  };

  return (
    <Flex justify="flex-end" color="white" minW={isSm ? BTN_SIZE.DEFAULT : BTN_SIZE.ON_HOVER}>
      <MotionButton
        initial={false}
        animate={{ width: isBtnHovered ? BTN_SIZE.ON_HOVER : BTN_SIZE.DEFAULT }}
        transition={{ type: "spring", bounce: 0.1, delay: !isBtnHovered ? 0.2 : 0 }}
        aria-label="Search"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        height={BTN_SIZE.DEFAULT}
        minW="auto"
        p={0}
        border="none"
        outline="none"
        overflow="hidden"
        borderRadius="full"
        bg="gray.800"
        _hover={{ bg: "gray.800" }}
        onClick={handleSearch}
        onHoverStart={() => handleHover("start")}
        onHoverEnd={() => handleHover("end")}
        onFocus={() => handleHover("start")}
        onBlur={() => handleHover("end")}
      >
        <AnimatePresence initial={false}>
          {isBtnHovered ? (
            <Motion.Flex
              key="letters"
              gap="1px"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={btnVariants}
              position="absolute"
              left="50%"
              color="white"
              fontWeight="normal"
              transform="translateY(-2px) translateX(-50%)"
            >
              {Array.from("Search").map((letter, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: "block" }}>
                  {letter}
                </motion.span>
              ))}
            </Motion.Flex>
          ) : (
            <motion.div
              key="icon"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3, stiffness: 50 } }}
              exit={{ x: -60, opacity: 0, transition: { duration: 0.4 } }}
            >
              <Search width={isSm ? "1em" : "1.25em"} height={isSm ? "1em" : "1.25em"} />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionButton>
    </Flex>
  );
};

Btn.displayName = "SearchBoxBtn";

export default Btn;
