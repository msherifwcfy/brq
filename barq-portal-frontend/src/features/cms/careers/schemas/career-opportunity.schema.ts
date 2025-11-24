import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const careerOpportunitySchema = z.object({
  name: createI18nFieldSchema(z.string().min(1, "Name is required")),
});

export type CareerOpportunityFormData = z.infer<typeof careerOpportunitySchema>;

