"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { ProjectByIdType, suspendProject } from "@/actions/project.action";
import { suspendFormSchema, SuspendFormType } from "@/schemas/project.schema";
import { getTodayForInput } from "@/helpers/date.helper";

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

interface SuspendModalProps {
  project: ProjectByIdType;
}

export const SuspendModal = ({ project }: SuspendModalProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SuspendFormType>({
    resolver: zodResolver(suspendFormSchema),
    defaultValues: {
      suspension_start_date: getTodayForInput(),
    },
  });

  const onSubmit = (values: SuspendFormType) => {
    startTransition(async () => {
      const res = await suspendProject(project.id, values);
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
        <Button variant="destructive">Suspender Proyecto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspender Proyecto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="suspension_start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Suspensión</FormLabel>
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
                {isPending ? "Guardando..." : "Confirmar Suspensión"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
