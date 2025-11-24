import { DataTable } from "@/shared/components/ui/data-table";
import { useLang } from "@/shared/hooks/use-lang";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { toSdkFilters } from "@/shared/lib/utils";
import { useEventJoinusFormControllerReadQuery } from "@/sdk/modules/eventjoinusform.gen";
import { useEventsRegistrationsColumns } from "./events-registrations-columns";

export default function EventsRegistrationsSection() {
  const { t } = useLang();
  const { getQueryParam } = useUpdateQueryParam("events-registrations");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const emailFilter = getQueryParam("email") || "";
  const companyFilter = getQueryParam("company_name") || "";
  const eventFilter = getQueryParam("event_id") || "";
  const sortBy = getQueryParam("sort_by") || "created_at";
  const sortOrder = (getQueryParam("sort_order") as "asc" | "desc" | null) || "desc";

  const filters = toSdkFilters(
    {
      email: keyword || emailFilter,
      company_name: companyFilter,
      event_id: eventFilter,
    },
    {
      event_id: "Eq",
    }
  );

  const {
    data: registrationsData,
    isLoading,
  } = useEventJoinusFormControllerReadQuery({
    query: {
      query: {
        filters,
        orders: sortBy
          ? {
              [sortBy]: sortOrder,
            }
          : undefined,
        relations: {
          event: true,
        },
        pagination: {
          skip: page * limit,
          take: limit,
        },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const registrations = registrationsData?.data || [];
  const total = registrationsData?.meta?.total || registrations.length;
  const pagesCount = Math.max(1, Math.ceil(total / limit));

  const columns = useEventsRegistrationsColumns(t);

  return (
    <DataTable
      columns={columns}
      data={registrations}
      loading={isLoading}
      page={page}
      limit={limit}
      pagesCount={pagesCount}
      tableId="events-registrations"
      filters
      filtersConfig={{
        fields: [
          {
            key: "email",
            label: t("cms.events.registrations.filters.email"),
            type: "text",
          },
          {
            key: "company_name",
            label: t("cms.events.registrations.filters.company"),
            type: "text",
          },
          {
            key: "event_id",
            label: t("cms.events.registrations.filters.eventId"),
            type: "text",
          },
        ],
      }}
      sortConfig={{
        fields: [
          { key: "created_at", label: t("cms.events.registrations.sort.createdAt") },
          { key: "updated_at", label: t("cms.events.registrations.sort.updatedAt") },
          { key: "email", label: t("cms.events.registrations.sort.email") },
        ],
        defaultBy: "created_at",
        defaultOrder: "desc",
      }}
    />
  );
}

