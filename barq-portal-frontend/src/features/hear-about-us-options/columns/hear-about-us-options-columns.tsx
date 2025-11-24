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
import type { ContactUsHearAboutDropEntity } from "@/sdk/types.gen";

export const useHearAboutUsOptionColumns = (
  onEdit: (hearAboutUsOption: ContactUsHearAboutDropEntity) => void,
  onDelete: (hearAboutUsOption: ContactUsHearAboutDropEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<ContactUsHearAboutDropEntity>[] => {
  return [
    {
      accessorKey: "title",
      header: t("hearAboutUsOptions.columns.title"),
      cell: ({ row }) => row.original.title || "-",
    },
    {
      accessorKey: "created_at",
      header: t("hearAboutUsOptions.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("hearAboutUsOptions.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.UPDATE,
            PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.DELETE,
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
                permissionKey={PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("hearAboutUsOptions.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("hearAboutUsOptions.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};

