import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useHearAboutUsOptionColumns } from "@/features/hear-about-us-options/columns/hear-about-us-options-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useContactUsHearAboutDropControllerReadQuery } from "@/sdk/modules/contactushearaboutdrop.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

const HearAboutUsOptionsListPage: React.FC = () => {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("hear-about-us-options");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: hearAboutUsOptionsData,
    isLoading,
    refetch,
  } = useContactUsHearAboutDropControllerReadQuery({
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
          contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: true,
        },
      },
    },
  });

  const hearAboutUsOptions = hearAboutUsOptionsData?.data || [];
  const total = hearAboutUsOptionsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createHearAboutUsOption", {}, refetch);
  };

  const handleEdit = (hearAboutUsOption: any) => {
    onOpen("updateHearAboutUsOption", { hearAboutUsOption }, refetch);
  };

  const handleDelete = (hearAboutUsOption: any) => {
    onOpen("deleteHearAboutUsOption", { hearAboutUsOption }, refetch);
  };

  const hearAboutUsOptionColumns = useHearAboutUsOptionColumns(handleEdit, handleDelete, t);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("hearAboutUsOptions.title")}</h1>
        <ProtectedComponent permissionKey={PERMISSION_KEYS.CONTACT_US_HEAR_ABOUT_OPTIONS.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="w-4 h-4" />
            {t("hearAboutUsOptions.createOption")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={hearAboutUsOptionColumns}
        data={hearAboutUsOptions}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="hear-about-us-options"
        filters={true}
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("hearAboutUsOptions.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("hearAboutUsOptions.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "title", label: t("hearAboutUsOptions.sort.title") },
            { key: "created_at", label: t("hearAboutUsOptions.sort.createdAt") },
          ],
        }}
      />
    </DashboardLayout>
  );
};

export default HearAboutUsOptionsListPage;

