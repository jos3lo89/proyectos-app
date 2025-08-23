"use client";

import { addProgress } from "@/actions/project.action";
import { addProgressSchema, AddProgressType } from "@/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { getTodayForInput } from "@/helpers/date.helper";

type AddProgressProps = {
  projectId: string;
};

const AddProgress = ({ projectId }: AddProgressProps) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<AddProgressType>({
    resolver: zodResolver(addProgressSchema),
    defaultValues: {
      progress_percentage: 0.0,
      notes: "",
      progressDate: getTodayForInput(),
    },
  });
  const onSubmit = (values: AddProgressType) => {
    startTransition(async () => {
      const res = await addProgress(projectId, values);
      if (res.error) {
        toast.error("Error", {
          description: res.error,
        });
      } else {
        form.reset();
        setOpen(false);
        toast.success("Proyecto actualizado con éxito.");
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Agregar Avance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Avance</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="progress_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo Porcentaje de Avance Total (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ej: 55"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? "" : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe el avance..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="progressDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="progressDate">Fecha </FormLabel>
                  <FormControl>
                    <Input id="progressDate" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Guardando avance...</span>
                </div>
              ) : (
                "Guardar Avance"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddProgress;
