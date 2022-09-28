import type { StringValue } from "ms";

// Declarations for modules without types
export {};

declare module "next-themes";

type CommerceProviders =
  | "@vercel/commerce-local"
  | "@vercel/commerce-bigcommerce"
  | "@vercel/commerce-shopify"
  | "@vercel/commerce-swell"
  | "@vercel/commerce-saleor"
  | "@vercel/commerce-spree"
  | "@vercel/commerce-ordercloud"
  | "@vercel/commerce-vendure"
  | "@vercel/commerce-kibocommerce"
  | "@vercel/commerce-commercejs"
  | "@vercel/commerce-sfcc";

declare global {
  type ComponentElement = ReactElement | Array<ComponentElement> | string | number;

  namespace NodeJS {
    interface ProcessEnv {
      COMMERCE_PROVIDER: Extract<CommerceProviders, "@vercel/commerce-local" | "@vercel/commerce-bigcommerce">;
      BIGCOMMERCE_STOREFRONT_API_URL: string;
      BIGCOMMERCE_STOREFRONT_API_TOKEN: string;
      BIGCOMMERCE_STORE_API_URL: string;
      BIGCOMMERCE_STORE_API_TOKEN: string;
      BIGCOMMERCE_STORE_API_CLIENT_ID: string;
      BIGCOMMERCE_CHANNEL_ID: string;
      BIGCOMMERCE_STORE_URL: string;
      BIGCOMMERCE_STORE_API_STORE_HASH: string;
      BIGCOMMERCE_STORE_API_CLIENT_SECRET: string;

      STRIPE_SECRET: string;

      JWT_NAME: string;
      JWT_SECRET: string;
      SESSION_EXPIRATION: StringValue;
      // SESSION_SECRET: string;
      // ACCESS_TOKEN_SECRET: string;
      // TOKEN_AUDIENCE: string;
      // TOKEN_ISSUER: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      // FACEBOOK_CLIENT_ID: string;
      // FACEBOOK_CLIENT_SECRET: string;
      // INSTAGRAM_CLIENT_ID: string;
      // INSTAGRAM_CLIENT_SECRET: string;
    }
  }
}
