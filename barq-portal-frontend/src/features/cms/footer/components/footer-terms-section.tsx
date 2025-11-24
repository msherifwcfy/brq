import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { PlusIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { useFooterTermsControllerReadQuery } from "@/sdk/modules/footerterm.gen";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { useModal } from "@/shared/store/modal-store";
import { toSdkFilters } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";
import type { ColumnDef } from "@tanstack/react-table";
import type { FooterTermsEntity } from "@/sdk";

export default function FooterTermsSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { getQueryParam } = useUpdateQueryParam("footer-terms");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const createdAtFilter = getQueryParam("created_at") || "";
  const updatedAtFilter = getQueryParam("updated_at") || "";
  const sortBy = getQueryParam("sort_by") || "";
  const sortOrder = getQueryParam("sort_order") || "";

  const {
    data: footerTermsData,
    isLoading,
    refetch,
  } = useFooterTermsControllerReadQuery({
    query: {
      query: {
        filters: toSdkFilters(
          {
            created_at: createdAtFilter,
            updated_at: updatedAtFilter,
          },
          {
            created_at: "Eq",
            updated_at: "Eq",
          }
        ),
        relations: {
          file: true,
          footer_terms_id_footer_terms_translations: true,
        },
        pagination: {
          skip: page * limit,
          take: limit,
        },
        orders: {
          [sortBy]: sortOrder as "asc" | "desc",
        },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const footerTerms = footerTermsData?.data || [];
  const total = footerTermsData?.meta?.total || 0;
  const pagesCount = Math.ceil(total / limit);

  const handleCreate = () => {
    onOpen("createFooterTerm", {}, refetch);
  };

  const handleEdit = (footerTerm: any) => {
    onOpen("updateFooterTerm", footerTerm, refetch);
  };

  const handleDelete = (footerTerm: any) => {
    onOpen("deleteFooterTerm", footerTerm, refetch);
  };

  const footerTermsColumns: ColumnDef<FooterTermsEntity>[] = [
    {
      accessorKey: "id",
      header: t("footerTerms.table.id"),
    },
    {
      accessorKey: "terms",
      header: t("footerTerms.table.title"),
      
    },
    {
      accessorKey: "file",
      header: t("footerTerms.table.file"),
      cell: ({ row }) => {
        const file = row.original.file;
        if (!file) return "-";
        return (
          <a
            href={`${file.url}${file.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {row.original.terms}
          </a>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: t("footerTerms.table.createdAt"),
      cell: ({ row }: any) => {
        const date = row.original.created_at;
        if (!date) return "-";
        return new Date(date).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("common.actions"),
      cell: ({ row }: any) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.FOOTER_TERMS.UPDATE,
            PERMISSION_KEYS.FOOTER_TERMS.DELETE,
          ]}
          fallback={"--"}
          showFallback
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.FOOTER_TERMS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => handleEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("common.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.FOOTER_TERMS.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => handleDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("common.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <ProtectedComponent
          permissionKey={PERMISSION_KEYS.FOOTER_TERMS.CREATE}
        >
          <Button onClick={handleCreate} size="sm">
            <PlusIcon className="w-4 h-4" />
            {t("footerTerms.createFooterTerm")}
          </Button>
        </ProtectedComponent>
      </div>

      <DataTable
        columns={footerTermsColumns}
        data={footerTerms}
        loading={isLoading}
        page={page}
        limit={limit}
        pagesCount={pagesCount}
        tableId="footer-terms"
        filters={true}
        hideSearch
        filtersConfig={{
          fields: [
            {
              key: "created_at",
              label: t("footerTerms.filters.createdAt"),
              type: "date",
            },
            {
              key: "updated_at",
              label: t("footerTerms.filters.updatedAt"),
              type: "date",
            },
          ],
        }}
        sortConfig={{
          fields: [
            { key: "id", label: t("footerTerms.sort.id") },
            { key: "title", label: t("footerTerms.sort.title") },
            { key: "created_at", label: t("footerTerms.sort.createdAt") },
          ],
        }}
      />
    </div>
  );
}

