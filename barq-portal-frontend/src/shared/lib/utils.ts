import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FilterOp =
  | "Contains"
  | "Eq"
  | "In"
  | "NotIn"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEq"
  | "LessThanOrEq"
  | "IsNull"
  | "IsNotNull";

export function toSdkFilters(
  values: Record<string, unknown>,
  ops?: Record<string, FilterOp>
) {
  const result: Record<string, { $val: unknown; $op: FilterOp }> = {};
  for (const key of Object.keys(values)) {
    const value = values[key];
    if (value === undefined || value === null || value === "") continue;
    const op = ops?.[key] ?? "Contains";
    result[key] = { $val: value, $op: op };
  }
  return result;
}
