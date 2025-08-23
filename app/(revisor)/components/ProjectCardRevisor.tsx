"use client";
import { ProjectCardData } from "@/actions/project.action";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import Link from "next/link";
type ProjectsCardRevisorProps = {
  projects: ProjectCardData;
};

const ProjectCardRevisor = ({ projects }: ProjectsCardRevisorProps) => {
  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-12">
        <p>No se encontraron proyectos.</p>
        <Button asChild className="mt-4">
          <Link href="/projects/create">Crear un nuevo proyecto</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{project.name}</CardTitle>
            <CardDescription>CUI: {project.cui}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Ubicación:</span>{" "}
                {project.location}
              </p>
              <p className="text-sm">
                {/* <span className="font-semibold">Estado:</span>{" "} */}
                <ProjectStatusBadge status={project.status} />
              </p>
              <div>
                <p className="text-sm font-semibold mb-1">Progreso:</p>
                <div className="flex items-center gap-2">
                  <Progress value={Number(project.current_progress)} />
                  <span className="text-xs font-mono">
                    {Number(project.current_progress).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/revisor/projects/${project.id}`}>Ver Detalles</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default ProjectCardRevisor;
