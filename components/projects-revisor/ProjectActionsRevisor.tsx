"use client";

import { ProjectByIdType } from "@/actions/project.action";
import { Button } from "@/components/ui/button";
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

interface ProjectActionsRevisorProps {
  project: ProjectByIdType;
}

export const ProjectActionsRevisor = ({
  project,
}: ProjectActionsRevisorProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <PDFDownloadButton project={project} />
    </div>
  );
};
