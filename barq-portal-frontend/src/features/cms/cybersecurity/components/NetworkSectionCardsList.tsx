import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useNetworkSectionCardsColumns } from "../columns/network-section-cards-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useNetworkSectionCardsControllerReadQuery } from "@/mock-sdk/modules/network-section-cards.mock";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function NetworkSectionCardsList() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("network-section-cards");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;

  const {
    data: cardsData,
    isLoading,
    refetch,
  } = useNetworkSectionCardsControllerReadQuery({
    query: {
      query: {
        pagination: {
          skip: page * limit,
          take: limit,
        },
        relations: {
          icon: true,
          network_section_cards_id_network_section_cards_translations: true,
        },
      },
    },
  } as any);

  const cards = cardsData?.data || [];
  const total = cardsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createNetworkSectionCard", { networkSectionId: 1 }, refetch);
  };

  const handleEdit = (card: any) => {
    onOpen("updateNetworkSectionCard", { card }, refetch);
  };

  const handleDelete = (card: any) => {
    onOpen("deleteNetworkSectionCard", { card }, refetch);
  };

  const cardsColumns = useNetworkSectionCardsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={
            PERMISSION_KEYS.CYBERSECURITY_NETWORK_SECTION_CARDS.CREATE
          }
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("cms.cybersecurity.networkSection.cards.create")}
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
        tableId="network-section-cards"
        filters={false}
        hideSearch
      />
    </div>
  );
}
