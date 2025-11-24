import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useEmployeeColumns } from "@/features/employees/columns/employees-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useUsersControllerReadQuery } from "@/sdk/modules/user.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const EmployeesListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("employees");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const emailFilter = getQueryParam("email") || "";
  const roleIdFilter = getQueryParam("role_id") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useUsersControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            name: keyword,
            email: emailFilter,
            role_id: roleIdFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            email: "Contains",
            role_id: "Eq",
            created_at: "LessThanOrEq",
            updated_at: "LessThanOrEq",
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
          user_role: {
            role_role_translations: true,
          },
        },
      },
    },
  });

  const employees = usersData?.data || [];
  const total = usersData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createEmployee", {}, refetch);
  };

  const handleEdit = (user: any) => {
    onOpen("updateEmployee", { user }, refetch);
  };

  const handleDelete = (user: any) => {
    onOpen("deleteEmployee", { user }, refetch);
  };

  const employeeColumns = useEmployeeColumns(handleEdit, handleDelete, refetch);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("employees.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.USERS.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("employees.createEmployee")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={employeeColumns}
        data={employees}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="employees"
        filters={true}
        filtersConfig={{
          fields: [
            { key: "email", label: t("employees.filters.email"), type: "text" },
            {
              key: "role_id",
              label: t("employees.filters.roleId"),
              type: "text",
            },
            {
              key: "created_at",
              label: t("employees.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("employees.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "name", label: t("employees.sort.name") },
            { key: "email", label: t("employees.sort.email") },
            { key: "role_id", label: t("employees.sort.roleId") },
            { key: "created_at", label: t("employees.sort.createdAt") },
            { key: "updated_at", label: t("employees.sort.updatedAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default EmployeesListPage;
