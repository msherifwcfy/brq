import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAlliancesHeadSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(3, "alliancesHead.validation.titleMin")
      .max(100, "alliancesHead.validation.titleMax")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(10, "alliancesHead.validation.subTitleMin")
      .max(200, "alliancesHead.validation.subTitleMax")
  ),
});

export const updateAlliancesHeadSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(3, "alliancesHead.validation.titleMin")
      .max(100, "alliancesHead.validation.titleMax")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(10, "alliancesHead.validation.subTitleMin")
      .max(200, "alliancesHead.validation.subTitleMax")
  ).optional(),
});

export const alliancesHeadFiltersSchema = z.object({
  title: z.string().optional(),
  sub_title: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateAlliancesHeadFormData = z.infer<
  typeof createAlliancesHeadSchema
>;
export type UpdateAlliancesHeadFormData = z.infer<
  typeof updateAlliancesHeadSchema
>;
export type AlliancesHeadFilters = z.infer<typeof alliancesHeadFiltersSchema>;
