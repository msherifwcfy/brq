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
import type { CityEntity } from "@/sdk/types.gen";

export const useCityColumns = (
  onEdit: (city: CityEntity) => void,
  onDelete: (city: CityEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<CityEntity>[] => {
  return [
    {
      accessorKey: "name",
      header: t("cities.columns.cityName"),
      cell: ({ row }) => row.original.name || "-",
    },
    {
      accessorKey: "country.name",
      header: t("cities.columns.country"),
      cell: ({ row }) => row.original.country?.name || "-",
    },
    {
      accessorKey: "created_at",
      header: t("cities.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("cities.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.CITY.UPDATE,
            PERMISSION_KEYS.CITY.DELETE,
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
                permissionKey={PERMISSION_KEYS.CITY.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("cities.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.CITY.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("cities.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};

