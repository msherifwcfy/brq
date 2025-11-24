import { type ColumnDef } from "@tanstack/react-table";
import { type EventJoinusFormEntity } from "@/sdk/types.gen";

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export const useEventsRegistrationsColumns = (
  t: (key: string, replacements?: Record<string, string | number | undefined>) => string
): ColumnDef<EventJoinusFormEntity>[] => [
  {
    accessorKey: "id",
    header: t("cms.events.registrations.columns.id"),
    cell: ({ row }) => row.original.id || "-",
  },
  {
    accessorKey: "created_at",
    header: t("cms.events.registrations.columns.createdAt"),
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
  {
    accessorKey: "event",
    header: t("cms.events.registrations.columns.event"),
    cell: ({ row }) => row.original.event?.name || "-",
  },
  {
    accessorKey: "first_name",
    header: t("cms.events.registrations.columns.fullName"),
    cell: ({ row }) => {
      const { first_name, last_name } = row.original;
      return [first_name, last_name].filter(Boolean).join(" ") || "-";
    },
  },
  {
    accessorKey: "email",
    header: t("cms.events.registrations.columns.email"),
    cell: ({ row }) => row.original.email || "-",
  },
  {
    accessorKey: "phone_number",
    header: t("cms.events.registrations.columns.phone"),
    cell: ({ row }) =>
      row.original.phone_number
        ? `+${row.original.phone_number_key || ""} ${row.original.phone_number}`
        : "-",
  },
  {
    accessorKey: "company_name",
    header: t("cms.events.registrations.columns.company"),
    cell: ({ row }) => row.original.company_name || "-",
  },
  {
    accessorKey: "position",
    header: t("cms.events.registrations.columns.position"),
    cell: ({ row }) => row.original.position || "-",
  },
];

