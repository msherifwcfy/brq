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

import type {
  CreateAlliancesClientFormData,
  UpdateAlliancesClientFormData,
} from "../schemas/alliances-clients.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { CountrySelect, IndustrySelect } from "@/shared/components/select";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";

export type AlliancesClientFormProps = {
  defaultValues?: Partial<
    CreateAlliancesClientFormData | UpdateAlliancesClientFormData
  >;
  onSubmit: (
    values: CreateAlliancesClientFormData | UpdateAlliancesClientFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function AlliancesClientForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: AlliancesClientFormProps) {
  const { t } = useLang();

  const localizedCreateSchema = z.object({
    media: z
      .array(z.any())
      .min(1, t("alliancesClients.validation.mediaIdRequired")),
    countries_ids: z.array(z.number()
      .positive(t("alliancesClients.validation.countriesIdsRequired"))
    ),
    industries_ids: z.array(z.number()
      .positive(t("alliancesClients.validation.industriesIdsRequired"))
    ),
  });

  const localizedUpdateSchema = z.object({
    media: z.array(z.any()).optional(),
    countries_ids: z.array(z.number()
      .positive(t("alliancesClients.validation.countriesIdsRequired"))
    ).optional(),
    industries_ids: z.array(z.number()
      .positive(t("alliancesClients.validation.industriesIdsRequired"))
    ).optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      media: defaultValues?.media ? defaultValues?.media : undefined,
      countries_ids: defaultValues?.countries_ids?.map((country) => Number(country)) || [],
      industries_ids: defaultValues?.industries_ids?.map((industry) => Number(industry)) || [],
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const handleFormSubmit = (values: any) => {
    const formData = {
      ...values,
      media_id: values.media?.[0]?.id,
    };
    onSubmit(formData);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          name="media"
          control={control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("alliancesClients.form.mediaId")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  disabled={isLoading}
                  layout="single"
                  multiple={false}
                  maxDocuments={1}
                  placeholder={t("alliancesClients.form.mediaIdPlaceholder")}
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
          name="countries_ids"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("alliancesClients.form.countryId")}</FormLabel>
              <FormControl>
                <CountrySelect
                  multiple={true}
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((id) => String(id))
                      : field.value
                  }
                  onValueChange={(value) => {
                    if (Array.isArray(value)) {
                      field.onChange(value.map((v) => Number(v)));
                    } else {
                      field.onChange(value ? [Number(value)] : []);
                    }
                  }}
                  disabled={isLoading}
                  placeholder={t("alliancesClients.form.countryIdPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="industries_ids"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("alliancesClients.form.industriesId")}</FormLabel>
              <FormControl>
                <IndustrySelect
                  multiple={true}
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((id) => String(id))
                      : field.value
                  }
                  onValueChange={(value) => {
                    if (Array.isArray(value)) {
                      field.onChange(value.map((v) => Number(v)));
                    } else {
                      field.onChange(value ? [Number(value)] : []);
                    }
                  }}
                  disabled={isLoading}
                  placeholder={t(
                    "alliancesClients.form.industriesIdPlaceholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("alliancesClients.form.loading")
            : submitLabel || t("alliancesClients.form.save")}
        </Button>
      </form>
    </Form>
  );
}
