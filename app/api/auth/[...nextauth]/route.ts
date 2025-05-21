import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/app/lib/supabase";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined");
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials : any) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });
                
                if (error) {
                    throw new Error(error.message);
                }

                return data.user;
            }
        }),

        // Only add GoogleProvider if the environment variables are defined
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
          ? [
              GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              }),
            ]
          : []),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
          if (user) token.user = user
          return token
        },
        async session({ session, token }) {
            if (token.user) session.user = token.user
            return session
        }
    },
});

export { handler as GET, handler as POST };





