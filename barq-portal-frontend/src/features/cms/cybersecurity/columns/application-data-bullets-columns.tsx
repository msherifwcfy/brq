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
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { Badge } from "@/shared/components/ui/badge";

export const useApplicationDataBulletsColumns = (
  onEdit: (bullet: any) => void,
  onDelete: (bullet: any) => void,
  t: (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ) => string
): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "id",
      header: t("cms.cybersecurity.applicationData.bullets.columns.id"),
      cell: ({ row }) => row.original.id || "-",
    },
    {
      accessorKey: "icon",
      header: t("cms.cybersecurity.applicationData.bullets.columns.icon"),
      cell: ({ row }) => (
        <DocumentPreviewer
          showDefaultTrigger
          triggerClassName="w-10 h-10 rounded-sm"
          documentUrl={`${row.original.icon?.url}${row.original.icon?.key}`}
        />
      ),
    },
    {
      accessorKey: "text",
      header: t("cms.cybersecurity.applicationData.bullets.columns.text"),
      cell: ({ row }) => {
        const text = row.original.text || "";
        return text.length > 30 ? `${text.substring(0, 30)}...` : text || "-";
      },
    },
    {
      accessorKey: "side",
      header: t("cms.cybersecurity.applicationData.bullets.columns.side"),
      cell: ({ row }) => {
        const side = row.original.side;
        return (
          <Badge variant={side === "left" ? "default" : "secondary"}>
            {side === "left"
              ? t("cms.cybersecurity.applicationData.bullets.columns.left")
              : t("cms.cybersecurity.applicationData.bullets.columns.right")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: t("cms.cybersecurity.applicationData.bullets.columns.actions"),
      cell: ({ row }) => (
        <ProtectedComponent
          permissionKeys={[
            PERMISSION_KEYS.CYBERSECURITY_APPLICATION_DATA_BULLETS.UPDATE,
            PERMISSION_KEYS.CYBERSECURITY_APPLICATION_DATA_BULLETS.DELETE,
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
                  PERMISSION_KEYS.CYBERSECURITY_APPLICATION_DATA_BULLETS.UPDATE
                }
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2"
                  onClick={() => onEdit(row.original)}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t("cms.cybersecurity.applicationData.bullets.columns.edit")}
                </Button>
              </ProtectedComponent>
              <ProtectedComponent
                permissionKey={
                  PERMISSION_KEYS.CYBERSECURITY_APPLICATION_DATA_BULLETS.DELETE
                }
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                  onClick={() => onDelete(row.original)}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t(
                    "cms.cybersecurity.applicationData.bullets.columns.delete"
                  )}
                </Button>
              </ProtectedComponent>
            </PopoverContent>
          </Popover>
        </ProtectedComponent>
      ),
    },
  ];
};
