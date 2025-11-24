import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useFooterLocationsControllerReadQuery } from "@/sdk/modules/footerlocation.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export default function FooterLocationsSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("footer-locations");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: footerLocationsData,
    isLoading,
    refetch,
  } = useFooterLocationsControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            created_at: "Eq",
            updated_at: "Eq",
          }
        ),
        pagination: {
          skip: page * limit,
          take: limit,
        },
        orders: {
          [sortBy]: sortOrder as "asc" | "desc",
        },
        relations: {
          footer_locations_id_footer_locations_translations: true,
        },
      },
    },
  });

  const footerLocations = footerLocationsData?.data || [];
  const total = footerLocationsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    if (total >= 5) {
      toast.error(t("footerLocations.messages.maxLocationsReached"));
      return;
    }
    onOpen("createFooterLocation", {}, refetch);
  };

  const handleEdit = (footerLocation: any) => {
    onOpen("updateFooterLocation", footerLocation, refetch);
  };

  const handleDelete = (footerLocation: any) => {
    onOpen("deleteFooterLocation", footerLocation, refetch);
  };

  // Simple columns for footer locations
  const footerLocationsColumns = [
    {
      accessorKey: "id",
      header: t("footerLocations.table.id"),
    },
    {
      accessorKey: "name",
      header: t("footerLocations.table.name"),
    },
    {
      accessorKey: "created_at",
      header: t("footerLocations.table.createdAt"),
    },
    {
      id: "actions",
      header: t("common.actions"),
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <ProtectedComponent
            permissionKey={PERMISSION_KEYS.FOOTER_LOCATIONS.UPDATE}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              {t("common.edit")}
            </Button>
          </ProtectedComponent>
          <ProtectedComponent
            permissionKey={PERMISSION_KEYS.FOOTER_LOCATIONS.DELETE}
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              {t("common.delete")}
            </Button>
          </ProtectedComponent>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.FOOTER_LOCATIONS.CREATE}
        >
          <Button
            onClick={handleCreate}
            size="sm"
            title={
              total >= 5
                ? t("footerLocations.messages.maxLocationsReached")
                : ""
            }
          >
            <PlusIcon className="w-4 h-4" />
            {t("footerLocations.createFooterLocation")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={footerLocationsColumns}
        data={footerLocations}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="footer-locations"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("footerLocations.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("footerLocations.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("footerLocations.sort.id") },
            { key: "name", label: t("footerLocations.sort.name") },
            { key: "created_at", label: t("footerLocations.sort.createdAt") },
          ],
        }}
      />
    </div>
  );
}
