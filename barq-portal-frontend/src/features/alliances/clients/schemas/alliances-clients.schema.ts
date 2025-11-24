import { z } from "zod";

export const createAlliancesClientSchema = z.object({
  media: z.array(z.any()).min(1, "alliancesClients.validation.mediaIdRequired"),
  country_id: z
    .number()
    .positive("alliancesClients.validation.countryIdRequired"),
  industries_id: z
    .number()
    .positive("alliancesClients.validation.industriesIdRequired"),
});

export const updateAlliancesClientSchema = z.object({
  media: z.array(z.any()).optional(),
  country_id: z
    .number()
    .positive("alliancesClients.validation.countryIdRequired")
    .optional(),
  industries_id: z
    .number()
    .positive("alliancesClients.validation.industriesIdRequired")
    .optional(),
});

export const alliancesClientFiltersSchema = z.object({
  media_id: z.string().optional(),
  country_id: z.string().optional(),
  industries_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateAlliancesClientFormData = z.infer<
  typeof createAlliancesClientSchema
>;
export type UpdateAlliancesClientFormData = z.infer<
  typeof updateAlliancesClientSchema
>;
export type AlliancesClientFilters = z.infer<
  typeof alliancesClientFiltersSchema
>;
