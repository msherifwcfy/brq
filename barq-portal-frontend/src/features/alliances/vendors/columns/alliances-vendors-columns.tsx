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
import type { AlliancesVendorsEntity } from "@/sdk/types.gen";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";

export const useAlliancesVendorsColumns = (
  onEdit: (alliancesVendor: AlliancesVendorsEntity) => void,
  onDelete: (alliancesVendor: AlliancesVendorsEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<AlliancesVendorsEntity>[] => {
  return [
    {
      accessorKey: "id",
      header: t("alliancesVendors.columns.id"),
      cell: ({ row }) => row.original?.id || "-",
    },
    {
      accessorKey: "media",
      header: t("alliancesVendors.columns.media"),
      cell: ({ row }) => (
        <DocumentPreviewer
          showDefaultTrigger
          triggerClassName="w-10 h-10 rounded-sm"
          documentUrl={`${row.original?.media?.url}${row.original?.media?.key}`}
        />
      ),
    },
    {
      accessorKey: "countries",
      header: t("alliancesVendors.columns.countries"),
      cell: ({ row }) => row.original?.countries?.map((country) => country.name).join(" - ") || "-",
    },
    {
      accessorKey: "solutions",
      header: t("alliancesVendors.columns.solutions"),
      cell: ({ row }) => row.original?.solutions?.map((solution) => solution.name).join(" - ") || "-",
    },
    {
      accessorKey: "created_at",
      header: t("alliancesVendors.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "updated_at",
      header: t("alliancesVendors.columns.updatedAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.updated_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("alliancesVendors.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.ALLIANCES_VENDORS.UPDATE,
            PERMISSION_KEYS.ALLIANCES_VENDORS.DELETE,
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
                permissionKey={PERMISSION_KEYS.ALLIANCES_VENDORS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("alliancesVendors.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.ALLIANCES_VENDORS.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("alliancesVendors.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
