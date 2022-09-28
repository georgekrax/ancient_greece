import { Box, Fade } from "@chakra-ui/react";
import { useRouter } from "next/router";

const TRANSITION: React.ComponentProps<typeof Fade>["transition"] = { enter: { duration: 0.6 } };

type Props = {
  data?: {
    found: boolean;
    products: any[];
  };
};

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
      ) : !data?.found ? (
        <Fade in transition={TRANSITION}>
          <span>
            {q ? (
              <>
                There are no products that match "<strong>{q}</strong>"
              </>
            ) : (
              <>There are no products that match the selected category.</>
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
