import { ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del proyecto es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  cui: z
    .string()
    .min(1, "El CUI es requerido")
    .min(3, "El CUI debe tener al menos 3 caracteres"),
  location: z
    .string()
    .min(1, "La ubicación es requerida")
    .min(3, "La ubicación debe tener al menos 3 caracteres"),
  contractor: z
    .string()
    .min(1, "El contratista es requerido")
    .min(3, "El nombre del contratista debe tener al menos 3 caracteres"),
  cost_liquidation: z
    .number("Ingrese un monto válido")
    .min(0, "El monto debe ser mayor o igual a 0")
    .optional(),
  cost_supervision: z
    .number("Ingrese un monto válido")
    .min(0, "El monto debe ser mayor o igual a 0")
    .optional(),
  start_date: z.string().optional(),
  original_end_date: z.string().optional(),
  status: z.enum(ProjectStatus),
  functional_division: z.string().min(3, "La división funcional es requerida."),
  supervisor: z.string().optional(),
  resident: z.string().optional(),
  execution_period: z.string().optional(),
  email_executing_company: z
    .email("Debe ser un correo válido.")
    .optional()
    .or(z.literal("")),
  supervision_email: z
    .email("Debe ser un correo válido.")
    .optional()
    .or(z.literal("")),
  cell_phone: z.string().optional(),
  project_ackground: z.string(),
});

export type createProjectType = z.infer<typeof createProjectSchema>;

export const updateprojectschema = z.object({
  name: z.string().min(1, "El nombre del proyecto es requerido"),
  cui: z
    .string()
    .min(1, "El CUI es requerido")
    .min(3, "El CUI debe tener al menos 3 caracteres"),
  location: z
    .string()
    .min(1, "La ubicación es requerida")
    .min(3, "La ubicación debe tener al menos 3 caracteres"),
  contractor: z
    .string()
    .min(1, "El contratista es requerido")
    .min(3, "El nombre del contratista debe tener al menos 3 caracteres"),
  cost_liquidation: z
    .number("Ingrese un monto válido")
    .min(0, "El monto debe ser mayor o igual a 0"),
  cost_supervision: z
    .number("Ingrese un monto válido")
    .min(0, "El monto debe ser mayor o igual a 0"),
  start_date: z.string().optional(),
  original_end_date: z.string().optional(),
  status: z.enum(ProjectStatus),
  functional_division: z.string().min(3, "La división funcional es requerida."),
  supervisor: z.string().optional(),
  resident: z.string().optional(),

  execution_period: z.string().optional(),
  email_executing_company: z
    .email("Debe ser un correo válido.")
    .optional()
    .or(z.literal("")),
  supervision_email: z
    .email("Debe ser un correo válido.")
    .optional()
    .or(z.literal("")),
  cell_phone: z.string().optional(),
  project_ackground: z.string(),
});

export type updateProjectType = z.infer<typeof updateprojectschema>;

export const addProgressSchema = z.object({
  progress_percentage: z
    .number()
    .min(0, "El porcentaje no puede ser negativo.")
    .max(100, "El porcentaje no puede ser mayor a 100."),
  notes: z.string().optional(),
  progressDate: z.string(),
});

export type AddProgressType = z.infer<typeof addProgressSchema>;

export const updateProgressSchema = addProgressSchema;

export type UpdateProgressType = z.infer<typeof updateProgressSchema>;

export const suspendFormSchema = z.object({
  suspension_start_date: z
    .string()
    .min(1, "La fecha de suspensión es requerida."),
});
export type SuspendFormType = z.infer<typeof suspendFormSchema>;

export const resumeFormSchema = z.object({
  suspension_end_date: z
    .string()
    .min(1, "La fecha de reanudación es requerida."),
  rescheduled_end_date: z
    .string()
    .min(1, "La nueva fecha de fin es requerida."),
});
export type ResumeFormType = z.infer<typeof resumeFormSchema>;

// // Esquema para suspender un proyecto
// export const formSuspendProjectSchema = z.object({
//   suspension_start_date: z.string().min(1, "La fecha es requerida."),
// });

// export type formSuspendProjectType = z.infer<typeof formSuspendProjectSchema>;

// // Esquema para reanudar un proyecto
// export const formResumeProjectSchema = z.object({
//   suspension_end_date: z
//     .string()
//     .min(1, "La fecha de reanudación es requerida."),
//   rescheduled_end_date: z
//     .string()
//     .min(1, "La nueva fecha de fin es requerida."),
// });

// export type formResumeProjectType = z.infer<typeof formResumeProjectSchema>;

// // Esquema para agregar un nuevo avance
// export const addProgressSchema = z.object({
//   progress_percentage: z.coerce
//     .number("Debe ser un número")
//     .min(0, "El porcentaje no puede ser negativo.")
//     .max(100, "El porcentaje no puede ser mayor a 100."),
//   notes: z.string().nullable(),
// });

// export type AddProgressFormType = z.infer<typeof addProgressSchema>;
