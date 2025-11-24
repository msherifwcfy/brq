import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import type { CareerCategoryEntity } from "@/sdk/types.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";

export type CareerCategoryRow = CareerCategoryEntity;

export const useCareerCategoriesColumns = (
  onEdit: (category: CareerCategoryRow) => void,
  onDelete: (category: CareerCategoryRow) => void
): ColumnDef<CareerCategoryRow>[] => {
  const { t } = useLang();
  
  return [
    {
      header: t("cms.careers.manageItems.categories.columns.id"),
      accessorKey: "id",
    },
    {
      header: t("cms.careers.manageItems.categories.columns.nameEn"),
      accessorKey: "name",
      cell: ({ row }) => {
        const enTranslation = row.original.career_category_id_career_category_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.name || row.original.name || "-";
      },
    },
    {
      header: t("cms.careers.manageItems.categories.columns.nameAr"),
      accessorKey: "name",
      cell: ({ row }) => {
        const arTranslation = row.original.career_category_id_career_category_translations?.find(
          (t) => t.language === "ar"
        );
        return arTranslation?.name || "-";
      },
    },
    {
      header: t("cms.careers.manageItems.categories.columns.createdAt"),
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
      header: t("cms.careers.manageItems.categories.columns.updatedAt"),
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
      header: t("cms.careers.manageItems.categories.columns.actions"),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <ProtectedComponent
              permissionKeys={[PERMISSION_KEYS.CAREER_CATEGORY.UPDATE]}
            >
              <Button
                variant="outline"
                onClick={() => onEdit(row.original)}
              >
                {t("common.edit")}
              </Button>
            </ProtectedComponent>
            <ProtectedComponent
              permissionKeys={[PERMISSION_KEYS.CAREER_CATEGORY.DELETE]}
            >
              <Button
                variant="destructive"
                onClick={() => onDelete(row.original)}
              >
                {t("common.delete")}
              </Button>
            </ProtectedComponent>
          </div>
        );
      },
    },
  ];
};

