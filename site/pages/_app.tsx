import "@styles/chrome-bug.css";
import "@styles/global.scss";
import "keen-slider/keen-slider.min.css";

import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import Head from "@components/common/Head";
import { ManagedUIContext, SearchProvider } from "@lib/contexts";
import { useWindowSize } from "@lib/hooks";
import { Layout } from "@modules/layout/components";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: typeof Layout;
};

const Noop = ({ children }: React.PropsWithChildren): ComponentElement => <>{children}</>;

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): ComponentElement {
  const Layout = (Component as any).Layout || Noop;

  useWindowSize();

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <>
      <Head />
      <SessionProvider session={session}>
        <ManagedUIContext>
          <SearchProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </SearchProvider>
        </ManagedUIContext>
      </SessionProvider>
    </>
  );
}
