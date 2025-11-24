import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useCityColumns } from "@/features/cities/columns/cities-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useCityControllerReadQuery } from "@/sdk/modules/city.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const CityListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("cities");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";

  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: citiesData,
    isLoading,
    refetch,
  } = useCityControllerReadQuery({
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
          city_id_city_translations: true,
          country: {
            country_id_country_translations: true,
          },
        },
      },
    },
  });

  const cities = citiesData?.data || [];
  const total = citiesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createCity", {}, refetch);
  };

  const handleEdit = (city: any) => {
    onOpen("updateCity", { city }, refetch);
  };

  const handleDelete = (city: any) => {
    onOpen("deleteCity", { city }, refetch);
  };

  const cityColumns = useCityColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("cities.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.CITY.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("cities.createCity")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={cityColumns}
        data={cities}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="cities"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("cities.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("cities.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "name", label: t("cities.sort.name") },
            { key: "created_at", label: t("cities.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default CityListPage;

