import { getProjectById } from "@/actions/project.action";
import { UpdateProjectForm } from "./UpdateProjectForm";

const UpdateProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <UpdateProjectForm project={project} />
    </div>
  );
};
export default UpdateProjectPage;
