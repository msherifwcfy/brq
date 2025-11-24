import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useRoleColumns } from "@/features/roles/columns/roles-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useRolesControllerReadQuery } from "@/sdk/modules/role.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const RoleListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("roles");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const prefixFilter = getQueryParam("prefix") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: rolesData,
    isLoading,
    refetch,
  } = useRolesControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            name: keyword,
            prefix: prefixFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            name: "Contains",
            prefix: "Contains",
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
          role_role_permissions: true,
        },
      },
    },
  });

  const roles = rolesData?.data || [];
  const total = rolesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createRole", {}, refetch);
  };

  const handleEdit = (role: any) => {
    onOpen("updateRole", { role }, refetch);
  };

  const handleDelete = (role: any) => {
    onOpen("deleteRole", { role }, refetch);
  };

  const roleColumns = useRoleColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("roles.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.ROLES.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("roles.createRole")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={roleColumns}
        data={roles}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="roles"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "prefix",
              label: t("roles.filters.prefix"),
              type: "select",
              options: [
                { label: "ADMIN", value: "ADMIN" },
                { label: "EMPLOYEE", value: "EMPLOYEE" },
              ],
            },
            {
              key: "created_at",
              label: t("roles.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("roles.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "name", label: t("roles.sort.name") },
            { key: "prefix", label: t("roles.sort.prefix") },
            { key: "created_at", label: t("roles.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default RoleListPage;
