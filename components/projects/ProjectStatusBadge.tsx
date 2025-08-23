import { ProjectStatus } from "@prisma/client";

interface Props {
  status: ProjectStatus;
}

const statusColors: Record<ProjectStatus, string> = {
  planificado: "bg-blue-100 text-blue-800",
  ejecucion: "bg-green-100 text-green-800",
  pausado: "bg-yellow-100 text-yellow-800",
  finalizado: "bg-gray-200 text-gray-800",
  paralizado: "bg-red-100 text-red-800",
  suspendido: "bg-orange-100 text-orange-800",
  liquidado: "bg-purple-100 text-purple-800",
  proceso_de_liquidacion: "bg-indigo-100 text-indigo-800",
};

const statusLabels: Record<ProjectStatus, string> = {
  planificado: "Planificado",
  ejecucion: "En ejecución",
  pausado: "Pausado",
  finalizado: "Finalizado",
  paralizado: "Paralizado",
  suspendido: "Suspendido",
  liquidado: "Liquidado",
  proceso_de_liquidacion: "En proceso de liquidación",
};

export default function ProjectStatusBadge({ status }: Props) {
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
