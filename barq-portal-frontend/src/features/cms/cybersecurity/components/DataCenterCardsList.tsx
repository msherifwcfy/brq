import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useDataCenterCardsColumns } from "../columns/data-center-cards-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useDataCenterCardsControllerReadQuery } from "@/mock-sdk/modules/data-center-cards.mock";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function DataCenterCardsList() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("data-center-cards");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;

  const {
    data: cardsData,
    isLoading,
    refetch,
  } = useDataCenterCardsControllerReadQuery({
    query: {
      query: {
        pagination: {
          skip: page * limit,
          take: limit,
        },
        relations: {
          icon: true,
          cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations:
            true,
        },
      },
    },
  } as any);

  const cards = cardsData?.data || [];
  const total = cardsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createDataCenterCard" as any, { dataCenterId: 1 } as any, refetch);
  };

  const handleEdit = (card: any) => {
    onOpen("updateDataCenterCard" as any, { card } as any, refetch);
  };

  const handleDelete = (card: any) => {
    onOpen("deleteDataCenterCard", { card }, refetch);
  };

  const cardsColumns = useDataCenterCardsColumns(handleEdit, handleDelete, t);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.CYBERSECURITY_DATA_CENTER_CARDS.CREATE}
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("cms.cybersecurity.dataCenter.cards.create")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={cardsColumns}
        data={cards}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="data-center-cards"
        filters={false}
        hideSearch
      />
    </div>
  );
}
