import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useIndustryColumns } from "@/features/industries/columns/industries-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useIndustriesControllerReadQuery } from "@/sdk/modules/industry.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const IndustryListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("industries");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: industriesData,
    isLoading,
    refetch,
  } = useIndustriesControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            name: keyword,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            name: "Contains",
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
          industries_id_industries_translations: true,
        },
      },
    },
  });

  const industries = industriesData?.data || [];
  const total = industriesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createIndustry", {}, refetch);
  };

  const handleEdit = (industry: any) => {
    onOpen("updateIndustry", { industry }, refetch);
  };

  const handleDelete = (industry: any) => {
    onOpen("deleteIndustry", { industry }, refetch);
  };

  const industryColumns = useIndustryColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("industries.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.INDUSTRIES.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("industries.createIndustry")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={industryColumns}
        data={industries}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="industries"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("industries.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("industries.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "name", label: t("industries.sort.name") },
            { key: "created_at", label: t("industries.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default IndustryListPage;
