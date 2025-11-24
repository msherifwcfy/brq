import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const careerOpenPositionSchema = z.object({
  job_title: createI18nFieldSchema(
    z.string()
      .min(5, "Job title must be at least 5 characters")
      .max(50, "Job title must not exceed 50 characters")
  ),
  job_description: createI18nFieldSchema(
    z.string()
      .min(50, "Intro sentence must be at least 50 characters")
      .max(250, "Intro sentence must not exceed 250 characters")
  ),
  opening_date: z.date().optional(),
  closing_date: z.date().optional(),
  status: z.enum(["OPEN", "CLOSED"]).optional(),
  country_id: z.number().optional(),
  city_id: z.number().optional(),
  career_opportunity_id: z.number().optional(),
  career_category_id: z.number().optional(),
});

export type CareerOpenPositionFormData = z.infer<typeof careerOpenPositionSchema>;

