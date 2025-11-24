import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useSustainabilityCardSocialColumns } from "../columns/sustainability-card-social-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useCardSocialControllerReadQuery } from "@/sdk/modules/cardsocial.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

export default function SustainabilityCardSocialSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("sustainability-card-social");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: cardSocialData,
    isLoading,
    refetch,
  } = useCardSocialControllerReadQuery({
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
          card_social_id_card_social_translations: true,
          media: true,
        },
      },
    },
  });

  const cardSocialItems = cardSocialData?.data || [];
  const total = cardSocialData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createSustainabilityCardSocial", {}, refetch);
  };

  const handleEdit = (cardSocial: any) => {
    onOpen("updateSustainabilityCardSocial", { cardSocial }, refetch);
  };

  const handleDelete = (cardSocial: any) => {
    onOpen("deleteSustainabilityCardSocial", { cardSocial }, refetch);
  };

  const cardSocialColumns = useSustainabilityCardSocialColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.SUSTAINABILITY_CARD_SOCIAL.CREATE}
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("sustainability.cardSocial.createCardSocial")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={cardSocialColumns}
        data={cardSocialItems}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="sustainability-card-social"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("sustainability.cardSocial.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("sustainability.cardSocial.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("sustainability.cardSocial.sort.id") },
            { key: "title", label: t("sustainability.cardSocial.sort.title") },
            {
              key: "created_at",
              label: t("sustainability.cardSocial.sort.createdAt"),
            },
            {
              key: "updated_at",
              label: t("sustainability.cardSocial.sort.updatedAt"),
            },
          ],
        }}
      />
    </div>
  );
}
