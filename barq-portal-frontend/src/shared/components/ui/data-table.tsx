import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings2,
} from "lucide-react";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";
import { cn } from "@/shared/lib/utils";
import { useLang } from "@/shared/hooks/use-lang";
import { Button } from "./button";
import { DebouncedInput } from "./debounced-input";
import { Input } from "./input";
import { Badge } from "./badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import DatePicker from "../custom/DatePicker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowClicked?: (id: number) => void;
  headConfig?: string;
  bodyRowsConfig?: string;
  pagesCount?: number;
  page?: number;
  limit?: number;
  loading?: boolean;
  tableId?: string;
  filters?: boolean;
  hideSearch?: boolean;
  filtersConfig?: {
    fields: Array<{
      key: string;
      label: string;
      type?: "text" | "select" | "date" | "number";
      options?: Array<{ label: string; value: string | number }>;
      valueParam?: string;
    }>;
    values?: Record<string, string | number>;
  };
  sortConfig?: {
    fields: Array<{
      key: string;
      label: string;
    }>;
    defaultBy?: string;
    defaultOrder?: "asc" | "desc";
  };
}

export function DataTable<TData, TValue>({
  headConfig,
  bodyRowsConfig,
  rowClicked,
  columns,
  data,
  pagesCount,
  page = 0,
  limit,
  loading,
  filters,
  tableId,
  hideSearch,
  filtersConfig,
  sortConfig,
}: DataTableProps<TData, TValue>) {
  const { t } = useLang();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: limit ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    if (!limit) return;
    table.setPageSize(limit);
  }, [limit, table]);

  React.useEffect(() => {
    if (page !== 0) return;
    table.setPageCount(1);
  }, [page, table]);

  const { updateQueryParam, getQueryParam } = useUpdateQueryParam(tableId);
  const defaultKeyword = getQueryParam("keyword");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParam("keyword", e.target.value);
    updateQueryParam("page", "0");
  };

  const activeFiltersCount = React.useMemo(() => {
    if (!filtersConfig?.fields?.length) return 0;
    let count = 0;
    for (const field of filtersConfig.fields) {
      const paramKey = field.valueParam || field.key;
      const val = getQueryParam(paramKey);
      if (val !== null && val !== "") count += 1;
    }
    return count;
  }, [filtersConfig?.fields, getQueryParam]);

  const sortIndicator = React.useMemo(() => {
    if (!sortConfig) return "";
    const sortByParam = getQueryParam("sort_by");
    const sortOrderParam = getQueryParam("sort_order") as "asc" | "desc" | null;
    if (!sortByParam && !sortOrderParam) return "";
    const label =
      sortConfig.fields.find((f) => f.key === sortByParam)?.label ||
      sortByParam ||
      "";
    const order = sortOrderParam
      ? sortOrderParam === "asc"
        ? t("common.asc")
        : t("common.desc")
      : "";
    return `${label}${order ? `, ${order}` : ""}`.trim();
  }, [sortConfig, getQueryParam, t]);

  return (
    <div className="w-full">
      <div className="rounded-lg w-full overflow-hidden">
        {/* Header Section with Filters and Search */}
        {(filters || !hideSearch) && (
          <div className="bg-muted/50 px-2 py-2 border-b border-border">
            <div className="flex items-center justify-between w-full gap-4">
              {!hideSearch && (
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <DebouncedInput
                    defaultValue={defaultKeyword}
                    onChange={onSearchChange}
                    placeholder={t("common.search")}
                    className="h-8 pl-8 pr-3 w-[200px] bg-background rounded-sm text-sm border-border focus:border-ring focus:ring-ring/50"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                {filters ? (
                  <DropdownMenu>
                    <div className="flex items-center gap-1">
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
                              className="h-5 px-2 text-[10px]"
                            >
                              {activeFiltersCount}
                            </Badge>
                          ) : null}
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent
                      align="start"
                      className="p-2 w-[280px]"
                    >
                      <div className="flex flex-col gap-2">
                        {filtersConfig?.fields?.map((field) => {
                          const paramKey = field.valueParam || field.key;
                          const initialValue =
                            (filtersConfig?.values?.[field.key] as
                              | string
                              | number
                              | undefined) ??
                            getQueryParam(paramKey) ??
                            "";

                          if (field.type === "select" && field.options) {
                            return (
                              <Select
                                key={field.key}
                                value={String(initialValue)}
                                onValueChange={(val) => {
                                  updateQueryParam(paramKey, val);
                                  updateQueryParam("page", "0");
                                }}
                              >
                                <SelectTrigger className="h-8 w-full text-xs">
                                  <SelectValue placeholder={field.label} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options.map((opt) => (
                                    <SelectItem
                                      key={String(opt.value)}
                                      value={String(opt.value)}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            );
                          }

                          if (field.type === "number") {
                            return (
                              <Input
                                key={field.key}
                                type="number"
                                defaultValue={String(initialValue)}
                                onChange={(e) => {
                                  updateQueryParam(paramKey, e.target.value);
                                  updateQueryParam("page", "0");
                                }}
                                placeholder={field.label}
                                className="h-8 w-full text-xs"
                              />
                            );
                          }

                          if (field.type === "date") {
                            return (
                              <DatePicker
                                key={field.key}
                                date={
                                  initialValue
                                    ? new Date(String(initialValue))
                                    : undefined
                                }
                                onSelect={(date) => {
                                  updateQueryParam(
                                    paramKey,
                                    date ? date.toISOString() : null
                                  );
                                  updateQueryParam("page", "0");
                                }}
                                placeholder={field.label}
                                startMonth={new Date(1970, 11)}
                                endMonth={new Date(2099, 11)}
                                className="h-8 w-full text-xs"
                              />
                            );
                          }

                          return (
                            <DebouncedInput
                              key={field.key}
                              autoFocus
                              defaultValue={String(initialValue)}
                              onChange={(e) => {
                                updateQueryParam(
                                  paramKey,
                                  String(e.target.value)
                                );
                                updateQueryParam("page", "0");
                              }}
                              placeholder={field.label}
                              className="h-8 w-full text-xs"
                            />
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div />
                )}
                {sortConfig ? (
                  <DropdownMenu>
                    <div className="flex items-center gap-1">
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
                              className="h-5 px-2 text-[10px]"
                            >
                              {sortIndicator}
                            </Badge>
                          ) : null}
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent
                      align="start"
                      className="p-2 w-[280px]"
                    >
                      <div className="flex flex-col gap-2">
                        <Select
                          value={
                            getQueryParam("sort_by") ||
                            sortConfig.defaultBy ||
                            ""
                          }
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
                            {sortConfig.fields.map((f) => (
                              <SelectItem key={f.key} value={f.key}>
                                {f.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={
                            (getQueryParam("sort_order") as "asc" | "desc") ||
                            sortConfig.defaultOrder ||
                            "asc"
                          }
                          onValueChange={(val) => {
                            updateQueryParam("sort_order", val);
                            updateQueryParam("page", "0");
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue placeholder={t("common.sortOrder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">
                              {t("common.asc")}
                            </SelectItem>
                            <SelectItem value="desc">
                              {t("common.desc")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div />
                )}
                {sortConfig || filtersConfig ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-destructive"
                    onClick={() => {
                      updateQueryParam("sort_by", null);
                      updateQueryParam("sort_order", null);
                      filtersConfig?.fields?.forEach((field) => {
                        const paramKey = field.valueParam || field.key;
                        updateQueryParam(paramKey, null);
                      });
                      updateQueryParam("page", "0");
                    }}
                  >
                    {t("common.clearAll")}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mt-2 text-2xl text-muted-foreground">
              {t("common.loading")}
            </p>
          </div>
        ) : (
          <Table className="border-none">
            <TableHeader className="h-12 bg-card border-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={`${headerGroup.id}${tableId}`}
                  className={headConfig}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={`${header.id}${tableId}`}
                        className="text-muted-foreground text-xs border-t-none font-medium px-6 py-0 border-b border-r border-border last:border-r-0"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    className={cn(
                      bodyRowsConfig || "",
                      index % 2 === 0 ? "bg-card" : "bg-muted/30",
                      "border-b border-border hover:bg-accent/50 transition-colors"
                    )}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={`${cell.id}${tableId}`}
                        id={`${cell.id}${tableId}`}
                        onClick={() => {
                          if (rowClicked && cell.column.getIndex() === 0) {
                            rowClicked(
                              (row.original as any)?.id || row.getValue("id")
                            );
                          }
                        }}
                        className={cn(
                          "text-foreground px-6 py-2 text-sm font-normal border-r border-border last:border-r-0",
                          rowClicked && cell.column.getIndex() === 0
                            ? "hover:underline cursor-pointer text-primary hover:text-primary/80"
                            : ""
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {t("common.noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {limit && pagesCount ? (
        <div className="px-4 py-2 border-t border-border rounded-b-lg bg-card">
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

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, pagesCount || 0) }, (_, i) => {
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
              })}

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
      ) : null}
    </div>
  );
}
