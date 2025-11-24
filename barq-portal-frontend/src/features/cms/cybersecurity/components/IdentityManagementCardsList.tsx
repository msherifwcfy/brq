import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useIdentityManagementCardsColumns } from "../columns/identity-management-cards-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useIdentityManagementCardsControllerReadQuery } from "@/mock-sdk/modules/identity-management-cards.mock";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function IdentityManagementCardsList() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("identity-management-cards");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;

  const {
    data: cardsData,
    isLoading,
    refetch,
  } = useIdentityManagementCardsControllerReadQuery({
    query: {
      query: {
        pagination: {
          skip: page * limit,
          take: limit,
        },
        relations: {
          icon: true,
          identity_management_cards_id_identity_management_cards_translations:
            true,
        },
      },
    },
  } as any);

  const cards = cardsData?.data || [];
  const total = cardsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen(
      "createIdentityManagementCard",
      { identityManagementId: 1 },
      refetch
    );
  };

  const handleEdit = (card: any) => {
    onOpen("updateIdentityManagementCard", { card }, refetch);
  };

  const handleDelete = (card: any) => {
    onOpen("deleteIdentityManagementCard", { card }, refetch);
  };

  const cardsColumns = useIdentityManagementCardsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={
            PERMISSION_KEYS.CYBERSECURITY_IDENTITY_MANAGEMENT_CARDS.CREATE
          }
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("cms.cybersecurity.identityManagement.cards.create")}
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
        tableId="identity-management-cards"
        filters={false}
        hideSearch
      />
    </div>
  );
}
