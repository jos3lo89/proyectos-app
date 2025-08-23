import { getProjects } from "@/actions/project.action";
import ProjectCardRevisor from "../components/ProjectCardRevisor";

const RevisorPage = async () => {
  const projects = await getProjects();

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-xl font-bold mb-6">Lista de Proyectos</h1>
      <ProjectCardRevisor projects={projects} />
    </div>
  );
};
export default RevisorPage;
