import { useMemo, useState } from "react";
import type { IndustriesControllerReadData } from "@/sdk";
import { useIndustriesControllerReadQuery } from "@/sdk/modules/industry.gen";
import { CommandSelect } from "@/shared/components/custom/CommandSelect";
import { useLang } from "@/shared/hooks/use-lang";

interface IndustrySelectProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string | string[];
  size?: "sm" | "default";
  filters?: Record<string, any>;
}

export function IndustrySelect({
  value,
  onValueChange,
  multiple = false,
  placeholder,
  searchPlaceholder,
  disabled = false,
  className,
  defaultValue,
  size,
  filters,
}: IndustrySelectProps) {
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
    } as IndustriesControllerReadData["query"];
  }, [searchQuery, filters]);

  const { data, isLoading } = useIndustriesControllerReadQuery({
    query: queryParams,
  });

  const industries = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((industry) => ({
      id: industry.id.toString(),
      label: industry.name,
      // Include the original industry data to access any other fields if needed
      original: industry,
    }));
  }, [data?.data]);

  return (
    <CommandSelect
      value={value}
      multiple={multiple}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
      defaultValue={defaultValue}
      className={className}
      items={industries}
      isLoading={isLoading}
      placeholder={placeholder || t("common.selectIndustry")}
      searchPlaceholder={searchPlaceholder || t("common.searchIndustries")}
      emptyMessage={t("common.noIndustriesFound")}
      loadingMessage={t("common.loadingIndustries")}
      size={size}
      onSearchChange={setSearchQuery}
      serverSideSearch={true}
      debounceDuration={500}
    />
  );
}
