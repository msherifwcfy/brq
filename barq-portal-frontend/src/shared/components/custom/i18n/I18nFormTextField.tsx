import { type FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/shared/components/ui/form";
import { useI18nForm } from "./I18nFormContext";
import { type I18nFormFieldProps } from "./types";

export function I18nFormTextField<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  className,
}: I18nFormFieldProps<TFieldValues>) {
  const { currentLanguage } = useI18nForm();

  return (
    <FormField
      control={control}
      name={`${name}.${currentLanguage}` as any}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
