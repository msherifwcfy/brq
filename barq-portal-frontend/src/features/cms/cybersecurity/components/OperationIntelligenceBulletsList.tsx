import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useOperationIntelligenceBulletsColumns } from "../columns/operation-intelligence-bullets-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useOperationIntelligenceBulletsControllerReadQuery } from "@/mock-sdk/modules/operation-intelligence-bullets.mock";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function OperationIntelligenceBulletsList() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam(
    "operation-intelligence-bullets"
  );

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;

  const {
    data: bulletsData,
    isLoading,
    refetch,
  } = useOperationIntelligenceBulletsControllerReadQuery({
    query: {
      query: {
        pagination: {
          skip: page * limit,
          take: limit,
        },
        relations: {
          icon: true,
          operation_intelligence_cards_id_operation_intelligence_cards_translations:
            true,
        },
      },
    },
  } as any);

  const bullets = bulletsData?.data || [];
  const total = bulletsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen(
      "createOperationIntelligenceBullet",
      { operationIntelligenceId: 1 },
      refetch
    );
  };

  const handleEdit = (bullet: any) => {
    onOpen("updateOperationIntelligenceBullet", { bullet }, refetch);
  };

  const handleDelete = (bullet: any) => {
    onOpen("deleteOperationIntelligenceBullet", { bullet }, refetch);
  };

  const bulletsColumns = useOperationIntelligenceBulletsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={
            PERMISSION_KEYS.CYBERSECURITY_OPERATION_INTELLIGENCE_BULLETS.CREATE
          }
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("cms.cybersecurity.operationIntelligence.bullets.create")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={bulletsColumns}
        data={bullets}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="operation-intelligence-bullets"
        filters={false}
        hideSearch
      />
    </div>
  );
}
