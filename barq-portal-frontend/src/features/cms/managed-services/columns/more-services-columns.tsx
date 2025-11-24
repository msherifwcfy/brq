import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";

interface MoreService {
  id: string;
  service_key: string;
  title_en: string;
  title_ar: string;
  has_bundles_link: boolean;
  display_order: number;
}

interface ColumnProps {
  onEdit: (service: MoreService) => void;
  onDelete: (id: string) => void;
}

export const useMoreServicesColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<MoreService>[] => [
  {
    accessorKey: "display_order",
    header: "Order",
    cell: ({ row }) => <div className="w-16">{row.getValue("display_order")}</div>,
  },
  {
    accessorKey: "service_key",
    header: "Service Key",
  },
  {
    accessorKey: "title_en",
    header: "Title (EN)",
  },
  {
    accessorKey: "title_ar",
    header: "Title (AR)",
  },
  {
    accessorKey: "has_bundles_link",
    header: "Bundles Link",
    cell: ({ row }) => (
      <Badge variant={row.getValue("has_bundles_link") ? "default" : "secondary"}>
        {row.getValue("has_bundles_link") ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(service)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(service.id)}
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
