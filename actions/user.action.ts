"use server";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Error al listar los usuarios:", error);
    return { error: "Error al listar los usuarios" };
  }
};

export const updateUserRole = async (userId: string, role: UserRole) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/users");

    return { success: "Rol actualizado correctamente." };
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return { error: "No se pudo actualizar el rol del usuario." };
  }
};

type UsersWithoutPassword = Awaited<ReturnType<typeof getUsers>>;
export type UserData = Extract<UsersWithoutPassword, Array<any>>[number];
