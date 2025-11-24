import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createCountrySchema,
  updateCountrySchema,
} from "../schemas/countries.schema";
import type {
  CreateCountryFormData,
  UpdateCountryFormData,
} from "../schemas/countries.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";

export type CountryFormProps = {
  defaultValues?: Partial<CreateCountryFormData | UpdateCountryFormData>;
  onSubmit: (values: CreateCountryFormData | UpdateCountryFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function CountryForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: CountryFormProps) {
  const { t } = useLang();

  // Create localized schemas
  const localizedCreateSchema = z.object({
    name: z.string().min(1, t("countries.validation.countryNameRequired")),
    country_id_country_translations: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, t("countries.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    name: z
      .string()
      .min(1, t("countries.validation.countryNameRequired"))
      .optional(),
    country_id_country_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          country_id: z.number().positive().optional(),
          name: z
            .string()
            .min(1, t("countries.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateCountryFormData | UpdateCountryFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      country_id_country_translations: [{ name: "", language: "en" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("countries.form.countryName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("countries.form.countryNamePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("countries.form.translations")}</FormLabel>

          <FormField
            name="country_id_country_translations.0.name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("countries.form.englishName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("countries.form.englishNamePlaceholder")}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("countries.form.loading")
            : submitLabel || t("countries.form.save")}
        </Button>
      </form>
    </Form>
  );
}
