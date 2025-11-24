import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useCountryColumns } from "@/features/countries/columns/countries-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useCountryControllerReadQuery } from "@/sdk/modules/country.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const CountryListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("countries");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: countriesData,
    isLoading,
    refetch,
  } = useCountryControllerReadQuery({
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
          country_id_country_translations: true,
        },
      },
    },
  });

  const countries = countriesData?.data || [];
  const total = countriesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createCountry", {}, refetch);
  };

  const handleEdit = (country: any) => {
    onOpen("updateCountry", { country }, refetch);
  };

  const handleDelete = (country: any) => {
    onOpen("deleteCountry", { country }, refetch);
  };

  const countryColumns = useCountryColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("countries.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.COUNTRIES.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("countries.createCountry")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={countryColumns}
        data={countries}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="countries"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("countries.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("countries.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "name", label: t("countries.sort.name") },
            { key: "created_at", label: t("countries.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default CountryListPage;
