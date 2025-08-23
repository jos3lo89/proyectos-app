"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { ProjectByIdType, resumeProject } from "@/actions/project.action";
import { resumeFormSchema, ResumeFormType } from "@/schemas/project.schema";
import { formatToInputDate, getTodayForInput } from "@/helpers/date.helper";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ResumeModalProps {
  project: ProjectByIdType;
}

export const ResumeModal = ({ project }: ResumeModalProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResumeFormType>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      suspension_end_date: project.suspension_end_date
        ? formatToInputDate(project.suspension_end_date)
        : getTodayForInput(),
      rescheduled_end_date: project.rescheduled_end_date
        ? formatToInputDate(project.rescheduled_end_date)
        : getTodayForInput(),
    },
  });

  const onSubmit = (values: ResumeFormType) => {
    startTransition(async () => {
      const res = await resumeProject(project.id, values);
      if (res.error) {
        toast.error("Error", { description: res.error });
      } else {
        setOpen(false);
        toast.success(res.success);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Reanudar Proyecto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reanudar Proyecto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="suspension_end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Reanudación</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rescheduled_end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Fecha de Fin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Confirmar Reanudación"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
