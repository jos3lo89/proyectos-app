import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProjectProgress } from "@/actions/project.action";
type DeleteProgressProps = {
  progressId: string;
};

const DeleteProgress = ({ progressId }: DeleteProgressProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteProjectProgress(progressId);
      if (res.error) {
        toast.error("Error.", {
          description: res.error,
        });
      } else {
        toast.success("Progreso eliminado con éxito");
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="mr-2 h-5 w-5 cursor-pointer text-red-400" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Eliminando..." : "Sí, eliminar progreso"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteProgress;
