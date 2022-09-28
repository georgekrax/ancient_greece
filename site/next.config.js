const path = require("path");
const commerce = require("./commerce.config.json");
const { withCommerceConfig, getProviderName } = require("./commerce-config");

const provider = commerce.provider || getProviderName();
const isBC = provider === "@vercel/commerce-bigcommerce";

/** @type {import("next").NextConfig} */
module.exports = withCommerceConfig({
  commerce,
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["images.unsplash.com", "cdn.plaisio.gr"],
  },
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    outputStyle: "compressed",
    precision: 3,
    prependData: '@use "main.scss" as *;',
  },
  rewrites() {
    return [
      isBC && {
        source: "/checkout",
        destination: "/api/checkout",
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
        source: "/logout",
        destination: "/api/logout?redirect_to=/",
      },
    ].filter(Boolean);
  },
});

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log("next.config.js", JSON.stringify(module.exports, null, 2));
