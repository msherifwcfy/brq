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
import type { CardSocialEntity } from "@/sdk/types.gen";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";

export const useSustainabilityCardSocialColumns = (
  onEdit: (cardSocial: CardSocialEntity) => void,
  onDelete: (cardSocial: CardSocialEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<CardSocialEntity>[] => {
  return [
    {
      accessorKey: "id",
      header: t("sustainability.cardSocial.columns.id"),
      cell: ({ row }) => row.original.id || "-",
    },
    {
      accessorKey: "title",
      header: t("sustainability.cardSocial.columns.title"),
      cell: ({ row }) => row.original.title || "-",
    },
    {
      accessorKey: "media",
      header: t("sustainability.cardSocial.columns.media"),
      cell: ({ row }) => (
        <DocumentPreviewer
          showDefaultTrigger
          triggerClassName="w-10 h-10 rounded-sm"
          documentUrl={`${row.original.media?.url}${row.original.media?.key}`}
        />
      ),
    },
    {
      accessorKey: "description",
      header: t("sustainability.cardSocial.columns.description"),
      cell: ({ row }) => {
        const description = row.original.description || "";
        return description.length > 50
          ? `${description.substring(0, 50)}...`
          : description || "-";
      },
    },
    {
      accessorKey: "created_at",
      header: t("sustainability.cardSocial.columns.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      accessorKey: "updated_at",
      header: t("sustainability.cardSocial.columns.updatedAt"),
      cell: ({ row }) => {
        const date = new Date(row.original?.updated_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: t("sustainability.cardSocial.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.SUSTAINABILITY_CARD_SOCIAL.UPDATE,
            PERMISSION_KEYS.SUSTAINABILITY_CARD_SOCIAL.DELETE,
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
                permissionKey={
                  PERMISSION_KEYS.SUSTAINABILITY_CARD_SOCIAL.UPDATE
                }
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("sustainability.cardSocial.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={
                  PERMISSION_KEYS.SUSTAINABILITY_CARD_SOCIAL.DELETE
                }
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("sustainability.cardSocial.columns.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
