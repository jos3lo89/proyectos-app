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
