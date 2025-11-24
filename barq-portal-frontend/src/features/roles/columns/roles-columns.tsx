import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import type { RolesEntity } from "@/sdk/types.gen";

export const useRoleColumns = (
  onEdit: (role: RolesEntity) => void,
  onDelete: (role: RolesEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<RolesEntity>[] => {
  return [
    {
      accessorKey: "name",
      header: t("roles.columns.roleName"),
      cell: ({ row }) => row.original.name || "-",
    },
    {
      accessorKey: "prefix",
      header: t("roles.columns.prefix"),
      cell: ({ row }) => row.original.prefix || "-",
    },
    {
      accessorKey: "admin_role",
      header: t("roles.columns.adminRole"),
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.admin_role
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.admin_role
            ? t("roles.columns.yes")
            : t("roles.columns.no")}
        </span>
      ),
    },
    {
      accessorKey: "role_role_permissions",
      header: t("roles.columns.permissionsCount"),
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {row.original.role_role_permissions?.length || 0}{" "}
          {t("roles.columns.permissions")}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: t("roles.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("roles.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.ROLES.UPDATE,
            PERMISSION_KEYS.ROLES.DELETE,
          ]}
          fallback={"--"}
          showFallback
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
              <ProtectedComponent permissionKey={PERMISSION_KEYS.ROLES.UPDATE}>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("roles.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent permissionKey={PERMISSION_KEYS.ROLES.DELETE}>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("roles.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
