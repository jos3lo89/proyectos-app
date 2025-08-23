"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ProjectByIdType } from "@/actions/project.action";
import { ProjectPDFDocument } from "./ProjectPDFDocument";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PDFDownloadButtonProps {
  project: ProjectByIdType;
}

export const PDFDownloadButton = ({ project }: PDFDownloadButtonProps) => {
  if (!project) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando datos...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ProjectPDFDocument project={project} />}
      fileName={`Reporte_${project.cui.replace(/\s+/g, "_")}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button variant="outline" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generando PDF...
          </Button>
        ) : (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};
