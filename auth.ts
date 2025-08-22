import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/auth.schema";
import prisma from "./lib/prisma";
import { comparePassword } from "./lib/bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        const result = signInSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
