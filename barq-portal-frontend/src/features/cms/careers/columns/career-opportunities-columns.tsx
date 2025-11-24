import { Button } from "@/shared/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import type { CareerOpportunityEntity } from "@/sdk/types.gen";
import type { ColumnDef } from "@tanstack/react-table";
import { useLang } from "@/shared/hooks/use-lang";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";

export type CareerOpportunityRow = CareerOpportunityEntity;

export const useCareerOpportunitiesColumns = (
  onEdit: (opportunity: CareerOpportunityRow) => void,
  onDelete: (opportunity: CareerOpportunityRow) => void
): ColumnDef<CareerOpportunityRow>[] => {
  const { t } = useLang();
  return [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name (EN)",
      accessorKey: "name",
      cell: ({ row }) => {
        const enTranslation = row.original.career_opportunity_id_career_opportunity_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.name || row.original.name || "-";
      },
    },
    {
      header: t("cms.careers.manageItems.opportunities.columns.nameAr"),
      accessorKey: "name",
      cell: ({ row }) => {
        const arTranslation = row.original.career_opportunity_id_career_opportunity_translations?.find(
          (t) => t.language === "ar"
        );
        return arTranslation?.name || "-";
      },
    },
    {
      header: t("cms.careers.manageItems.opportunities.columns.createdAt"),
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
      header: t("cms.careers.manageItems.opportunities.columns.updatedAt"),
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
      header: t("cms.careers.manageItems.opportunities.columns.actions"),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <ProtectedComponent
              permissionKeys={[PERMISSION_KEYS.CAREER_OPPORTUNITY.UPDATE]}
            >
              <Button
                variant="outline"
                onClick={() => onEdit(row.original)}
              >
                {t("common.edit")}
              </Button>
            </ProtectedComponent>
            
              <Button
                variant="destructive"
                onClick={() => onDelete(row.original)}
              >
                {t("common.delete")}
              </Button>
          </div>
            
            
        );
      },
    },
  ];
};

