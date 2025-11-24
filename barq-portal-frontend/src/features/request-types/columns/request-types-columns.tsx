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
import type { ContactUsRequestTypeEntity } from "@/sdk/types.gen";

export const useRequestTypeColumns = (
  onEdit: (requestType: ContactUsRequestTypeEntity) => void,
  onDelete: (requestType: ContactUsRequestTypeEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<ContactUsRequestTypeEntity>[] => {
  return [
    {
      accessorKey: "title",
      header: t("requestTypes.columns.title"),
      cell: ({ row }) => row.original.title || "-",
    },
    {
      accessorKey: "created_at",
      header: t("requestTypes.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("requestTypes.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.UPDATE,
            PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.DELETE,
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
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("requestTypes.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("requestTypes.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
