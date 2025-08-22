"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getProjects = async () => {
  try {
    const projectsFromDb = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        cui: true,
        status: true,
        current_progress: true,
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const projects = projectsFromDb.map((project) => ({
      ...project,
      current_progress: project.current_progress.toNumber(),
    }));

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export type ProjectCardData = Awaited<ReturnType<typeof getProjects>>;

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    // Si no se encuentra el proyecto, lanzamos un error 404
    // Next.js lo capturará y mostrará la página not-found.js más cercana
    if (!project) {
      notFound();
    }

    // Transformamos los datos no serializables (Decimal) a números
    // para poder usarlos sin problemas en cualquier componente.
    return {
      ...project,
      current_progress: project.current_progress.toNumber(),
      cost_liquidation: project.cost_liquidation?.toNumber() ?? null,
      cost_supervision: project.cost_supervision?.toNumber() ?? null,
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    // Si ocurre un error inesperado, también mostramos la página de no encontrado.
    notFound();
  }
};
