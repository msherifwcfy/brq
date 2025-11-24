import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useAwardsCardsColumns } from "@/features/awards/cards/columns/awards-cards-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useAwardsCardsControllerReadQuery } from "@/sdk/modules/awardscard.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

export default function AwardsCardsSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("awards-cards");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const mediaIdFilter = getQueryParam("media_id") || "";
  const nameFilter = getQueryParam("name") || "";
  const descriptionFilter = getQueryParam("description") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: awardsCardsData,
    isLoading,
    refetch,
  } = useAwardsCardsControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            media_id: mediaIdFilter,
            name: nameFilter,
            description: descriptionFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            media_id: "Eq",
            name: "Contains",
            description: "Contains",
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
          awards_cards_id_awards_cards_translations: true,
        },
      },
    },
  });

  const awardsCards = awardsCardsData?.data || [];
  const total = awardsCardsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createAwardsCards", {}, refetch);
  };

  const handleEdit = (awardsCard: any) => {
    onOpen("updateAwardsCards", { awardsCard }, refetch);
  };

  const handleDelete = (awardsCard: any) => {
    onOpen("deleteAwardsCards", { awardsCard }, refetch);
  };

  const awardsCardsColumns = useAwardsCardsColumns(handleEdit, handleDelete, t);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent permissionKey={PERMISSION_KEYS.AWARDS_CARDS.CREATE}>
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("awardsCards.createAwardsCard")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={awardsCardsColumns}
        data={awardsCards}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="awards-cards"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "media_id",
              label: t("awardsCards.filters.mediaId"),
              type: "text",
            },
            {
              key: "name",
              label: t("awardsCards.filters.name"),
              type: "text",
            },
            {
              key: "description",
              label: t("awardsCards.filters.description"),
              type: "text",
            },
            {
              key: "created_at",
              label: t("awardsCards.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("awardsCards.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("awardsCards.sort.id") },
            { key: "name", label: t("awardsCards.sort.name") },
            { key: "description", label: t("awardsCards.sort.description") },
            { key: "created_at", label: t("awardsCards.sort.createdAt") },
            { key: "updated_at", label: t("awardsCards.sort.updatedAt") },
          ],
        }}
      />
    </div>
  );
}
