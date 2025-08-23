"use client";
import { ProjectByIdType } from "@/actions/project.action";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency, formatDate } from "@/helpers/project.helper";
import {
  AlertTriangle,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Mail,
  Pause,
  Phone,
  History,
  Play,
  User,
} from "lucide-react";
import ExpandableText from "./ExpandableText";
import PieGraphic from "./PieGraphic";

type DetailPorjectProps = {
  project: ProjectByIdType;
};
const DetailPorject = ({ project }: DetailPorjectProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5" />
            Detalles Generales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpandableText
              icon={User}
              label="Contratista"
              value={project.contractor}
            />
            <ExpandableText
              icon={Building2}
              label="División Funcional"
              value={project.functional_division}
            />
            <ExpandableText
              icon={DollarSign}
              label="Monto de Obra"
              value={formatCurrency(project.cost_liquidation)}
            />
            <ExpandableText
              icon={DollarSign}
              label="Monto de Supervisión"
              value={formatCurrency(project.cost_supervision)}
            />
            <ExpandableText
              icon={Calendar}
              label="Fecha de Inicio"
              value={formatDate(project.start_date)}
            />
            <ExpandableText
              icon={Calendar}
              label="Fecha de Fin Original"
              value={formatDate(project.original_end_date)}
            />
            <ExpandableText
              icon={History}
              label="Antecedentes del proyecto"
              value={project.project_ackground}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progreso Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <PieGraphic current_progress={project.current_progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5" />
            Personal del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Personal del Proyecto
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExpandableText
                icon={User}
                label="Supervisor"
                value={project.supervisor}
              />
              <ExpandableText
                icon={User}
                label="Residente"
                value={project.resident}
              />
              <ExpandableText
                icon={Clock}
                label="Período de Ejecución"
                value={project.execution_period}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Información de Contacto
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <ExpandableText
                icon={Mail}
                label="Email Empresa Ejecutora"
                value={project.email_executing_company}
              />
              <ExpandableText
                icon={Mail}
                label="Email Supervisión"
                value={project.supervision_email}
              />
              <ExpandableText
                icon={Phone}
                label="Teléfono"
                value={project.cell_phone}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            Suspensión del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <ExpandableText
              icon={Pause}
              label="Fecha de Inicio de Suspensión"
              value={formatDate(project.suspension_start_date)}
            />
            <ExpandableText
              icon={Play}
              label="Fecha de Fin de Suspensión"
              value={formatDate(project.suspension_end_date)}
            />
            <ExpandableText
              icon={Calendar}
              label="Fecha de Finalización Reprogramada"
              value={formatDate(project.rescheduled_end_date)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default DetailPorject;
