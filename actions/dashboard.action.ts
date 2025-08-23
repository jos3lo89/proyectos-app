// app/actions/dashboard.action.ts

"use server";
import prisma from "@/lib/prisma";

// Un mapa para traducir los estados a un formato más legible
const statusTranslations: { [key: string]: string } = {
  planificado: "Planificado",
  ejecucion: "En Ejecución",
  pausado: "Pausado",
  finalizado: "Finalizado",
  paralizado: "Paralizado",
  suspendido: "Suspendido",
  liquidado: "Liquidado",
  proceso_de_liquidacion: "En Liquidación",
};

export const getDashboardStats = async () => {
  try {
    // 1. Contar total de proyectos y usuarios en paralelo
    const [projectCount, userCount] = await Promise.all([
      prisma.project.count(),
      prisma.user.count(),
    ]);

    // 2. Agrupar proyectos por estado y contarlos, ordenados de menor a mayor
    const projectsByStatusRaw = await prisma.project.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      orderBy: {
        _count: {
          status: "asc", // Ordenar de menor a mayor
        },
      },
    });

    // 3. Transformar los datos para que el gráfico los entienda mejor
    const projectsByStatus = projectsByStatusRaw.map((item) => ({
      name: statusTranslations[item.status] || item.status, // Usar traducción o el nombre original
      total: item._count.status,
    }));

    // 4. Obtener los 5 proyectos más recientes
    const recentProjects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
      },
    });

    const projectsByCostRaw = await prisma.project.findMany({
      where: {
        // Solo incluimos proyectos que tengan un costo definido
        cost_liquidation: {
          not: null,
        },
      },
      orderBy: {
        cost_liquidation: "asc", // Ordenamos de menor a mayor
      },
      select: {
        cui: true,
        cost_liquidation: true,
      },
    });

    // Transformamos los datos para el gráfico, convirtiendo Decimal a number
    const projectsByCost = projectsByCostRaw.map((item) => ({
      cui: item.cui,
      // Prisma devuelve Decimal, hay que convertirlo a número
      cost: item.cost_liquidation!.toNumber(),
    }));

    // 5. Devolver todo en un solo objeto
    return {
      projectCount,
      userCount,
      projectsByStatus,
      recentProjects,
      projectsByCost,
    };
  } catch (error) {
    console.error("Error al obtener las estadísticas del dashboard:", error);
    return { error: "No se pudieron cargar los datos del dashboard." };
  }
};

// Exportamos el tipo para usarlo en nuestros componentes
export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;
