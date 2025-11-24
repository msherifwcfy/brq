import { useMemo, useState } from "react";
import type { CountryControllerReadData } from "@/sdk";
import { useCountryControllerReadQuery } from "@/sdk/modules/country.gen";
import { CommandSelect } from "@/shared/components/custom/CommandSelect";
import { useLang } from "@/shared/hooks/use-lang";

interface CountrySelectProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string | string[];
  size?: "sm" | "default";
  filters?: Record<string, any>;
  multiple?: boolean;
}

export function CountrySelect({
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  disabled = false,
  multiple = false,
  className,
  defaultValue,
  size,
  filters,
}: CountrySelectProps) {
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
    } as CountryControllerReadData["query"];
  }, [searchQuery, filters]);

  const { data, isLoading } = useCountryControllerReadQuery({
    query: queryParams,
  });

  const countries = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((country) => ({
      id: country.id.toString(),
      label: country.name,
      // Include the original country data to access any other fields if needed
      original: country,
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
      items={countries}
      isLoading={isLoading}
      placeholder={placeholder || t("common.selectCountry")}
      searchPlaceholder={searchPlaceholder || t("common.searchCountries")}
      emptyMessage={t("common.noCountriesFound")}
      loadingMessage={t("common.loadingCountries")}
      size={size}
      onSearchChange={setSearchQuery}
      serverSideSearch={true}
      debounceDuration={500}
    />
  );
}
