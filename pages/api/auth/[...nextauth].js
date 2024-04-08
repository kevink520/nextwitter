import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from 'lib/prisma'

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],

  // database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    // jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },

  debug: true,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      return true
    },
    async session ({ session, token, user }) {
      session.user.id = user.id
      session.user.username = user.username
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request'
  }
})
