import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useCaseStudiesColumns } from "@/features/case-studies/columns/case-studies-columns";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useSuccessStoryCaseStudiesControllerReadQuery } from "@/sdk/modules/successstorycasestudy.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";

export default function CaseStudiesSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("case-studies");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const titleFilter = getQueryParam("title") || "";
  const featuredFilter = getQueryParam("featured") || "";
  const imageIdFilter = getQueryParam("image_id") || "";
  const industriesIdFilter = getQueryParam("industries_id") || "";
  const countryIdFilter = getQueryParam("country_id") || "";
  const readTimeFilter = getQueryParam("read_time") || "";
  const dateFilter = getQueryParam("date") || "";
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: caseStudiesData,
    isLoading,
    refetch,
  } = useSuccessStoryCaseStudiesControllerReadQuery({
    headers: {
      "x-skip-translations": "true",
    },
    query: {
      query: {
        filters: toSdkFilters(
          {
            title: titleFilter,
            featured: featuredFilter,
            image_id: imageIdFilter,
            industries_id: industriesIdFilter,
            country_id: countryIdFilter,
            read_time: readTimeFilter,
            date: dateFilter,
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            title: "Contains",
            featured: "Eq",
            image_id: "Eq",
            industries_id: "Eq",
            country_id: "Eq",
            read_time: "Eq",
            date: "Eq",
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
          image: true,
          country: true,
          industries: true,
          success_story_case_studies_id_success_story_case_studies_translations: true,
        },
      },
    },
  });

  const caseStudies = caseStudiesData?.data || [];
  const total = caseStudiesData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createCaseStudy", {}, refetch);
  };

  const handleEdit = (caseStudy: any) => {
    onOpen("updateCaseStudy", { caseStudy }, refetch);
  };

  const handleDelete = (caseStudy: any) => {
    onOpen("deleteCaseStudy", { caseStudy }, refetch);
  };

  const caseStudiesColumns = useCaseStudiesColumns(
    handleEdit,
    handleDelete,
    t
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.CREATE}
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("caseStudies.createCaseStudy")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={caseStudiesColumns}
        data={caseStudies}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="case-studies"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "title",
              label: t("caseStudies.filters.title"),
              type: "text",
            },
            {
              key: "featured",
              label: t("caseStudies.filters.featured"),
              type: "text",
            },
            {
              key: "image_id",
              label: t("caseStudies.filters.imageId"),
              type: "text",
            },
            {
              key: "industries_id",
              label: t("caseStudies.filters.industriesId"),
              type: "text",
            },
            {
              key: "country_id",
              label: t("caseStudies.filters.countryId"),
              type: "text",
            },
            {
              key: "read_time",
              label: t("caseStudies.filters.readTime"),
              type: "text",
            },
            {
              key: "date",
              label: t("caseStudies.filters.date"),
              type: "date",
            },
            {
              key: "created_at",
              label: t("caseStudies.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("caseStudies.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("caseStudies.sort.id") },
            { key: "title", label: t("caseStudies.sort.title") },
            { key: "featured", label: t("caseStudies.sort.featured") },
            { key: "date", label: t("caseStudies.sort.date") },
            { key: "read_time", label: t("caseStudies.sort.readTime") },
            { key: "created_at", label: t("caseStudies.sort.createdAt") },
          ],
        }}
      />
    </div>
  );
}

