import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight">
        Proyecto No Encontrado
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Lo sentimos, no pudimos encontrar el proyecto que estás buscando.
      </p>
      <Button asChild className="mt-6">
        <Link href="/projects">Volver a la lista de proyectos</Link>
      </Button>
    </div>
  );
}
