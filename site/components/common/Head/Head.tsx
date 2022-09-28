import SEO from "@components/common/SEO";

const Head = (): ComponentElement => {
  return (
    <SEO>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
    </SEO>
  );
};

export default Head;
