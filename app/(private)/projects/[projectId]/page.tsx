import { getProjectById } from "@/actions/project.action";

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
          {project.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Código Único de Inversión (CUI): {project.cui}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 text-sm">
          <div>
            <h3 className="font-semibold text-muted-foreground">Estado</h3>
            <p className="capitalize">{project.status}</p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">Ubicación</h3>
            <p>{project.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">
              División Funcional
            </h3>
            <p>{project.functional_division}</p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">Contratista</h3>
            <p>{project.contractor}</p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">
              Monto de Obra (S/)
            </h3>
            <p>
              {project.cost_liquidation?.toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              }) ?? "No especificado"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">
              Monto de Supervisión (S/)
            </h3>
            <p>
              {project.cost_supervision?.toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              }) ?? "No especificado"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">
              Fecha de Inicio
            </h3>
            <p>
              {project.start_date
                ? new Date(project.start_date).toLocaleDateString("es-PE")
                : "No especificado"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-muted-foreground">
              Fecha Final Original
            </h3>
            <p>
              {project.original_end_date
                ? new Date(project.original_end_date).toLocaleDateString(
                    "es-PE"
                  )
                : "No especificado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
