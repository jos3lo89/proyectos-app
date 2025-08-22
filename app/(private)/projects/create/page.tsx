"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createProjectSchema,
  createProjectType,
} from "@/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const CreateProjectPage = () => {
  const form = useForm<createProjectType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      cui: "",
      location: "",
      contractor: "",
      cost_liquidation: 0.0,
      cost_supervision: 0.0,
      start_date: "",
      original_end_date: "",
      status: "planificado",
      cell_phone: "",
      email_executing_company: "",
      execution_period: "",
      functional_division: "",
      resident: "",
      supervisor: "",
      supervision_email: "",
      project_ackground: "",
    },
  });

  const onSubmit = async (values: createProjectType) => {
    try {
      await api.post("/project", values);
      toast.success("Proyecto creado exitosamente");
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Error al crear el proyecto");
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre del Proyecto *</FormLabel>
                <FormControl>
                  <Textarea
                    id="name"
                    autoComplete="off"
                    placeholder="Ingrese el nombre completo del proyecto"
                    className="min-h-[60px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div>
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="sm:w-auto w-full bg-transparent"
              onClick={() => form.reset()}
            >
              Limpiar Formulario
            </Button>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="sm:w-auto w-full"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Guardando Proyecto...
                </>
              ) : (
                "Guardar Proyecto"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CreateProjectPage;
