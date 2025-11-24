import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAlliancesVendorSchema,
  updateAlliancesVendorSchema,
} from "../schemas/alliances-vendors.schema";
import type {
  CreateAlliancesVendorFormData,
  UpdateAlliancesVendorFormData,
} from "../schemas/alliances-vendors.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { CountrySelect, SolutionSelect } from "@/shared/components/select";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";

export type AlliancesVendorFormProps = {
  defaultValues?: Partial<
    CreateAlliancesVendorFormData | UpdateAlliancesVendorFormData
  >;
  onSubmit: (
    values: CreateAlliancesVendorFormData | UpdateAlliancesVendorFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function AlliancesVendorForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: AlliancesVendorFormProps) {
  const { t } = useLang();

  // Create localized schemas with document validation
  const localizedCreateSchema = z.object({
    media: z
      .array(z.any())
      .min(1, t("alliancesVendors.validation.mediaIdRequired")),
    country_id: z
      .number()
      .positive(t("alliancesVendors.validation.countryIdRequired")),
    solutions_id: z
      .number()
      .positive(t("alliancesVendors.validation.solutionsIdRequired")),
  });

  const localizedUpdateSchema = z.object({
    media: z.array(z.any()).optional(),
    country_id: z
      .number()
      .positive(t("alliancesVendors.validation.countryIdRequired"))
      .optional(),
    solutions_id: z
      .number()
      .positive(t("alliancesVendors.validation.solutionsIdRequired"))
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      media: defaultValues?.media ? defaultValues?.media : undefined,
      country_id: defaultValues?.country_id || 0,
      solutions_id: defaultValues?.solutions_id || 0,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const handleFormSubmit = (values: any) => {
    const formData = {
      ...values,
      media_id: values.media?.[0]?.id,
    };
    delete formData.media;
    onSubmit(formData);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          name="media"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("alliancesVendors.form.mediaId")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  disabled={isLoading}
                  multiple={false}
                  maxDocuments={1}
                  layout="single"
                  placeholder={t("alliancesVendors.form.mediaIdPlaceholder")}
                  acceptedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="country_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("alliancesVendors.form.countryId")}</FormLabel>
              <FormControl>
                <CountrySelect
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isLoading}
                  placeholder={t("alliancesVendors.form.countryIdPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="solutions_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("alliancesVendors.form.solutionsId")}</FormLabel>
              <FormControl>
                <SolutionSelect
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isLoading}
                  placeholder={t(
                    "alliancesVendors.form.solutionsIdPlaceholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("alliancesVendors.form.loading")
            : submitLabel || t("alliancesVendors.form.save")}
        </Button>
      </form>
    </Form>
  );
}
