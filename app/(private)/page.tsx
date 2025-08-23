// app/(private)/admin/page.tsx (o tu ruta para PrivatePage)

import { getDashboardStats } from "@/actions/dashboard.action";
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart";
import { RecentProjectsList } from "@/components/dashboard/RecentProjectsList";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, LibraryBig } from "lucide-react";
import { ProjectCostChart } from "@/components/dashboard/ProjectCostChart";

const PrivatePage = async () => {
  const stats = await getDashboardStats();

  if ("error" in stats || !stats.projectsByCost) {
    return (
      <p className="text-red-500 text-center mt-10">
        {stats.error || "Faltan datos para mostrar."}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-2 md:p-2 space-y-4">
      {/* Sección de Tarjetas de Estadísticas */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Proyectos Totales"
          value={stats.projectCount}
          icon={<LibraryBig className="h-6 w-6 text-muted-foreground" />}
        />
        <StatCard
          title="Usuarios Totales"
          value={stats.userCount}
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-1">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectStatusChart data={stats.projectsByStatus} />
          </div>
          <div>
            <RecentProjectsList projects={stats.recentProjects} />
          </div>
        </div>

        <div>
          <ProjectCostChart data={stats.projectsByCost} />
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
