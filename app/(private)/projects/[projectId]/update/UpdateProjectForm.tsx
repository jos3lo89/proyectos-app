"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ProjectByIdType, updateProject } from "@/actions/project.action";
import {
  updateprojectschema,
  updateProjectType,
} from "@/schemas/project.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatToInputDate } from "@/helpers/date.helper";

type UpdateProjectFormProps = {
  project: ProjectByIdType;
};

export const UpdateProjectForm = ({ project }: UpdateProjectFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<updateProjectType>({
    resolver: zodResolver(updateprojectschema),
    defaultValues: {
      name: project.name || "",
      cui: project.cui || "",
      location: project.location || "",
      contractor: project.contractor || "",
      cost_liquidation: project.cost_liquidation || 0,
      cost_supervision: project.cost_supervision || 0,
      start_date: formatToInputDate(project.start_date),
      original_end_date: formatToInputDate(project.original_end_date),
      status: project.status,
      functional_division: project.functional_division || "",
      supervisor: project.supervisor || "",
      resident: project.resident || "",
      execution_period: project.execution_period || "",
      email_executing_company: project.email_executing_company || "",
      supervision_email: project.supervision_email || "",
      cell_phone: project.cell_phone || "",
      project_ackground: project.project_ackground || "",
    },
  });

  const onSubmit = (values: updateProjectType) => {
    startTransition(async () => {
      const res = await updateProject(project.id, values);
      if (res.error) {
        toast.error("Error al actualizar", { description: res.error });
      } else {
        toast.success("Proyecto actualizado con éxito.");
        router.back();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Proyecto</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="cui"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cui">Código Único (CUI) *</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    id="cui"
                    placeholder="Ej: 2024001"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="location">Ubicación *</FormLabel>
                <FormControl>
                  <Input
                    id="location"
                    autoComplete="off"
                    placeholder="Distrito, Provincia, Departamento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="contractor"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contractor">
                Contratista / Consorcio *
              </FormLabel>
              <FormControl>
                <Input
                  id="contractor"
                  autoComplete="off"
                  placeholder="Nombre de la empresa ejecutora"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="cost_liquidation"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cost_liquidation">
                  Monto de Obra (S/)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    id="cost_liquidation"
                    autoComplete="off"
                    placeholder="Ej: 1000000.00"
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
            name="cost_supervision"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cost_supervision">
                  Monto de Supervisión (S/)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    id="cost_supervision"
                    autoComplete="off"
                    placeholder="Ej: 90000.00"
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
        </div>

        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start_date">Fecha de Inicio</FormLabel>
                <FormControl>
                  <Input id="start_date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="original_end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="original_end_date">
                  Fecha Final Original
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} id="original_end_date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="status">Estado del Proyecto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ProjectStatus.planificado}>
                      Planificado
                    </SelectItem>
                    <SelectItem value={ProjectStatus.ejecucion}>
                      En Ejecución
                    </SelectItem>
                    <SelectItem value={ProjectStatus.pausado}>
                      Pausado
                    </SelectItem>
                    <SelectItem value={ProjectStatus.finalizado}>
                      Finalizado
                    </SelectItem>
                    <SelectItem value={ProjectStatus.paralizado}>
                      Paralizado
                    </SelectItem>
                    <SelectItem value={ProjectStatus.suspendido}>
                      Suspendido
                    </SelectItem>
                    <SelectItem value={ProjectStatus.proceso_de_liquidacion}>
                      Proceso de Liquidacion
                    </SelectItem>
                    <SelectItem value={ProjectStatus.liquidado}>
                      Liquidado
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="supervisor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
                <FormControl>
                  <Input
                    id="supervisor"
                    autoComplete="off"
                    placeholder="Ej: Supervisor 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supervision_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="supervision_email">
                  Correo de supervisión
                </FormLabel>
                <FormControl>
                  <Input
                    id="supervision_email"
                    autoComplete="off"
                    placeholder="ejemplo@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="functional_division"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="functional_division">
                  División funcional
                </FormLabel>
                <FormControl>
                  <Input
                    id="functional_division"
                    autoComplete="off"
                    placeholder="Ej: División 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resident"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="resident">Residente</FormLabel>
                <FormControl>
                  <Input
                    id="resident"
                    autoComplete="off"
                    placeholder="Ej: Residente 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="execution_period"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="execution_period">
                  Período de ejecución
                </FormLabel>
                <FormControl>
                  <Input
                    id="execution_period"
                    autoComplete="off"
                    placeholder="Ej: 2023-01-01 - 2023-12-31"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email_executing_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email_executing_company">
                  Correo del ejecutivo
                </FormLabel>
                <FormControl>
                  <Input
                    id="email_executing_company"
                    autoComplete="off"
                    placeholder="ejemplo@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="cell_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="cell_phone">Celular</FormLabel>
              <FormControl>
                <Input
                  id="cell_phone"
                  autoComplete="off"
                  type="number"
                  placeholder="999999999"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_ackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project_ackground">
                Antecedentes del Proyecto *
              </FormLabel>
              <FormControl>
                <Textarea
                  id="project_ackground"
                  autoComplete="off"
                  placeholder="Ingrese los antecedentes"
                  className="min-h-[60px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                Actualizando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
