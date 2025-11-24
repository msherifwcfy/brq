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
  createRequestTypeSchema,
  updateRequestTypeSchema,
} from "../schemas/request-types.schema";
import type {
  CreateRequestTypeFormData,
  UpdateRequestTypeFormData,
} from "../schemas/request-types.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";

export type RequestTypeFormProps = {
  defaultValues?: Partial<CreateRequestTypeFormData | UpdateRequestTypeFormData>;
  onSubmit: (values: CreateRequestTypeFormData | UpdateRequestTypeFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function RequestTypeForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: RequestTypeFormProps) {
  const { t } = useLang();

  const localizedCreateSchema = z.object({
    title: z.string().min(1, t("requestTypes.validation.titleRequired")),
    contact_us_request_type_id_contact_us_request_type_translations: z
      .array(
        z.object({
          title: z
            .string()
            .min(1, t("requestTypes.validation.translationTitleRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    title: z
      .string()
      .min(1, t("requestTypes.validation.titleRequired"))
      .optional(),
    contact_us_request_type_id_contact_us_request_type_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          contact_us_request_type_id: z.number().positive().optional(),
          title: z
            .string()
            .min(1, t("requestTypes.validation.translationTitleRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateRequestTypeFormData | UpdateRequestTypeFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      contact_us_request_type_id_contact_us_request_type_translations: [{ title: "", language: "en" }],
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
              <FormLabel>{t("requestTypes.form.title")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("requestTypes.form.titlePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("requestTypes.form.translations")}</FormLabel>

          <FormField
            name="contact_us_request_type_id_contact_us_request_type_translations.0.title"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("requestTypes.form.englishTitle")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("requestTypes.form.englishTitlePlaceholder")}
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
            ? t("requestTypes.form.loading")
            : submitLabel || t("requestTypes.form.save")}
        </Button>
      </form>
    </Form>
  );
}
