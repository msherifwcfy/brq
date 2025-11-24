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
import type { HomeAwardsCardsEntity } from "@/sdk/types.gen";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { useLang } from "@/shared/hooks/use-lang";

export const useHomeAwardsCardsColumns = (
  onEdit: (card: HomeAwardsCardsEntity) => void,
  onDelete: (card: HomeAwardsCardsEntity) => void
): ColumnDef<HomeAwardsCardsEntity>[] => {
  const { t } = useLang();
  
  return [
    {
      accessorKey: "id",
      header: t("cms.homePage.homeAwards.cards.columns.id"),
      cell: ({ row }) => row.original.id || "-",
    },
    {
      accessorKey: "title",
      header: t("cms.homePage.homeAwards.cards.columns.title"),
      cell: ({ row }) => {
        const currentLang = document.documentElement.lang || "en";
        const translation = row.original.home_awards_cards_id_home_awards_cards_translations?.find(
          (t) => t.language === currentLang
        );
        return translation?.title || row.original.title || "-";
      },
    },
    {
      accessorKey: "date",
      header: t("cms.homePage.homeAwards.cards.columns.date"),
      cell: ({ row }) => {
        const date = row.original.date ? new Date(row.original.date) : null;
        return date ? date.toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "icon",
      header: t("cms.homePage.homeAwards.cards.columns.icon"),
      cell: ({ row }) => (
        <DocumentPreviewer
          showDefaultTrigger
          triggerClassName="w-10 h-10 rounded-sm"
          documentUrl={`${row.original.icon?.url}${row.original.icon?.key}`}
        />
      ),
    },
    {
      accessorKey: "created_at",
      header: t("cms.homePage.homeAwards.cards.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("cms.homePage.homeAwards.cards.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.HOME_AWARDS.UPDATE,
            PERMISSION_KEYS.HOME_AWARDS.CREATE,
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
                permissionKey={PERMISSION_KEYS.HOME_AWARDS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("cms.homePage.homeAwards.cards.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.HOME_AWARDS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("cms.homePage.homeAwards.cards.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};

