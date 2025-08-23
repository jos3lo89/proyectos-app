"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  AddProgressType,
  ResumeFormType,
  SuspendFormType,
  updateProgressSchema,
  UpdateProgressType,
  updateProjectType,
} from "@/schemas/project.schema";
import { ProjectStatus } from "@prisma/client";

import { revalidatePath } from "next/cache";
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
export type TransformedProgress = ProjectByIdType["ProjectProgress"][number];

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        ProjectProgress: {
          orderBy: {
            progressDate: "desc",
          },
        },
      },
    });

    if (!project) {
      notFound();
    }

    return {
      ...project,
      current_progress: project.current_progress.toNumber(),
      cost_liquidation: project.cost_liquidation?.toNumber() ?? null,
      cost_supervision: project.cost_supervision?.toNumber() ?? null,
      ProjectProgress: project.ProjectProgress.map((p) => ({
        ...p,
        progress: p.progress.toNumber(),
      })),
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    notFound();
  }
};

export type ProjectByIdType = Awaited<ReturnType<typeof getProjectById>>;

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Error al eliminar el proyecto" };
  }
};

export const updateProject = async (
  projectId: string,
  data: updateProjectType
) => {
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...data,
        start_date: data.start_date ? new Date(data.start_date) : null,
        original_end_date: data.original_end_date
          ? new Date(data.original_end_date)
          : null,
      },
    });

    revalidatePath(`/projects/${projectId}`);
    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    console.log(error);

    return { error: "Error al actualizar el proyecto" };
  }
};

export const addProgress = async (projectId: string, data: AddProgressType) => {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return { error: "No autenticado" };
    }

    await prisma.projectProgress.create({
      data: {
        projectId: projectId,
        description: data.notes || null,
        userId: session.user.id,
        progress: data.progress_percentage,
        progressDate: data.progressDate
          ? new Date(data.progressDate)
          : new Date(),
      },
    });

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        current_progress: {
          increment: data.progress_percentage,
        },
      },
    });

    revalidatePath(`/projects/${projectId}`);
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Error al actualizar el proyecto" };
  }
};

export const deleteProjectProgress = async (progressId: string) => {
  try {
    const progress = await prisma.projectProgress.delete({
      where: {
        id: progressId,
      },
    });

    await prisma.project.update({
      where: {
        id: progress.projectId,
      },
      data: {
        current_progress: {
          decrement: progress.progress,
        },
      },
    });

    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.log("Error en deleteProjectProgress: ", error);
    return { error: "Error al eliminar el avance del proyecto" };
  }
};

export const updateProgress = async (
  progressId: string,
  values: UpdateProgressType
) => {
  const validation = updateProgressSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Datos inválidos." };
  }
  const { data } = validation;

  try {
    await prisma.$transaction(async (tx) => {
      const oldProgress = await tx.projectProgress.findUnique({
        where: { id: progressId },
        select: { progress: true, projectId: true },
      });

      if (!oldProgress) {
        throw new Error("No se encontró el registro de avance.");
      }

      await tx.projectProgress.update({
        where: { id: progressId },
        data: {
          progress: data.progress_percentage,
          description: data.notes,
          progressDate: new Date(data.progressDate),
        },
      });

      const difference =
        data.progress_percentage - oldProgress.progress.toNumber();

      await tx.project.update({
        where: { id: oldProgress.projectId },
        data: {
          current_progress: {
            increment: difference,
          },
        },
      });
    });

    revalidatePath(`/projects`);
    const projectId = (
      await prisma.projectProgress.findUnique({ where: { id: progressId } })
    )?.projectId;

    if (projectId) revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar el avance:", error);
    return { error: "No se pudo actualizar el avance del proyecto." };
  }
};

// Acción para SUSPENDER un proyecto
export const suspendProject = async (
  projectId: string,
  data: SuspendFormType
) => {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "suspendido",
        suspension_start_date: new Date(data.suspension_start_date),
      },
    });

    revalidatePath(`/projects/${projectId}`);
    return { success: "El proyecto ha sido suspendido." };
  } catch (error) {
    console.error("Error al suspender el proyecto:", error);
    return { error: "No se pudo suspender el proyecto." };
  }
};

// Acción para REANUDAR un proyecto
export const resumeProject = async (
  projectId: string,
  data: ResumeFormType
) => {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "ejecucion",
        suspension_end_date: new Date(data.suspension_end_date),
        rescheduled_end_date: new Date(data.rescheduled_end_date),
      },
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: "El proyecto ha sido reanudado." };
  } catch (error) {
    console.error("Error al reanudar el proyecto:", error);
    return { error: "No se pudo reanudar el proyecto." };
  }
};
