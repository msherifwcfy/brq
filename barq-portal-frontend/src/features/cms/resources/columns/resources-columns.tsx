import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";

export interface ResourceRow {
  id: string;
  title: string;
  date: string;
  readTime: number;
  layout: 1 | 2 | 3;
  campaignCRMID: string;
}

interface ColumnProps {
  onEdit: (row: ResourceRow) => void;
  onDelete: (id: string) => void;
}

export const useResourcesColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<ResourceRow>[] => [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "readTime", header: "Read Time" },
  { accessorKey: "layout", header: "Layout" },
  { accessorKey: "campaignCRMID", header: "CRM Campaign" },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


