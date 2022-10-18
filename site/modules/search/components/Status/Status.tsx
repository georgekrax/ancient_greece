import { Box, Fade, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { UseSearch } from "@commerce/product/use-search";

const TRANSITION: React.ComponentProps<typeof Fade>["transition"] = { enter: { duration: 0.6 } };
type hey = ReturnType<UseSearch>;

type Props = Pick<ReturnType<UseSearch>, "data">;

const Status = ({ data }: Props): ComponentElement => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Box color="gray.400" sx={{ strong: { color: "gray.800" } }}>
      {data?.found ? (
        <Fade in transition={TRANSITION}>
          <span>
            Showing {data.products.length} results{" "}
            {q && (
              <>
                for "<strong>{q}</strong>"
              </>
            )}
          </span>
        </Fade>
      ) : data?.found === false ? (
        <Fade in transition={TRANSITION}>
          <span>
            <Text as="span" mr={3}>
              😔
            </Text>
            {q ? (
              <>
                There are no products that match "<strong>{q}</strong>"
              </>
            ) : (
              <>There are no products that match your criteria</>
            )}
          </span>
        </Fade>
      ) : q ? (
        <>
          Searching for: "<strong>{q}</strong>"
        </>
      ) : (
        <>Searching...</>
      )}
    </Box>
  );
};

Status.displayName = "SearchStatus";

export default Status;
