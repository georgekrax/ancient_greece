import { Box, BoxProps, Flex, Grid, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import type { Page } from "@commerce/types/page";
import { LinkProps, Logo } from "@components/ui";
import Link from "@components/ui/Link";
import getSlug from "@lib/get-slug";

import type { LayoutProps } from "../Layout";
import InfoColumn, { InfoColumnProps } from "./InfoColumn";
import SocialButton from "./SocialButton";

type Props = Pick<BoxProps, "className"> & Pick<LayoutProps["pageProps"], "pages">;

const productLinks: InfoColumnProps["links"] = [
  { name: "All products", href: "/search" },
  { name: "Shopping cart", href: "/shopping_cart" },
];

const Footer = ({ pages, className }: Props): ComponentElement => {
  const sitePages = usePages(pages);

  return (
    <Box
      as="footer"
      bg="gray.100"
      className={className}
      mt={10}
      mx={{ base: "-container.px", xl: "-container.overflow.withPx" }}
    >
      <Grid
        maxW="container.xl"
        mx="auto"
        templateColumns={{ md: "minmax(200px, 20%) auto" }}
        templateAreas={{
          base: `"main" "header" "copyright"`,
          md: `"header main" "copyright main"`,
        }}
        autoFlow="column"
        gap={8}
        p="container.px"
      >
        <Flex flexDir="column" gridArea="header" gap={3}>
          <Logo />
          <Box as="small" fontSize="sm" whiteSpace="nowrap" color="gray.700">
            Made with ❤️ in Greece
          </Box>
        </Flex>
        <Box
          as="small"
          gridArea="copyright"
          alignSelf="end"
          fontSize="sm"
          whiteSpace="nowrap"
          color="gray.600"
        >
          Copyright &#169; {dayjs().year()} #beach_bar Inc.
          <br />
          All rights Reserved.
        </Box>
        <Flex gap={12} wrap="wrap" gridArea="main" justifySelf="end" pb={12}>
          <InfoColumn header="Shop" links={[...productLinks, ...sitePages]} />
          {/* {data?.me && (
              <InfoColumn
                header="Account"
                links={[
                  { name: "Profile", opts: { href: "/account" } },
                  { name: "Favourites", opts: { href: "/account/favourites" } },
                  { name: "Reviews", opts: { href: "/account/reviews" } },
                  { name: "Billing", opts: { href: "/account/billing" } },
                  { name: "Search history", opts: { href: "/account/history" } },
                ]}
              />
            )} */}
          <InfoColumn
            header="About"
            links={[
              { name: "About #beach_bar", href: "/about/beach_bar" },
              { name: "News", href: "/about/news" },
              {
                name: "Founder's letter",
                href: "/about/what-makes-beach_bar-beach_bar",
              },
            ]}
          />
          <InfoColumn
            header="Support"
            links={[
              { name: "Our COVID-19 response", href: "/support/covid-19" },
              { name: "Help center", href: "/support/help-center" },
              { name: "Contact us", href: "/support/contact" },
            ]}
          />
          <InfoColumn header="Get in touch">
            <Box fontSize="sm" mb={10}>
              <div>Questions or feedback?</div>
              <div>We'd love to hear from you!</div>
            </Box>
            <Flex align="center" gap={4}>
              <SocialButton platform="instagram" />
              <SocialButton platform="facebook" />
            </Flex>
          </InfoColumn>
        </Flex>
      </Grid>
      <Box bg="gray.300" color="gray.700" borderTop="1px solid" borderTopColor="gray.500">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={2}
          justify="space-between"
          maxW="container.xl"
          mx="auto"
          px="container.px"
          py={2}
        >
          <small>Book with us your next visit to the beach</small>
          {/* <small>Booking.com for your next visit at the beach.</small> */}
          <Flex as="small" align="center" gap={3}>
            <Link href="/about/terms_and_conditions" color="inherit">
              Terms &amp; Conditions
            </Link>
            <Text as="span" fontSize="md">
              &bull;
            </Text>
            <Link href="/about/privacy_policy" color="inherit">
              Privacy Policy
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;

type UsePagesReturn = (Omit<Page, "url"> & Pick<LinkProps, "href">)[];

function usePages(pages?: Page[]): UsePagesReturn {
  const { locale } = useRouter();
  const sitePages: UsePagesReturn = [];

  if (pages) {
    pages.forEach(page => {
      if (!page.url) return;

      const slug = getSlug(page.url);
      if (locale && !slug.startsWith(`${locale}/`)) return;
      sitePages.push({ ...page, href: page.url });
    });
  }

  return sitePages.sort(bySortOrder);
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0);
}
