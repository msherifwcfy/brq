import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useRequestTypeColumns } from "@/features/request-types/columns/request-types-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useContactUsRequestTypeControllerReadQuery } from "@/sdk/modules/contactusrequesttype.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const RequestTypesListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("request-types");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: requestTypesData,
    isLoading,
    refetch,
  } = useContactUsRequestTypeControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            title: keyword,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            title: "Contains",
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
          contact_us_request_type_id_contact_us_request_type_translations: true,
        },
      },
    },
  });

  const requestTypes = requestTypesData?.data || [];
  const total = requestTypesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createRequestType", {}, refetch);
  };

  const handleEdit = (requestType: any) => {
    onOpen("updateRequestType", { requestType }, refetch);
  };

  const handleDelete = (requestType: any) => {
    onOpen("deleteRequestType", { requestType }, refetch);
  };

  const requestTypeColumns = useRequestTypeColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("requestTypes.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.CONTACT_US_REQUEST_TYPES.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("requestTypes.createRequestType")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={requestTypeColumns}
        data={requestTypes}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="request-types"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("requestTypes.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("requestTypes.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "title", label: t("requestTypes.sort.title") },
            { key: "created_at", label: t("requestTypes.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default RequestTypesListPage;
