import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import type { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal as MoreHorizontalIcon,
  Pencil as PencilIcon,
  Trash2 as TrashIcon,
} from "lucide-react";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import type { NewsroomCardsEntity } from "@/sdk/types.gen";

export const useNewsroomArticlesColumns = (
  onEdit: (article: NewsroomCardsEntity) => void,
  onDelete: (article: NewsroomCardsEntity) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<NewsroomCardsEntity>[] => [
  {
    accessorKey: "title",
    header: t("cms.newsroom.articles.table.title"),
    cell: ({ row }) => row.original.title || "-",
  },
  {
    accessorKey: "newsroom_category.name",
    header: t("cms.newsroom.articles.table.category"),
    cell: ({ row }) => row.original.newsroom_category?.name || "-",
  },
  {
    accessorKey: "date_time",
    header: t("cms.newsroom.articles.table.date"),
    cell: ({ row }) => {
      const value = row.original.date_time;
      return value ? new Date(value).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "updated_at",
    header: t("cms.newsroom.articles.table.updatedAt"),
    cell: ({ row }) => {
      const value = row.original.updated_at;
      return value ? new Date(value).toLocaleDateString() : "-";
    },
  },
  {
    id: "actions",
    header: t("cms.newsroom.articles.table.actions"),
    cell: ({ row }) => (
      <ProtectedComponent
        permissionKeys={[
          PERMISSION_KEYS.NEWSROOM_CARDS.UPDATE,
          PERMISSION_KEYS.NEWSROOM_CARDS.DELETE,
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
              permissionKey={PERMISSION_KEYS.NEWSROOM_CARDS.UPDATE}
            >
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none px-3 py-2"
                onClick={() => onEdit(row.original)}
              >
                <PencilIcon className="w-4 h-4" />
                {t("cms.newsroom.articles.table.edit")}
              </Button>
            </ProtectedComponent>
            <ProtectedComponent
              permissionKey={PERMISSION_KEYS.NEWSROOM_CARDS.DELETE}
            >
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                onClick={() => onDelete(row.original)}
              >
                <TrashIcon className="w-4 h-4" />
                {t("cms.newsroom.articles.table.delete")}
              </Button>
            </ProtectedComponent>
          </PopoverContent>
        </Popover>
      </ProtectedComponent>
    ),
  },
];
