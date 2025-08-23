"use server";

import { signIn, signOut as authSignOut } from "@/auth";
import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { SignInType, signUpSchema, SignUpType } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";

export const signupAction = async (values: SignUpType) => {
  const { success, data } = signUpSchema.safeParse(values);

  if (!success) {
    return {
      error: "Credenciales no válidas",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      error: "El usuario ya existe.",
    };
  }

  const hashedPassword = await hashPassword(data.password);

  try {
    await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Error al crear usuario" };
  }
};

export const signinAction = async (values: SignInType) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error al iniciar sesión" };
  }
};

export const signOut = async () => {
  await authSignOut();
};
