import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PermissionsEntity } from "@/sdk/types.gen";
import { createRoleSchema, updateRoleSchema } from "../schemas/roles.schema";
import type {
  CreateRoleFormData,
  UpdateRoleFormData,
} from "../schemas/roles.schema";
import { usePermissionsControllerReadQuery } from "@/sdk/modules/permission.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";

export type RoleFormProps = {
  defaultValues?: Partial<CreateRoleFormData | UpdateRoleFormData>;
  onSubmit: (values: CreateRoleFormData | UpdateRoleFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function RoleForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: RoleFormProps) {
  const { t } = useLang();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  // Create localized schemas
  const localizedCreateSchema = z.object({
    name: z.string().min(1, t("roles.validation.roleNameRequired")),
    role_role_translations: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, t("roles.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
    role_role_permissions: z
      .array(
        z.object({
          permission_id: z
            .number()
            .positive(t("roles.validation.permissionIdPositive")),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    name: z.string().min(1, t("roles.validation.roleNameRequired")).optional(),
    role_role_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          role_id: z.number().positive().optional(),
          name: z
            .string()
            .min(1, t("roles.validation.translationNameRequired")),
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

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateRoleFormData | UpdateRoleFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      role_role_permissions: [],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { data: permissionsData } = usePermissionsControllerReadQuery({
    query: {
      query: {
        pagination: {
          take: 1000,
        },
      },
    },
  });
  const permissions = permissionsData?.data || [];

  const { handleSubmit, control, setValue, watch } = methods;
  const selectedPermissions = watch("role_role_permissions");
  type PermissionSelection = {
    id?: number;
    role_id?: number;
    permission_id?: number;
  };
  const selectedPermissionsSafe: PermissionSelection[] =
    (selectedPermissions as PermissionSelection[]) || [];
  const selectedIds = new Set<number>(
    selectedPermissionsSafe
      .map((p) => p.permission_id)
      .filter((id): id is number => typeof id === "number")
  );

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    if (checked) {
      const ids = new Set([...Array.from(selectedIds.values()), permissionId]);
      const newPerms = Array.from(ids.values()).map((id) => ({
        permission_id: id,
      }));
      setValue("role_role_permissions", newPerms, { shouldValidate: true });
    } else {
      const newPerms = selectedPermissionsSafe.filter(
        (p) => (p.permission_id ?? -1) !== permissionId
      );
      setValue("role_role_permissions", newPerms, { shouldValidate: true });
    }
  };

  const handleGroupToggle = (group: string, perms: PermissionsEntity[]) => {
    const groupPerms = perms.filter((perm) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        perm.key.toLowerCase().includes(term) ||
        perm.name.toLowerCase().includes(term)
      );
    });

    const groupIds = groupPerms.map((p) => p.id);
    const allSelected = groupIds.every((id) => selectedIds.has(id));

    if (allSelected) {
      const newPerms = selectedPermissionsSafe.filter(
        (p) => !groupIds.includes(p.permission_id ?? -1)
      );
      setValue("role_role_permissions", newPerms, { shouldValidate: true });
    } else {
      const ids = new Set([...Array.from(selectedIds.values()), ...groupIds]);
      const newPerms = Array.from(ids.values()).map((id) => ({
        permission_id: id,
      }));
      setValue("role_role_permissions", newPerms, { shouldValidate: true });
    }
  };

  const handleSelectAll = (filtered: Record<string, PermissionsEntity[]>) => {
    const allIds = Object.values(filtered)
      .flat()
      .map((p) => p.id);
    const ids = new Set(allIds);
    const newPerms = Array.from(ids.values()).map((id) => ({
      permission_id: id,
    }));
    setValue("role_role_permissions", newPerms, { shouldValidate: true });
  };

  const handleClearAll = (filtered?: Record<string, PermissionsEntity[]>) => {
    if (searchTerm && filtered) {
      const filteredIds = new Set(
        Object.values(filtered)
          .flat()
          .map((p) => p.id)
      );
      const newPerms = selectedPermissionsSafe.filter(
        (p) => !filteredIds.has(p.permission_id ?? -1)
      );
      setValue("role_role_permissions", newPerms, { shouldValidate: true });
    } else {
      setValue("role_role_permissions", [], { shouldValidate: true });
    }
  };

  const toggleGroupExpansion = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const groupedPermissions: Record<string, PermissionsEntity[]> =
    permissions.reduce(
      (acc: Record<string, PermissionsEntity[]>, perm: PermissionsEntity) => {
        const group = perm.resource || "other";
        if (!acc[group]) acc[group] = [];
        acc[group].push(perm);
        return acc;
      },
      {}
    );

  const filteredPermissions = Object.entries(groupedPermissions).reduce(
    (acc, [group, perms]) => {
      const term = searchTerm.toLowerCase();
      const filteredPerms = perms.filter((perm) => {
        if (!searchTerm) return true;
        return (
          perm.key.toLowerCase().includes(term) ||
          perm.name.toLowerCase().includes(term)
        );
      });
      if (filteredPerms.length > 0) {
        acc[group] = filteredPerms;
      }
      return acc;
    },
    {} as Record<string, PermissionsEntity[]>
  );

  const totalPermissions = Object.values(filteredPermissions).flat().length;
  const selectedCount = (selectedPermissions || []).length;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("roles.form.roleName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("roles.form.roleNamePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="role_role_permissions"
          control={control}
          render={() => (
            <FormItem>
              <FormLabel>{t("roles.form.permissions")}</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Search and Actions */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t("roles.form.searchPermissions")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {t("roles.form.permissionsSelected", {
                          selected: selectedCount,
                          total: totalPermissions,
                        })}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectAll(filteredPermissions)}
                          disabled={
                            isLoading || selectedCount === totalPermissions
                          }
                        >
                          {t("roles.form.selectAll")}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleClearAll(filteredPermissions)}
                          disabled={isLoading || selectedCount === 0}
                        >
                          {t("roles.form.clearAll")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Permissions List */}
                  <div className="max-h-96 overflow-y-auto border rounded-md">
                    {Object.entries(filteredPermissions).map(
                      ([group, perms]) => {
                        const isExpanded = expandedGroups[group] !== true;
                        const groupSelectedCount = perms.filter((perm) =>
                          selectedIds.has(perm.id)
                        ).length;
                        const allGroupSelected =
                          groupSelectedCount === perms.length;
                        const partialGroupSelected =
                          groupSelectedCount > 0 && !allGroupSelected;

                        return (
                          <Collapsible
                            key={group}
                            open={isExpanded}
                            onOpenChange={() => toggleGroupExpansion(group)}
                          >
                            <div className="border-b last:border-b-0">
                              <CollapsibleTrigger className="w-full p-3 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    <Checkbox
                                      checked={allGroupSelected}
                                      ref={(el: HTMLButtonElement | null) => {
                                        if (el) {
                                          const checkbox = el.querySelector(
                                            'input[type="checkbox"]'
                                          ) as HTMLInputElement;
                                          if (checkbox) {
                                            checkbox.indeterminate =
                                              partialGroupSelected;
                                          }
                                        }
                                      }}
                                      onCheckedChange={() =>
                                        handleGroupToggle(group, perms)
                                      }
                                      disabled={isLoading}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="font-medium text-sm">
                                      {group}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {groupSelectedCount}/{perms.length}
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="pl-10 pr-3 pb-3 space-y-2">
                                  {perms.map((perm) => (
                                    <div
                                      key={perm.id}
                                      className="flex items-center gap-2"
                                    >
                                      <Checkbox
                                        checked={selectedIds.has(perm.id)}
                                        onCheckedChange={(checked) =>
                                          handlePermissionChange(
                                            perm.id,
                                            !!checked
                                          )
                                        }
                                        disabled={isLoading}
                                      />
                                      <label className="text-sm cursor-pointer flex-1">
                                        {perm.key}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        );
                      }
                    )}
                  </div>

                  {Object.keys(filteredPermissions).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {t("roles.form.noPermissionsFound", {
                        searchTerm,
                      })}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("roles.form.loading")
            : submitLabel || t("roles.form.save")}
        </Button>
      </form>
    </Form>
  );
}
