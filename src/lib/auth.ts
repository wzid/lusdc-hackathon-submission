import { getServerSession } from "next-auth/next"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db/index"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    redirect: ({ url, baseUrl }) => {
      // Handle post-login redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allow redirect to same origin
      else if (new URL(url).origin === baseUrl) return url
      // Default redirect to list page after successful login
      return `${baseUrl}/list`
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", user.email)
    },
    async signOut({ session }) {
      console.log("User signed out")
    },
  },
}

export const getServerAuthSession = () => getServerSession(authOptions)
