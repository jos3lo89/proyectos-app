// components/dashboard/RecentProjectsList.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { DashboardStats } from "@/actions/dashboard.action";

type RecentProjectsProps = {
  // El tipo aquí es correcto, ya que puede ser un array o undefined
  projects: DashboardStats["recentProjects"];
};

export const RecentProjectsList = ({ projects }: RecentProjectsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Si no hay proyectos, muestra un mensaje amigable */}
          {!projects || projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay proyectos recientes.
            </p>
          ) : (
            // Aplicamos la solución aquí con `?.`
            projects?.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold truncate">{project.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Creado:{" "}
                    {new Date(project.createdAt).toLocaleDateString("es-PE")}
                  </p>
                </div>
                <ProjectStatusBadge status={project.status} />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
