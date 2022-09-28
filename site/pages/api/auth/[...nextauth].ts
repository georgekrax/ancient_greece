// import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type Header = string | number | string[] | undefined;

const concatHeader = (prev: Header, val: Header) => {
  if (!val) return prev;
  if (!prev) return val;

  if (Array.isArray(prev)) return prev.concat(String(val));

  prev = String(prev);

  if (Array.isArray(val)) return [prev].concat(val);

  return [prev, String(val)];
};

export const authOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile({ sub, email, given_name, family_name, picture }) {
        return {
          email,
          id: sub,
          firstName: given_name,
          lastName: family_name,
          image: picture,
        };
      },
    }),
  ],
  secret: process.env.SESSION_SECRET,
  // session: {
  //   maxAge: ms(process.env.SESSION_EXPIRATION) / 1000,
  // },
  cookies: {
    sessionToken: {
      name: process.env.JWT_NAME,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: true },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions(req, res));
}
