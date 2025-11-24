import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAwardsHeadSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "awardsHead.validation.titleMin")
      .max(60, "awardsHead.validation.titleMax")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(100, "awardsHead.validation.subTitleMin")
      .max(250, "awardsHead.validation.subTitleMax")
  ),
});

export const updateAwardsHeadSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "awardsHead.validation.titleMin")
      .max(60, "awardsHead.validation.titleMax")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(100, "awardsHead.validation.subTitleMin")
      .max(250, "awardsHead.validation.subTitleMax")
  ).optional(),
});

export const awardsHeadFiltersSchema = z.object({
  title: z.string().optional(),
  sub_title: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateAwardsHeadFormData = z.infer<typeof createAwardsHeadSchema>;
export type UpdateAwardsHeadFormData = z.infer<typeof updateAwardsHeadSchema>;
export type AwardsHeadFilters = z.infer<typeof awardsHeadFiltersSchema>;
