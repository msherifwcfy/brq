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
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";

const createFooterLocationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(10, "Name must be at least 10 characters")
    .max(35, "Name must not exceed 35 characters")
    .regex(/^[a-zA-Z0-9\s\-.,()]+$/, {
      message:
        "Name can only contain letters, numbers, spaces, hyphens, periods, commas, and parentheses",
    }),
  footer_locations_id_footer_locations_translations: z
    .array(
      z.object({
        language: z.string().min(1, "Language is required"),
        name: z
          .string()
          .min(1, "Translation name is required")
          .min(10, "Translation name must be at least 10 characters")
          .max(35, "Translation name must not exceed 35 characters")
          .regex(/^[a-zA-Z0-9\s\-.,()]+$/, {
            message:
              "Translation name can only contain letters, numbers, spaces, hyphens, periods, commas, and parentheses",
          }),
      })
    )
    .optional(),
});

const updateFooterLocationSchema = createFooterLocationSchema;

type CreateFooterLocationFormData = z.infer<typeof createFooterLocationSchema>;
type UpdateFooterLocationFormData = z.infer<typeof updateFooterLocationSchema>;

type Props = {
  defaultValues?: Partial<CreateFooterLocationFormData>;
  onSubmit: (values: CreateFooterLocationFormData) => void;
  isLoading?: boolean;
  submitLabel: string;
  isUpdate?: boolean;
};

export function FooterLocationForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate,
}: Props) {
  const { t } = useLang();
  const schema = isUpdate
    ? updateFooterLocationSchema
    : createFooterLocationSchema;

  const methods = useForm<CreateFooterLocationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      footer_locations_id_footer_locations_translations: [],
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
              <FormLabel>{t("footerLocations.form.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("footerLocations.form.namePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={isLoading} className="w-full">
          {isLoading ? t("common.loading") : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
