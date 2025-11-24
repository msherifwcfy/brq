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
  createCitySchema,
  updateCitySchema,
} from "../schemas/cities.schema";
import type {
  CreateCityFormData,
  UpdateCityFormData,
} from "../schemas/cities.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";
import { CountrySelect } from "@/shared/components/select/country-select";

export type CityFormProps = {
  defaultValues?: Partial<CreateCityFormData | UpdateCityFormData>;
  onSubmit: (values: CreateCityFormData | UpdateCityFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function CityForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: CityFormProps) {
  const { t } = useLang();

  const localizedCreateSchema = z.object({
    name: z.string().min(1, t("cities.validation.cityNameRequired")),
    country_id: z.number().positive(t("cities.validation.countryRequired")),
    city_id_city_translations: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, t("cities.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    name: z
      .string()
      .min(1, t("cities.validation.cityNameRequired"))
      .optional(),
    country_id: z.number().positive(t("cities.validation.countryRequired")).optional(),
    city_id_city_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          city_id: z.number().positive().optional(),
          name: z
            .string()
            .min(1, t("cities.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateCityFormData | UpdateCityFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      country_id: undefined,
      city_id_city_translations: [{ name: "", language: "en" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control, setValue, watch } = methods;
  const countryId = watch("country_id");

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="country_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cities.form.country")}</FormLabel>
              <FormControl>
                <CountrySelect
                  value={countryId?.toString()}
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    setValue("country_id", Number(value), {
                      shouldValidate: true,
                    });
                  }}
                  placeholder={t("cities.form.countryPlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cities.form.cityName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("cities.form.cityNamePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("cities.form.translations")}</FormLabel>

          <FormField
            name="city_id_city_translations.0.name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cities.form.englishName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("cities.form.englishNamePlaceholder")}
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
            ? t("cities.form.loading")
            : submitLabel || t("cities.form.save")}
        </Button>
      </form>
    </Form>
  );
}

