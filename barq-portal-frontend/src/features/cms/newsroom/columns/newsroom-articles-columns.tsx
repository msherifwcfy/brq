import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";
import { format } from "date-fns";

interface NewsroomArticle {
  id: string;
  title_en: string;
  title_ar: string;
  category_id: string;
  publish_date: string;
  media_type: string;
  is_published: boolean;
  display_order: number;
}

interface ColumnProps {
  onEdit: (article: NewsroomArticle) => void;
  onDelete: (id: string) => void;
  onView?: (article: NewsroomArticle) => void;
}

export const useNewsroomArticlesColumns = ({
  onEdit,
  onDelete,
  onView,
}: ColumnProps): ColumnDef<NewsroomArticle>[] => [
  {
    accessorKey: "display_order",
    header: "Order",
    cell: ({ row }) => <div className="w-16">{row.getValue("display_order")}</div>,
  },
  {
    accessorKey: "title_en",
    header: "Title (EN)",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("title_en")}</div>
    ),
  },
  {
    accessorKey: "publish_date",
    header: "Publish Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("publish_date"));
      return format(date, "MMM dd, yyyy");
    },
  },
  {
    accessorKey: "media_type",
    header: "Media Type",
    cell: ({ row }) => {
      const type = row.getValue("media_type") as string;
      return (
        <Badge variant="outline">
          {type === "horizontal-video" ? "Video (H)" : type === "vertical-video" ? "Video (V)" : "Image"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_published",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("is_published") ? "default" : "secondary"}>
        {row.getValue("is_published") ? "Published" : "Draft"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onView && (
              <DropdownMenuItem onClick={() => onView(article)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onEdit(article)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(article.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
