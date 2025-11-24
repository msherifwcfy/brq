import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import { format } from "date-fns";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";

export const useAwardsCardsColumns = (
  handleEdit: (awardsCard: any) => void,
  handleDelete: (awardsCard: any) => void,
  t: (key: string) => string
): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "id",
      header: t("awardsCards.table.id"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "media",
      header: t("awardsCards.table.media"),
      cell: ({ row }) => {
        const media = row.original.media;
        return (
          <DocumentPreviewer
            showDefaultTrigger
            triggerClassName="w-10 h-10 rounded-sm"
            documentUrl={`${media?.url}${media?.key}`}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: t("awardsCards.table.name"),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: t("awardsCards.table.description"),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: t("awardsCards.table.createdAt"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return (
          <div className="text-sm ">{format(date, "dd/MM/yyyy HH:mm")}</div>
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: t("awardsCards.table.updatedAt"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("updated_at"));
        return (
          <div className="text-sm">{format(date, "dd/MM/yyyy HH:mm")}</div>
        );
      },
    },
    {
      id: "actions",
      header: t("awardsCards.table.actions"),
      cell: ({ row }) => {
        const awardsCard = row.original;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.AWARDS_CARDS.UPDATE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => handleEdit(awardsCard)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("awardsCards.table.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={PERMISSION_KEYS.AWARDS_CARDS.DELETE}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => handleDelete(awardsCard)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t("awardsCards.table.delete")}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];
};
