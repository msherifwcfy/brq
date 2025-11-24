import { z } from "zod";

export const createAlliancesVendorSchema = z.object({
  media: z.array(z.any()).min(1, "alliancesVendors.validation.mediaIdRequired"),
  countries_ids: z.array(z.number()
    .positive("alliancesVendors.validation.countriesIdsRequired")
  ),
  solutions_ids: z.array(z.number()
    .positive("alliancesVendors.validation.solutionsIdRequired")
  ),
});

export const updateAlliancesVendorSchema = z.object({
  media: z.array(z.any()).optional(),
  countries_ids: z.array(z.number()
    .positive("alliancesVendors.validation.countriesIdsRequired")
  ).optional(),
  solutions_ids: z.array(z.number()
    .positive("alliancesVendors.validation.solutionsIdRequired")
  ).optional(),
});

export const alliancesVendorFiltersSchema = z.object({
  media_id: z.string().optional(),
  country_id: z.string().optional(),
  solutions_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateAlliancesVendorFormData = z.infer<
  typeof createAlliancesVendorSchema
>;
export type UpdateAlliancesVendorFormData = z.infer<
  typeof updateAlliancesVendorSchema
>;
export type AlliancesVendorFilters = z.infer<
  typeof alliancesVendorFiltersSchema
>;
