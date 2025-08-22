import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createProjectSchema } from "@/schemas/project.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session || !session.user.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();

    const { success, data } = createProjectSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ error: "Datos invalidos" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        userId: session.user.id,
        start_date: data.start_date ? new Date(data.start_date) : null,
        original_end_date: data.original_end_date
          ? new Date(data.original_end_date)
          : null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.log("Error en /api/project/create", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Datos de proyecto duplicados" },
          { status: 400 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error al crear el proyecto" },
      { status: 500 }
    );
  }
};
