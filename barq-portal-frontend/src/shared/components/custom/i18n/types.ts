import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { type LanguageCode } from "../../../constants";

// Form-level i18n field props (no individual tabs)
export interface I18nFormFieldProps<
  TFieldValues extends FieldValues = FieldValues
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface I18nFormTextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues
> extends I18nFormFieldProps<TFieldValues> {
  rows?: number;
}

export interface I18nTabsProps {
  children: React.ReactNode;
  className?: string;
  value?: LanguageCode;
  onValueChange?: (value: LanguageCode) => void;
}

export interface I18nTabContentProps {
  language: LanguageCode;
  children: React.ReactNode;
  className?: string;
}
