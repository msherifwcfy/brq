import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useAlliancesClientsColumns } from "@/features/alliances/clients/columns/alliances-clients-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useAlliancesClientsControllerReadQuery } from "@/sdk/modules/alliancesclient.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

export default function AlliancesClientsSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("alliances-clients");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const mediaIdFilter = getQueryParam("media_id") || "";
  const countryIdFilter = getQueryParam("country_id") || "";
  const industriesIdFilter = getQueryParam("industries_id") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: alliancesClientsData,
    isLoading,
    refetch,
  } = useAlliancesClientsControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            media_id: mediaIdFilter,
            country_id: countryIdFilter,
            industries_id: industriesIdFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            media_id: "Eq",
            country_id: "Eq",
            industries_id: "Eq",
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
          countries: {
            country_id_country_translations: true,
          },
          industries: {
            industries_id_industries_translations: true,
          },
        },
      },
    },
  });

  const alliancesClients = alliancesClientsData?.data || [];
  const total = alliancesClientsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createAlliancesClient", {}, refetch);
  };

  const handleEdit = (alliancesClient: any) => {
    onOpen("updateAlliancesClient", { alliancesClient }, refetch);
  };

  const handleDelete = (alliancesClient: any) => {
    onOpen("deleteAlliancesClient", { alliancesClient }, refetch);
  };

  const alliancesClientsColumns = useAlliancesClientsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.ALLIANCES_CLIENTS.CREATE}
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("alliancesClients.createAlliancesClient")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={alliancesClientsColumns}
        data={alliancesClients}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="alliances-clients"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "media_id",
              label: t("alliancesClients.filters.mediaId"),
              type: "text",
            },
            {
              key: "country_id",
              label: t("alliancesClients.filters.countryId"),
              type: "text",
            },
            {
              key: "industries_id",
              label: t("alliancesClients.filters.industriesId"),
              type: "text",
            },
            {
              key: "created_at",
              label: t("alliancesClients.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("alliancesClients.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("alliancesClients.sort.id") },
            { key: "media_id", label: t("alliancesClients.sort.mediaId") },
            { key: "country_id", label: t("alliancesClients.sort.countryId") },
            {
              key: "industries_id",
              label: t("alliancesClients.sort.industriesId"),
            },
            { key: "created_at", label: t("alliancesClients.sort.createdAt") },
          ],
        }}
      />
    </div>
  );
}
