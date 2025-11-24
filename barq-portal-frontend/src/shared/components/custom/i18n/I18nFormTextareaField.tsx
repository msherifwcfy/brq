import { type FieldValues } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/shared/components/ui/form";
import { useI18nForm } from "./I18nFormContext";
import { type I18nFormTextareaFieldProps } from "./types";

export function I18nFormTextareaField<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  placeholder,
  disabled,
  required,
  rows = 4,
  className,
}: I18nFormTextareaFieldProps<TFieldValues>) {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              dir={currentLanguage === "ar" ? "rtl" : "ltr"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
