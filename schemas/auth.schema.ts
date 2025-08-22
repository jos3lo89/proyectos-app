import { UserRole } from "@prisma/client";
import { object, string, email, enum as enumz, infer as inferz } from "zod";

export const signInSchema = object({
  email: email(),
  password: string().min(8),
});

export const signUpSchema = object({
  name: string().min(2),
  email: email(),
  password: string().min(8),
  role: enumz(UserRole),
});

export type SignInType = inferz<typeof signInSchema>;
export type SignUpType = inferz<typeof signUpSchema>;
