// En la página o componente donde quieres mostrar el botón
import { ProjectByIdType } from "@/actions/project.action";
import { ResumeModal } from "./ResumeModal";
import { SuspendModal } from "./SuspendModal";

interface ManageProjectStatusProps {
  project: ProjectByIdType;
}

export const ManageProjectStatus = ({ project }: ManageProjectStatusProps) => {
  return (
    <div>
      {project.status === "suspendido" ? (
        <ResumeModal project={project} />
      ) : (
        <SuspendModal project={project} />
      )}
    </div>
  );
};
