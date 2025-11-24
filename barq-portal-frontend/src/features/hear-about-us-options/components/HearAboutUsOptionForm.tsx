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
  createHearAboutUsOptionSchema,
  updateHearAboutUsOptionSchema,
} from "../schemas/hear-about-us-options.schema";
import type {
  CreateHearAboutUsOptionFormData,
  UpdateHearAboutUsOptionFormData,
} from "../schemas/hear-about-us-options.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";

export type HearAboutUsOptionFormProps = {
  defaultValues?: Partial<CreateHearAboutUsOptionFormData | UpdateHearAboutUsOptionFormData>;
  onSubmit: (values: CreateHearAboutUsOptionFormData | UpdateHearAboutUsOptionFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function HearAboutUsOptionForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: HearAboutUsOptionFormProps) {
  const { t } = useLang();

  const localizedCreateSchema = z.object({
    title: z.string().min(1, t("hearAboutUsOptions.validation.titleRequired")),
    contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: z
      .array(
        z.object({
          title: z
            .string()
            .min(1, t("hearAboutUsOptions.validation.translationTitleRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    title: z
      .string()
      .min(1, t("hearAboutUsOptions.validation.titleRequired"))
      .optional(),
    contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          contact_us_hear_about_drop_id: z.number().positive().optional(),
          title: z
            .string()
            .min(1, t("hearAboutUsOptions.validation.translationTitleRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateHearAboutUsOptionFormData | UpdateHearAboutUsOptionFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: [{ title: "", language: "en" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="title"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("hearAboutUsOptions.form.title")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("hearAboutUsOptions.form.titlePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("hearAboutUsOptions.form.translations")}</FormLabel>

          <FormField
            name="contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations.0.title"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("hearAboutUsOptions.form.englishTitle")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("hearAboutUsOptions.form.englishTitlePlaceholder")}
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
            ? t("hearAboutUsOptions.form.loading")
            : submitLabel || t("hearAboutUsOptions.form.save")}
        </Button>
      </form>
    </Form>
  );
}

