import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useAlliancesVendorsColumns } from "@/features/alliances/vendors/columns/alliances-vendors-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useAlliancesVendorsControllerReadQuery } from "@/sdk/modules/alliancesvendor.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const AlliancesVendorsListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("alliances-vendors");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const mediaIdFilter = getQueryParam("media_id") || "";
  const countryIdFilter = getQueryParam("country_id") || "";
  const solutionsIdFilter = getQueryParam("solutions_id") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: alliancesVendorsData,
    isLoading,
    refetch,
  } = useAlliancesVendorsControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            media_id: mediaIdFilter,
            country_id: countryIdFilter,
            solutions_id: solutionsIdFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            media_id: "Eq",
            country_id: "Eq",
            solutions_id: "Eq",
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
          media: true,
          country: true,
          solutions: true,
        },
      },
    },
  });

  const alliancesVendors = alliancesVendorsData?.data || [];
  const total = alliancesVendorsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createAlliancesVendor", {}, refetch);
  };

  const handleEdit = (alliancesVendor: any) => {
    onOpen("updateAlliancesVendor", { alliancesVendor }, refetch);
  };

  const handleDelete = (alliancesVendor: any) => {
    onOpen("deleteAlliancesVendor", { alliancesVendor }, refetch);
  };

  const alliancesVendorsColumns = useAlliancesVendorsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("alliancesVendors.title")}</h1>
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.ALLIANCES_VENDORS.CREATE}
        >
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("alliancesVendors.createAlliancesVendor")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={alliancesVendorsColumns}
        data={alliancesVendors}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="alliances-vendors"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "media_id",
              label: t("alliancesVendors.filters.mediaId"),
              type: "text",
            },
            {
              key: "country_id",
              label: t("alliancesVendors.filters.countryId"),
              type: "text",
            },
            {
              key: "solutions_id",
              label: t("alliancesVendors.filters.solutionsId"),
              type: "text",
            },
            {
              key: "created_at",
              label: t("alliancesVendors.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("alliancesVendors.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("alliancesVendors.sort.id") },
            { key: "media_id", label: t("alliancesVendors.sort.mediaId") },
            { key: "country_id", label: t("alliancesVendors.sort.countryId") },
            {
              key: "solutions_id",
              label: t("alliancesVendors.sort.solutionsId"),
            },
            { key: "created_at", label: t("alliancesVendors.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default AlliancesVendorsListPage;
