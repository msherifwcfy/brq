import { useMemo } from "react";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { toSdkFilters } from "@/shared/lib/utils";
import { useEventControllerReadQuery } from "@/sdk/modules/event.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { type EventEntity } from "@/sdk/types.gen";
import { WEBSITE_URL } from "@/shared/utils/env";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { DebouncedInput } from "@/shared/components/ui/debounced-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings2,
  Calendar,
  MapPin,
  Users,
  FileText,
  Copy,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import DatePicker from "@/shared/components/custom/DatePicker";

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

function EventCard({
  event,
  t,
}: {
  event: EventEntity;
  t: (key: string) => string;
}) {
  const location =
    [event.country, event.city, event.location].filter(Boolean).join(" • ") ||
    "-";

  const eventUrl = `${WEBSITE_URL}events/${event.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(eventUrl);
  };

  const handleOpenExternal = () => {
    window.open(eventUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1 line-clamp-2">
              {event.name || "-"}
            </CardTitle>
            <CardDescription className="text-xs">
              {t("cms.events.list.columns.id")}: {event.id}
              {event.crmId &&
                ` • ${t("cms.events.list.columns.crmId")}: ${event.crmId}`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopyUrl}
              title={t("common.copy")}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleOpenExternal}
              title={t("common.openExternal")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs text-muted-foreground mb-1">
              {t("cms.events.list.columns.eventWindow")}
            </div>
            <div className="text-xs">
              {formatDateTime(event.event_StartDate)} →{" "}
              {formatDateTime(event.event_EndDate)}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs text-muted-foreground mb-1">
              {t("cms.events.list.columns.registrationWindow")}
            </div>
            <div className="text-xs">
              {formatDateTime(event.registration_StartDate)} →{" "}
              {formatDateTime(event.registration_EndDate)}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs text-muted-foreground mb-1">
              {t("cms.events.list.columns.location")}
            </div>
            <div className="text-xs">{location}</div>
          </div>
        </div>

        {(event.Solution || event.Service) && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.Solution && (
              <Badge variant="secondary" className="text-xs">
                {t("cms.events.list.columns.solution")}: {event.Solution}
              </Badge>
            )}
            {event.Service && (
              <Badge variant="secondary" className="text-xs">
                {t("cms.events.list.columns.service")}: {event.Service}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span>
              {event.agendaItems?.length ?? 0}{" "}
              {t("cms.events.list.columns.agendaItems")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>
              {event.event_joinus_form?.length ?? 0}{" "}
              {t("cms.events.list.columns.registrations")}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDate(event.updated_at)}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function EventsListSection() {
  const { t } = useLang();
  const { getQueryParam, updateQueryParam } =
    useUpdateQueryParam("events-list");

  const page = Number(getQueryParam("page")) || 0;
  const limit = Number(getQueryParam("limit")) || 10;
  const keyword = getQueryParam("keyword") || "";
  const crmIdFilter = getQueryParam("crmId") || "";
  const nameFilter = getQueryParam("name") || "";
  const countryFilter = getQueryParam("country") || "";
  const cityFilter = getQueryParam("city") || "";
  const eventStartFilter = getQueryParam("event_StartDate") || "";
  const eventEndFilter = getQueryParam("event_EndDate") || "";
  const sortBy = getQueryParam("sort_by") || "event_StartDate";
  const sortOrder =
    (getQueryParam("sort_order") as "asc" | "desc" | null) || "asc";

  const filters = toSdkFilters(
    {
      crmId: crmIdFilter,
      name: keyword || nameFilter,
      country: countryFilter,
      city: cityFilter,
      event_StartDate: eventStartFilter,
      event_EndDate: eventEndFilter,
    },
    {
      event_StartDate: "GreaterThanOrEq",
      event_EndDate: "LessThanOrEq",
    }
  );

  const { data, isLoading } = useEventControllerReadQuery({
    query: {
      query: {
        filters,
        orders: sortBy
          ? {
              [sortBy]: sortOrder,
            }
          : undefined,
        relations: {
          agendaItems: true,
          event_joinus_form: true,
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

  const events = data?.data || [];
  const total = data?.meta?.total || events.length;
  const pagesCount = useMemo(() => {
    if (!limit) return 1;
    return Math.max(1, Math.ceil(total / limit));
  }, [limit, total]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (crmIdFilter) count += 1;
    if (nameFilter || keyword) count += 1;
    if (countryFilter) count += 1;
    if (cityFilter) count += 1;
    if (eventStartFilter) count += 1;
    if (eventEndFilter) count += 1;
    return count;
  }, [
    crmIdFilter,
    nameFilter,
    keyword,
    countryFilter,
    cityFilter,
    eventStartFilter,
    eventEndFilter,
  ]);

  const sortIndicator = useMemo(() => {
    const sortFields = [
      { key: "event_StartDate", label: t("cms.events.list.sort.eventStart") },
      { key: "event_EndDate", label: t("cms.events.list.sort.eventEnd") },
      { key: "name", label: t("cms.events.list.sort.name") },
      { key: "created_at", label: t("cms.events.list.sort.createdAt") },
      { key: "updated_at", label: t("cms.events.list.sort.updatedAt") },
    ];
    const field = sortFields.find((f) => f.key === sortBy);
    const order = sortOrder === "asc" ? t("common.asc") : t("common.desc");
    return field ? `${field.label}, ${order}` : "";
  }, [sortBy, sortOrder, t]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParam("keyword", e.target.value);
    updateQueryParam("page", "0");
  };

  const clearAllFilters = () => {
    updateQueryParam("sort_by", null);
    updateQueryParam("sort_order", null);
    updateQueryParam("crmId", null);
    updateQueryParam("name", null);
    updateQueryParam("country", null);
    updateQueryParam("city", null);
    updateQueryParam("event_StartDate", null);
    updateQueryParam("event_EndDate", null);
    updateQueryParam("keyword", null);
    updateQueryParam("page", "0");
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-muted/50 px-4 py-3 border rounded-lg">
        <div className="flex items-center justify-between w-full gap-4 flex-wrap">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <DebouncedInput
              defaultValue={keyword}
              onChange={onSearchChange}
              placeholder={t("common.search")}
              className="h-8 pl-8 pr-3 w-[200px] bg-background rounded-sm text-sm border-border focus:border-ring focus:ring-ring/50"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-border rounded-sm bg-background shadow-none hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings2 size={16} className="mr-1" />
                  {t("common.filters")}
                  {activeFiltersCount > 0 ? (
                    <Badge
                      variant="default"
                      className="h-5 px-2 text-[10px] ml-1"
                    >
                      {activeFiltersCount}
                    </Badge>
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-2 w-[280px]">
                <div className="flex flex-col gap-2">
                  <DebouncedInput
                    defaultValue={crmIdFilter}
                    onChange={(e) => {
                      updateQueryParam("crmId", e.target.value);
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.crmId")}
                    className="h-8 w-full text-xs"
                  />
                  <DebouncedInput
                    defaultValue={nameFilter}
                    onChange={(e) => {
                      updateQueryParam("name", e.target.value);
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.name")}
                    className="h-8 w-full text-xs"
                  />
                  <DebouncedInput
                    defaultValue={countryFilter}
                    onChange={(e) => {
                      updateQueryParam("country", e.target.value);
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.country")}
                    className="h-8 w-full text-xs"
                  />
                  <DebouncedInput
                    defaultValue={cityFilter}
                    onChange={(e) => {
                      updateQueryParam("city", e.target.value);
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.city")}
                    className="h-8 w-full text-xs"
                  />
                  <DatePicker
                    date={
                      eventStartFilter ? new Date(eventStartFilter) : undefined
                    }
                    onSelect={(date) => {
                      updateQueryParam(
                        "event_StartDate",
                        date ? date.toISOString() : null
                      );
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.eventStart")}
                    startMonth={new Date(1970, 11)}
                    endMonth={new Date(2099, 11)}
                    className="h-8 w-full text-xs"
                  />
                  <DatePicker
                    date={eventEndFilter ? new Date(eventEndFilter) : undefined}
                    onSelect={(date) => {
                      updateQueryParam(
                        "event_EndDate",
                        date ? date.toISOString() : null
                      );
                      updateQueryParam("page", "0");
                    }}
                    placeholder={t("cms.events.list.filters.eventEnd")}
                    startMonth={new Date(1970, 11)}
                    endMonth={new Date(2099, 11)}
                    className="h-8 w-full text-xs"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-border rounded-sm bg-background shadow-none hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowUpDown size={16} className="mr-1" />
                  {t("common.sortBy")}
                  {sortIndicator ? (
                    <Badge
                      variant="default"
                      className="h-5 px-2 text-[10px] ml-1"
                    >
                      {sortIndicator}
                    </Badge>
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="p-2 w-[280px]">
                <div className="flex flex-col gap-2">
                  <Select
                    value={sortBy || "event_StartDate"}
                    onValueChange={(val) => {
                      updateQueryParam("sort_by", val);
                      updateQueryParam("sort_order", "asc");
                      updateQueryParam("page", "0");
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder={t("common.sortField")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event_StartDate">
                        {t("cms.events.list.sort.eventStart")}
                      </SelectItem>
                      <SelectItem value="event_EndDate">
                        {t("cms.events.list.sort.eventEnd")}
                      </SelectItem>
                      <SelectItem value="name">
                        {t("cms.events.list.sort.name")}
                      </SelectItem>
                      <SelectItem value="created_at">
                        {t("cms.events.list.sort.createdAt")}
                      </SelectItem>
                      <SelectItem value="updated_at">
                        {t("cms.events.list.sort.updatedAt")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={sortOrder || "asc"}
                    onValueChange={(val) => {
                      updateQueryParam("sort_order", val);
                      updateQueryParam("page", "0");
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder={t("common.sortOrder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">{t("common.asc")}</SelectItem>
                      <SelectItem value="desc">{t("common.desc")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-destructive"
              onClick={clearAllFilters}
            >
              {t("common.clearAll")}
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="mt-2 text-lg text-muted-foreground">
            {t("common.loading")}
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="mt-2 text-lg text-muted-foreground">
            {t("common.noData")}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} t={t} />
            ))}
          </div>

          {limit && pagesCount > 1 && (
            <div className="px-4 py-3 border rounded-lg bg-card">
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8 p-0", {
                      "pointer-events-none opacity-50": page === 0,
                    })}
                    onClick={() => {
                      if (page === 0) return;
                      updateQueryParam("page", (Number(page) - 1).toString());
                    }}
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  {Array.from(
                    { length: Math.min(5, pagesCount || 0) },
                    (_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === page + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={isActive ? "default" : "ghost"}
                          size="icon"
                          className={cn(
                            "h-8 w-8 p-0 text-sm",
                            isActive && "bg-primary text-primary-foreground"
                          )}
                          onClick={() => {
                            updateQueryParam("page", (pageNum - 1).toString());
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8 p-0", {
                      "pointer-events-none opacity-50":
                        page === Number(pagesCount) - 1,
                    })}
                    onClick={() => {
                      if (page === Number(pagesCount) - 1) return;
                      updateQueryParam("page", (Number(page) + 1).toString());
                    }}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
