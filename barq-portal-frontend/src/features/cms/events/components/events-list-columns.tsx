import { type ColumnDef } from "@tanstack/react-table";
import { type EventEntity } from "@/sdk/types.gen";

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const useEventsListColumns = (
  t: (key: string, replacements?: Record<string, string | number | undefined>) => string
): ColumnDef<EventEntity>[] => [
  {
    accessorKey: "id",
    header: t("cms.events.list.columns.id"),
    cell: ({ row }) => row.original.id || "-",
  },
  {
    accessorKey: "name",
    header: t("cms.events.list.columns.name"),
    cell: ({ row }) => row.original.name || "-",
  },
  {
    accessorKey: "crmId",
    header: t("cms.events.list.columns.crmId"),
    cell: ({ row }) => row.original.crmId || "-",
  },
  {
    accessorKey: "registration_StartDate",
    header: t("cms.events.list.columns.registrationWindow"),
    cell: ({ row }) => {
      const start = formatDateTime(row.original.registration_StartDate);
      const end = formatDateTime(row.original.registration_EndDate);
      return `${start} → ${end}`;
    },
  },
  {
    accessorKey: "event_StartDate",
    header: t("cms.events.list.columns.eventWindow"),
    cell: ({ row }) => {
      const start = formatDateTime(row.original.event_StartDate);
      const end = formatDateTime(row.original.event_EndDate);
      return `${start} → ${end}`;
    },
  },
  {
    accessorKey: "location",
    header: t("cms.events.list.columns.location"),
    cell: ({ row }) => {
      const country = row.original.country ? `${row.original.country}` : "";
      const city = row.original.city ? `${row.original.city}` : "";
      const location = row.original.location ? `${row.original.location}` : "";
      return [country, city, location].filter(Boolean).join(" • ") || "-";
    },
  },
  {
    accessorKey: "Solution",
    header: t("cms.events.list.columns.solution"),
    cell: ({ row }) => row.original.Solution || "-",
  },
  {
    accessorKey: "Service",
    header: t("cms.events.list.columns.service"),
    cell: ({ row }) => row.original.Service || "-",
  },
  {
    accessorKey: "agendaItems",
    header: t("cms.events.list.columns.agendaItems"),
    cell: ({ row }) => row.original.agendaItems?.length ?? 0,
  },
  {
    accessorKey: "event_joinus_form",
    header: t("cms.events.list.columns.registrations"),
    cell: ({ row }) => row.original.event_joinus_form?.length ?? 0,
  },
  {
    accessorKey: "created_at",
    header: t("cms.events.list.columns.createdAt"),
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "updated_at",
    header: t("cms.events.list.columns.updatedAt"),
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
];

