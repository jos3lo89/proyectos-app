"use client";

import { ProjectByIdType } from "@/actions/project.action";
import { Button } from "@/components/ui/button";
import { ManageProjectStatus } from "./ManageProjectStatus";
import AddProgress from "./AddProgress";
import DeleteProject from "./DeleteProject";
import Link from "next/link";
import dynamic from "next/dynamic";

const PDFDownloadButton = dynamic(
  () =>
    import("@/components/pdf/PDFDownloadButton").then(
      (mod) => mod.PDFDownloadButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button variant="outline" disabled>
        Cargando botón...
      </Button>
    ),
  }
);

interface ProjectActionsProps {
  project: ProjectByIdType;
}

export const ProjectActions = ({ project }: ProjectActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <PDFDownloadButton project={project} />

      <Button asChild variant="outline">
        <Link href={`/projects/${project.id}/update`}>Editar Proyecto</Link>
      </Button>
      <ManageProjectStatus project={project} />
      <AddProgress projectId={project.id} />
      <DeleteProject projectId={project.id} />
    </div>
  );
};
