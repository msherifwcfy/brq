import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { canAccess, PERMISSION_KEYS } from "@/shared/config/permissions";
import type { UsersEntity } from "@/sdk/types.gen";
import { UserStatusToggle } from "@/features/employees/components/UserStatusToggle";
import { useAuthStore } from "@/features/auth";
import { useLang } from "@/shared/hooks/use-lang";

export const useEmployeeColumns = (
  onEdit: (user: UsersEntity) => void,
  onDelete: (user: UsersEntity) => void,
  onRefresh?: () => void
): ColumnDef<UsersEntity>[] => {
  const { user } = useAuthStore();
  const { t } = useLang();
  return [
    {
      accessorKey: "name",
      header: t("employees.columns.name"),
      cell: ({ row }) => row.original.name || "-",
    },
    {
      accessorKey: "email",
      header: t("employees.columns.email"),
      cell: ({ row }) => row.original.email || "-",
    },
    {
      accessorKey: "user_role.name",
      header: t("employees.columns.role"),
      cell: ({ row }) => row.original.user_role?.name || "-",
    },
    {
      accessorKey: "blocked",
      header: t("employees.columns.status") as any,
      cell: ({ row }) => (
        <UserStatusToggle
          userId={row.original.id}
          blocked={row.original.blocked}
          onChanged={onRefresh}
          disabled={
            row.original.id === user?.id ||
            !canAccess([PERMISSION_KEYS.USERS.UPDATE])
          }
        />
      ),
    },
    {
      accessorKey: "created_at",
      header: t("employees.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("employees.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.USERS.UPDATE,
            PERMISSION_KEYS.USERS.DELETE,
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
              <ProtectedComponent permissionKey={PERMISSION_KEYS.USERS.UPDATE}>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("employees.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent permissionKey={PERMISSION_KEYS.USERS.DELETE}>
                {row.original.id !== user?.id && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                    onClick={() => onDelete(row.original)}
                  >
                    <TrashIcon className="w-4 h-4" />
                    {t("employees.columns.delete")}
                  </Button>
                )}
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
