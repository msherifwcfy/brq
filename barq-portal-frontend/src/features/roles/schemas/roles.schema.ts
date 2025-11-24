import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "roles.validation.roleNameRequired"),
  role_role_translations: z
    .array(
      z.object({
        name: z.string().min(1, "roles.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
  role_role_permissions: z
    .array(
      z.object({
        permission_id: z
          .number()
          .positive("roles.validation.permissionIdPositive"),
      })
    )
    .optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1, "roles.validation.roleNameRequired").optional(),
  role_role_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        role_id: z.number().positive().optional(),
        name: z.string().min(1, "roles.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
  role_role_permissions: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        role_id: z.number().positive().optional(),
        permission_id: z.number().positive().optional(),
      })
    )
    .optional(),
});

export const roleFiltersSchema = z.object({
  name: z.string().optional(),
  prefix: z.enum(["ADMIN", "EMPLOYEE"]).optional(),
  admin_role: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
export type RoleFilters = z.infer<typeof roleFiltersSchema>;
