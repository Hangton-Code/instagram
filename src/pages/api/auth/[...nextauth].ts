import { getUserByProviderId, signUp } from "@/utils/db";
import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["pkce", "state"],
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      const provider_id = account?.providerAccountId as string;

      const userData = await getUserByProviderId(provider_id);
      if (!userData) {
        const signUpResult = await signUp(provider_id, profile?.name as string);
        if (!signUpResult) return false;
      }
      return true;
    },
    async session({ token }) {
      const provider_id = token.provider_id as string;

      const userData = await getUserByProviderId(provider_id);

      return {
        user: userData,
      } as Session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider_id = account.providerAccountId;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
