import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const res = await fetch('https://kustogram.site/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            browserName: 'string',
            deviceName: 'string',
            ip: 'string',
          }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        const user = (await res.json()) as User

        if (user) {
          return user
        }

        throw new Error('invalid credentials')
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  events: {
    signIn: ({ user, account, isNewUser, profile }) => {},
    session: ({ token }) => {},
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, user, token }) {
      session.user = token

      return session
    },
  },
}

export default NextAuth(authOptions)
