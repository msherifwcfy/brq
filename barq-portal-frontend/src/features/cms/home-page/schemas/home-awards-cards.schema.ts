import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createHomeAwardsCardSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(2, "cms.homePage.homeAwards.cards.validation.titleMin")
      .max(100, "cms.homePage.homeAwards.cards.validation.titleMax")
  ),
  date: z.string().min(1, "cms.homePage.homeAwards.cards.validation.dateRequired"),
  icon: z.array(z.any()).min(1, "cms.homePage.homeAwards.cards.validation.iconRequired"),
});

export const updateHomeAwardsCardSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(2, "cms.homePage.homeAwards.cards.validation.titleMin")
      .max(100, "cms.homePage.homeAwards.cards.validation.titleMax")
  ).optional(),
  date: z.string().min(1, "cms.homePage.homeAwards.cards.validation.dateRequired").optional(),
  icon: z.array(z.any()).optional(),
});

export type CreateHomeAwardsCardFormData = z.infer<typeof createHomeAwardsCardSchema>;
export type UpdateHomeAwardsCardFormData = z.infer<typeof updateHomeAwardsCardSchema>;

