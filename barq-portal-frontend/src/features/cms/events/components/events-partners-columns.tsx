import { type ColumnDef } from "@tanstack/react-table";
import { type EventsPartnerEntity } from "@/sdk/types.gen";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

export const useEventsPartnersColumns = (
  onEdit: (partner: EventsPartnerEntity) => void,
  t: (key: string, replacements?: Record<string, string | number | undefined>) => string
): ColumnDef<EventsPartnerEntity>[] => [
  {
    accessorKey: "id",
    header: t("cms.events.partners.columns.id"),
    cell: ({ row }) => row.original.id || "-",
  },
  {
    accessorKey: "title",
    header: t("cms.events.partners.columns.title"),
    cell: ({ row }) => row.original.title || "-",
  },
  {
    accessorKey: "sub_title",
    header: t("cms.events.partners.columns.subTitle"),
    cell: ({ row }) => row.original.sub_title || "-",
  },
  {
    accessorKey: "logos",
    header: t("cms.events.partners.columns.logos"),
    cell: ({ row }) => {
      const logos = row.original.logos || [];
      if (!logos.length) return "-";
      return (
        <div className="flex gap-2 flex-wrap">
          {logos.slice(0, 3).map((logo) => (
            <DocumentPreviewer
              key={logo.id}
              showDefaultTrigger
              triggerClassName="w-10 h-10 rounded-sm"
              documentUrl={`${logo.url}${logo.key}`}
            />
          ))}
          {logos.length > 3 ? (
            <span className="text-xs text-muted-foreground">
              +{logos.length - 3}
            </span>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: t("cms.events.partners.columns.createdAt"),
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "updated_at",
    header: t("cms.events.partners.columns.updatedAt"),
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
  {
    id: "actions",
    header: t("cms.events.partners.columns.actions"),
    cell: ({ row }) => (
      <ProtectedComponent
        permissionKey={PERMISSION_KEYS.EVENTS_PARTNERS.UPDATE}
        fallback={"--"}
        showFallback
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-1" align="end">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-sm px-2 py-2"
              onClick={() => onEdit(row.original)}
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              {t("common.edit")}
            </Button>
          </PopoverContent>
        </Popover>
      </ProtectedComponent>
    ),
  },
];

