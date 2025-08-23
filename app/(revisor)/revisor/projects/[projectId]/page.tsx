import { getProjectById } from "@/actions/project.action";
import ProgressHistoryRevisor from "@/components/projects-revisor/ProgressHistoryRevisor";
import { ProjectActionsRevisor } from "@/components/projects-revisor/ProjectActionsRevisor";
import DetailPorject from "@/components/projects/DetailPorject";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { MapPin } from "lucide-react";

const ProjectDetailRevisorPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <div className="space-y-4 p-8">
      <div className="text-center">
        <h3 className="text-sm font-normal lg:text-lg lg:font-semibold break-words">
          {project.name}
        </h3>

        <div className="flex items-center flex-col gap-2">
          <span className="text-sm text-muted-foreground">
            CUI: {project.cui}
          </span>
          <span className="text-sm text-muted-foreground">
            <ProjectStatusBadge status={project.status} />
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {project.location}
          </span>
        </div>
      </div>

      <ProjectActionsRevisor project={project} />

      <DetailPorject project={project} />
      <ProgressHistoryRevisor progresses={project.ProjectProgress} />
    </div>
  );
};
export default ProjectDetailRevisorPage;
