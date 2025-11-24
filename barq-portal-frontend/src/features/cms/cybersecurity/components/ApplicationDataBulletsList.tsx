import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useApplicationDataBulletsColumns } from "../columns/application-data-bullets-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useApplicationDataBulletsControllerReadQuery } from "@/mock-sdk/modules/application-data-bullets.mock";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function ApplicationDataBulletsList() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("application-data-bullets");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;

  const {
    data: bulletsData,
    isLoading,
    refetch,
  } = useApplicationDataBulletsControllerReadQuery({
    query: {
      query: {
        pagination: {
          skip: page * limit,
          take: limit,
        },
        relations: {
          icon: true,
          application_data_bullets_id_application_data_bullets_translations:
            true,
        },
      },
    },
  } as any);

  const bullets = bulletsData?.data || [];
  const total = bulletsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createApplicationDataBullet", { applicationDataId: 1 }, refetch);
  };

  const handleEdit = (bullet: any) => {
    onOpen("updateApplicationDataBullet", { bullet }, refetch);
  };

  const handleDelete = (bullet: any) => {
    onOpen("deleteApplicationDataBullet", { bullet }, refetch);
  };

  const bulletsColumns = useApplicationDataBulletsColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={
            PERMISSION_KEYS.CYBERSECURITY_APPLICATION_DATA_BULLETS.CREATE
          }
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("cms.cybersecurity.applicationData.bullets.create")}
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
        tableId="application-data-bullets"
        filters={false}
        hideSearch
      />
    </div>
  );
}
