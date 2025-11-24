import { type ColumnDef } from "@tanstack/react-table";
import { type EventsSpeakersEntity } from "@/sdk/types.gen";
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

export const useEventsSpeakersColumns = (
  onEdit: (speakers: EventsSpeakersEntity) => void,
  t: (key: string, replacements?: Record<string, string | number | undefined>) => string
): ColumnDef<EventsSpeakersEntity>[] => [
  {
    accessorKey: "id",
    header: t("cms.events.speakers.columns.id"),
    cell: ({ row }) => row.original.id || "-",
  },
  {
    accessorKey: "title",
    header: t("cms.events.speakers.columns.title"),
    cell: ({ row }) => row.original.title || "-",
  },
  {
    accessorKey: "events_speakers_cards_id_events_speakers_cards",
    header: t("cms.events.speakers.columns.count"),
    cell: ({ row }) => row.original.events_speakers_cards_id_events_speakers_cards?.length ?? 0,
  },
  {
    accessorKey: "created_at",
    header: t("cms.events.speakers.columns.createdAt"),
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "updated_at",
    header: t("cms.events.speakers.columns.updatedAt"),
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
  {
    id: "actions",
    header: t("cms.events.speakers.columns.actions"),
    cell: ({ row }) => (
      <ProtectedComponent
        permissionKey={PERMISSION_KEYS.EVENTS_SPEAKERS.UPDATE}
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

