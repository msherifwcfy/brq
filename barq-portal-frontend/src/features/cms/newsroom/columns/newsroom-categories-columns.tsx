import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import type { NewsroomCategoryEntity } from "@/sdk/types.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";

export type NewsroomCategoryRow = NewsroomCategoryEntity;

export const useNewsroomCategoriesColumns = (
  onEdit: (category: NewsroomCategoryRow) => void,
): ColumnDef<NewsroomCategoryRow>[] => {
  const { t } = useLang();
  
  return [
    {
      header: t("cms.newsroom.manageItems.categories.columns.id"),
      accessorKey: "id",
    },
    {
      header: t("cms.newsroom.manageItems.categories.columns.nameEn"),
      accessorKey: "name",
      cell: ({ row }) => {
        const enTranslation = row.original.newsroom_category_id_newsroom_category_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.name || row.original.name || "-";
      },
    },
    {
      header: t("cms.newsroom.manageItems.categories.columns.nameAr"),
      accessorKey: "name",
      cell: ({ row }) => {
        const arTranslation = row.original.newsroom_category_id_newsroom_category_translations?.find(
          (t) => t.language === "ar"
        );
        return arTranslation?.name || "-";
      },
    },
    {
      header: t("cms.newsroom.manageItems.categories.columns.createdAt"),
      accessorKey: "created_at",
      cell: ({ row }) => {
        return (
          <DateTimeDisplay
            date={row.original.created_at}
            format="dateAndTime"
          />
        );
      },
    },
    {
      header: t("cms.newsroom.manageItems.categories.columns.updatedAt"),
      accessorKey: "updated_at",
      cell: ({ row }) => {
        return (
          <DateTimeDisplay
            date={row.original.updated_at}
            format="dateAndTime"
          />
        );
      },
    },
    {
      header: t("cms.newsroom.manageItems.categories.columns.actions"),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <ProtectedComponent
              permissionKeys={[PERMISSION_KEYS.NEWSROOM_CATEGORY.UPDATE]}
            >
              <Button
                variant="outline"
                onClick={() => onEdit(row.original)}
              >
                {t("common.edit")}
              </Button>
            </ProtectedComponent>
          </div>
        );
      },
    },
  ];
};

