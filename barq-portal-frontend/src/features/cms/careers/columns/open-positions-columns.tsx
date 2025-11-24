import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { EditIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { Badge } from "@/shared/components/ui/badge";
import type { CareerOpenPositionEntity } from "@/sdk/types.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/components/ui/popover";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";

export type OpenPositionRow = CareerOpenPositionEntity;

export const useOpenPositionsColumns = (
  onEdit: (position: OpenPositionRow) => void,
  onDelete: (position: OpenPositionRow) => void
): ColumnDef<OpenPositionRow>[] => {
  const { t } = useLang();
  
  return [
    {
      header: t("cms.careers.openPositions.columns.id"),
      accessorKey: "id",
    },
    {
      header: t("cms.careers.openPositions.columns.jobTitleEn"),
      accessorKey: "job_title",
      cell: ({ row }) => {
        const enTranslation = row.original.career_open_position_id_career_open_position_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.job_title || row.original.job_title || "-";
      },
    },
    {
      header: t("cms.careers.openPositions.columns.jobTitleAr"),
      accessorKey: "job_title",
      cell: ({ row }) => {
        const arTranslation = row.original.career_open_position_id_career_open_position_translations?.find(
          (t) => t.language === "ar"
        );
        return arTranslation?.job_title || "-";
      },
    },
    {
      header: t("cms.careers.openPositions.columns.jobDescriptionEn"),
      accessorKey: "job_description",
      cell: ({ row }) => {
        const enTranslation = row.original.career_open_position_id_career_open_position_translations?.find(
          (t) => t.language === "en"
        );
        const description = enTranslation?.job_description || row.original.job_description || "-";
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
      },
    },
    {
      header: t("cms.careers.openPositions.columns.jobDescriptionAr"),
      accessorKey: "job_description",
      cell: ({ row }) => {
        const arTranslation = row.original.career_open_position_id_career_open_position_translations?.find(
          (t) => t.language === "ar"
        );
        const description = arTranslation?.job_description || "-";
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
      },
    },
    {
      header: t("cms.careers.openPositions.columns.status"),
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === "OPEN" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      header: t("cms.careers.openPositions.columns.category"),
      accessorKey: "career_category.name",
      cell: ({ row }) => {
        const category = row.original.career_category;
        const enTranslation = category?.career_category_id_career_category_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.name || category?.name || "-";
      },
    },
    {
      header: t("cms.careers.openPositions.columns.opportunity"),
      accessorKey: "career_opportunity.name",
      cell: ({ row }) => {
        const opportunity = row.original.career_opportunity;
        const enTranslation = opportunity?.career_opportunity_id_career_opportunity_translations?.find(
          (t) => t.language === "en"
        );
        return enTranslation?.name || opportunity?.name || "-";
      },
    },
    {
      header: t("cms.careers.openPositions.columns.openingDate"),
      accessorKey: "opening_date",
      cell: ({ row }) => {
        return row.original.opening_date ? (
          <DateTimeDisplay date={row.original.opening_date} format="dateAndTime" />
        ) : (
          "-"
        );
      },
    },
    {
      header: t("cms.careers.openPositions.columns.closingDate"),
      accessorKey: "closing_date",
      cell: ({ row }) => {
        return row.original.closing_date ? (
          <DateTimeDisplay date={row.original.closing_date} format="dateAndTime" />
        ) : (
          "-"
        );
      },
    },
    {
      header: t("cms.careers.openPositions.columns.createdAt"),
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
      header: t("cms.careers.openPositions.columns.actions"),
      cell: ({ row }) => {
        return (
            <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.CAREER_OPEN_POSITION.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("awardsCards.table.edit")}
                </Button>
              </ProtectedComponent>
              {/* <ProtectedComponent
                permissionKey={(PERMISSION_KEYS.CAREER_OPEN_POSITION as any).DELETE}
              > */}
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("awardsCards.table.delete")}
                </Button>
              {/* </ProtectedComponent> */}
            </PopoverContent>
          </Popover>
            
        );
      },
    },
  ];
};

