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
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Button } from "@/shared/components/ui/button";
import {
  createIdentityManagementCardSchema,
  type CreateIdentityManagementCardFormData,
} from "../schemas/identity-management.schema";

interface IdentityManagementCardFormProps {
  onSubmit: (data: CreateIdentityManagementCardFormData) => void;
  isLoading: boolean;
  submitLabel: string;
  defaultValues?: Partial<CreateIdentityManagementCardFormData>;
}

export function IdentityManagementCardForm({
  onSubmit,
  isLoading,
  submitLabel,
  defaultValues,
}: IdentityManagementCardFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateIdentityManagementCardFormData>({
    resolver: zodResolver(createIdentityManagementCardSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      icon: [],
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
                  name="title"
                  control={form.control}
                  label={t("common.title")}
                  placeholder={t("common.title")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("common.title")}
                  placeholder={t("common.title")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"icon" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.icon")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={1}
                  maxSize={5 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={field.onChange}
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
