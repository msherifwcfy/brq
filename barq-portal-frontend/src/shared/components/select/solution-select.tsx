import { useMemo, useState } from "react";
import type { SolutionsControllerReadData } from "@/sdk";
import { useSolutionsControllerReadQuery } from "@/sdk/modules/solution.gen";
import { CommandSelect } from "@/shared/components/custom/CommandSelect";
import { useLang } from "@/shared/hooks/use-lang";

interface SolutionSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  size?: "sm" | "default";
  filters?: Record<string, any>;
}

export function SolutionSelect({
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  disabled = false,
  className,
  defaultValue,
  size,
  filters,
}: SolutionSelectProps) {
  const { t } = useLang();
  const [searchQuery, setSearchQuery] = useState("");

  const queryParams = useMemo(() => {
    return {
      query: {
        filters: {
          ...(filters ? filters : {}),
          name: searchQuery
            ? { $op: "Contains" as const, $val: searchQuery }
            : undefined,
        },
        pagination: {
          skip: 0,
          take: 20,
        },
      },
    } as SolutionsControllerReadData["query"];
  }, [searchQuery, filters]);

  const { data, isLoading } = useSolutionsControllerReadQuery({
    query: queryParams,
  });

  const solutions = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((solution) => ({
      id: solution.id.toString(),
      label: solution.name,
      // Include the original solution data to access any other fields if needed
      original: solution,
    }));
  }, [data?.data]);

  return (
    <CommandSelect
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
      defaultValue={defaultValue}
      className={className}
      items={solutions}
      isLoading={isLoading}
      placeholder={placeholder || t("common.selectSolution")}
      searchPlaceholder={searchPlaceholder || t("common.searchSolutions")}
      emptyMessage={t("common.noSolutionsFound")}
      loadingMessage={t("common.loadingSolutions")}
      size={size}
      onSearchChange={setSearchQuery}
      serverSideSearch={true}
      debounceDuration={500}
    />
  );
}
