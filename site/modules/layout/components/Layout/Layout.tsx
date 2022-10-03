import { Box, Drawer, DrawerContent, DrawerOverlay, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { CommerceProvider } from "@framework";
import { Page } from "@commerce/types/page";
import { Category } from "@commerce/types/site";
import { LoadingDots } from "@components/ui";
import { useUI } from "@lib/contexts";
import { AuthDialog } from "@modules/auth/components";
import { CartRemoveItemView } from "@modules/cart/components";
import { CheckoutProvider } from "@modules/checkout";
import { AcceptCookies, Footer, Navbar, NavbarProps } from "@modules/layout/components";

const Loading = () => (
  <Flex justify="center" align="center" boxSize={80} p={3} textAlign="center">
    <LoadingDots />
  </Flex>
);

const dynamicProps = {
  loading: Loading,
};

const SignUpView = dynamic(() => import("@modules/auth/components/SignUpView"), {
  ...dynamicProps,
});

const ForgotPassword = dynamic(() => import("@modules/auth/components/ForgotPasswordView"), {
  ...dynamicProps,
});

const FeatureBar = dynamic(() => import("@components/common/FeatureBar"), { ...dynamicProps });

const Modal = dynamic(() => import("@chakra-ui/react").then(mod => mod.Modal), { ...dynamicProps });
const ModalOverlay = dynamic(() => import("@chakra-ui/react").then(mod => mod.ModalOverlay));

const ModalUI = (): ComponentElement => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <Modal isOpen={displayModal} onClose={closeModal}>
      <ModalOverlay />
      {modalView === "CART_REMOVE_ITEM_VIEW" ? <CartRemoveItemView /> : <AuthDialog />}
    </Modal>
  );
};

const CartSidebarView = dynamic(() => import("@modules/cart/components/CartSidebarView"), {
  ...dynamicProps,
});
const ShippingView = dynamic(() => import("@modules/checkout/components/ShippingView"), {
  ...dynamicProps,
});
const PaymentMethodView = dynamic(() => import("@modules/checkout/components/PaymentMethodView"), {
  ...dynamicProps,
});
const CheckoutSidebarView = dynamic(
  () => import("@modules/checkout/components/CheckoutSidebarView"),
  { ...dynamicProps }
);
const MenuSidebarView = dynamic(
  () => import("@modules/layout/components").then(mod => mod.MenuSidebarView),
  { ...dynamicProps }
);
const FiltersSidebarView = dynamic(
  () => import("@modules/search/components").then(mod => mod.FiltersSidebarView),
  { ...dynamicProps }
);

type SidebarUIProps = Pick<NavbarProps, "links">;

const SidebarUI = ({ links }: SidebarUIProps): ComponentElement => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();

  return (
    <Drawer placement="right" isOpen={displaySidebar} onClose={closeSidebar}>
      <DrawerOverlay backdropFilter="auto" backdropBlur="0.8px" />
      <DrawerContent maxW={{ md: "28rem", lg: "30rem" }} borderLeftRadius={{ base: 0, md: "2xl" }}>
        {sidebarView === "CART_VIEW" && <CartSidebarView />}
        {sidebarView === "SHIPPING_VIEW" && <ShippingView />}
        {sidebarView === "PAYMENT_METHOD_VIEW" && <PaymentMethodView />}
        {sidebarView === "CHECKOUT_VIEW" && <CheckoutSidebarView />}
        {sidebarView === "MOBILE_MENU_VIEW" && <MenuSidebarView links={links} />}
        {sidebarView === "FILTERS_VIEW" && <FiltersSidebarView />}
      </DrawerContent>
    </Drawer>
  );
};

export type LayoutProps = React.PropsWithChildren & {
  navbar?: false | NavbarProps;
  pageProps: {
    pages?: Page[];
    categories: Category[];
  };
};

const Layout = ({
  navbar,
  pageProps: { categories = [], ...pageProps },
  children,
}: LayoutProps): ComponentElement => {
  const { locale = "en-US" } = useRouter();
  const navBarlinks = categories.slice(0, 2).map(c => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }));

  return (
    <CommerceProvider locale={locale}>
      <ModalUI />
      <CheckoutProvider>
        <SidebarUI links={navBarlinks} />
      </CheckoutProvider>
      <Flex
        flexDir="column"
        position="relative"
        maxW="container.xl"
        minH="calc(100vh)"
        mx="auto"
        px="container.px"
      >
        {navbar !== false && (
          <Navbar {...navbar} links={[...navBarlinks, ...(navbar?.links || [])]} />
        )}
        <Box as="main" flexGrow={1}>
          {children}
        </Box>
        <Footer pages={pageProps.pages} />
        <AcceptCookies />
      </Flex>
    </CommerceProvider>
  );
};

Layout.displayName = "Layout";

export default Layout;
