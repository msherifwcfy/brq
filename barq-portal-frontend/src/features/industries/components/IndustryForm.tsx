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
  createIndustrySchema,
  updateIndustrySchema,
} from "../schemas/industries.schema";
import type {
  CreateIndustryFormData,
  UpdateIndustryFormData,
} from "../schemas/industries.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";

export type IndustryFormProps = {
  defaultValues?: Partial<CreateIndustryFormData | UpdateIndustryFormData>;
  onSubmit: (values: CreateIndustryFormData | UpdateIndustryFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function IndustryForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: IndustryFormProps) {
  const { t } = useLang();

  // Create localized schemas
  const localizedCreateSchema = z.object({
    name: z.string().min(1, t("industries.validation.industryNameRequired")),
    industry_id_industry_translations: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, t("industries.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    name: z
      .string()
      .min(1, t("industries.validation.industryNameRequired"))
      .optional(),
    industry_id_industry_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          industry_id: z.number().positive().optional(),
          name: z
            .string()
            .min(1, t("industries.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateIndustryFormData | UpdateIndustryFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      industry_id_industry_translations: [{ name: "", language: "en" }],
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
              <FormLabel>{t("industries.form.industryName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("industries.form.industryNamePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("industries.form.translations")}</FormLabel>

          <FormField
            name="industry_id_industry_translations.0.name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("industries.form.englishName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("industries.form.englishNamePlaceholder")}
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
            ? t("industries.form.loading")
            : submitLabel || t("industries.form.save")}
        </Button>
      </form>
    </Form>
  );
}
