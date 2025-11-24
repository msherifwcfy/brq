import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  createNetworkSectionCardSchema,
  type CreateNetworkSectionCardFormData,
} from "../schemas/network-section.schema";

interface NetworkSectionCardFormProps {
  onSubmit: (data: CreateNetworkSectionCardFormData) => void;
  isLoading: boolean;
  submitLabel: string;
  defaultValues?: Partial<CreateNetworkSectionCardFormData>;
  isUpdate?: boolean;
}

export function NetworkSectionCardForm({
  onSubmit,
  isLoading,
  submitLabel,
  defaultValues,
  isUpdate = false,
}: NetworkSectionCardFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateNetworkSectionCardFormData>({
    resolver: zodResolver(createNetworkSectionCardSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      icon: [],
      row_number: 1,
      position: 1,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="text"
                  control={form.control}
                  label={t("common.text")}
                  placeholder={t("common.text")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="text"
                  control={form.control}
                  label={t("common.text")}
                  placeholder={t("common.text")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"icon"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.icon")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={Array.isArray(field.value) ? (field.value as any) : []}
                  maxDocuments={1}
                  maxSize={5 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={(val) => {
                    field.onChange(val);
                    form.trigger("icon");
                  }}
                />
              </FormControl>
              <FormMessage />
              {Array.isArray((form.formState.errors as any)?.icon) &&
                (form.formState.errors as any).icon.some(Boolean) && (
                  <p className="text-sm font-medium text-destructive">
                    {((form.formState.errors as any).icon.find(Boolean)?.message as
                      string) || t("validation.required")}
                  </p>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="row_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.cybersecurity.networkSection.rowNumber")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={2}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.cybersecurity.networkSection.position")}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full gap-2">
          <Button type="submit" loading={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
