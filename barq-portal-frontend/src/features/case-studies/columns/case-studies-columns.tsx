import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import type { SuccessStoryCaseStudiesEntity } from "@/sdk/types.gen";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { useLang } from "@/shared/hooks/use-lang";

export const useCaseStudiesColumns = (
  onEdit: (caseStudy: SuccessStoryCaseStudiesEntity) => void,
  onDelete: (caseStudy: SuccessStoryCaseStudiesEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<SuccessStoryCaseStudiesEntity>[] => {
  const { lang } = useLang();
  const isEnglish = lang === "en";


  return [
    {
      accessorKey: "id",
      header: t("caseStudies.columns.id"),
      cell: ({ row }) => row.original.id || "-",
    },
    {
      accessorKey: "title",
      header: t("caseStudies.columns.title"),
      cell: ({ row }) => isEnglish ?
        row.original.success_story_case_studies_id_success_story_case_studies_translations?.find((t: { language: string; }) => t.language === "en")?.title || "-"
        : row.original.success_story_case_studies_id_success_story_case_studies_translations?.find((t: { language: string; }) => t.language === "ar")?.title || "-",
    },
    {
      accessorKey: "image",
      header: t("caseStudies.columns.image"),
      cell: ({ row }) => (
        <DocumentPreviewer
          showDefaultTrigger
          triggerClassName="w-10 h-10 rounded-sm"
          documentUrl={`${row.original.image?.url}${row.original.image?.key}`}
        />
      ),
    },
    {
      accessorKey: "featured",
      header: t("caseStudies.columns.featured"),
      cell: ({ row }) => (row.original.featured ? t("common.yes") : t("common.no")),
    },
    {
      accessorKey: "date",
      header: t("caseStudies.columns.date"),
      cell: ({ row }) => {
        if (!row.original.date) return "-";
        const date = new Date(row.original.date);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "read_time",
      header: t("caseStudies.columns.readTime"),
      cell: ({ row }) => `${row.original.read_time || 0} ${t("caseStudies.columns.minutes")}`,
    },
    {
      accessorKey: "country",
      header: t("caseStudies.columns.country"),
      cell: ({ row }) => row.original?.country?.name || "-",
    },
    {
      accessorKey: "industries",
      header: t("caseStudies.columns.industries"),
      cell: ({ row }) => row.original?.industries?.name || "-",
    },
    {
      accessorKey: "created_at",
      header: t("caseStudies.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "updated_at",
      header: t("caseStudies.columns.updatedAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.updated_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("caseStudies.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.UPDATE,
            // PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.DELETE,
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
                permissionKey={PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("caseStudies.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.SUCCESS_STORY_CASE_STUDIES.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("caseStudies.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};

