import { z } from "zod";

export const createSolutionSchema = z.object({
  name: z.string().min(1, "solutions.validation.solutionNameRequired"),
  solution_id_solution_translations: z
    .array(
      z.object({
        name: z.string().min(1, "solutions.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateSolutionSchema = z.object({
  name: z
    .string()
    .min(1, "solutions.validation.solutionNameRequired")
    .optional(),
  solution_id_solution_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        solution_id: z.number().positive().optional(),
        name: z.string().min(1, "solutions.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const solutionFiltersSchema = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateSolutionFormData = z.infer<typeof createSolutionSchema>;
export type UpdateSolutionFormData = z.infer<typeof updateSolutionSchema>;
export type SolutionFilters = z.infer<typeof solutionFiltersSchema>;
