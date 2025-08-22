import { UserRole } from "@prisma/client";
import { object, string, email, enum as enumz, infer as inferz } from "zod";

export const signInSchema = object({
  email: email("Correo electrónico no válido"),
  password: string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});

export const signUpSchema = object({
  name: string().min(1, "El nombre es requerido"),
  email: email("Correo electrónico no válido"),
  password: string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  role: enumz(UserRole),
});

export type SignInType = inferz<typeof signInSchema>;
export type SignUpType = inferz<typeof signUpSchema>;
