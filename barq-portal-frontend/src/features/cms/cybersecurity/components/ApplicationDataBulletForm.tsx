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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Button } from "@/shared/components/ui/button";
import {
  createApplicationDataBulletSchema,
  type CreateApplicationDataBulletFormData,
} from "../schemas/application-data.schema";

interface ApplicationDataBulletFormProps {
  onSubmit: (data: CreateApplicationDataBulletFormData) => void;
  isLoading: boolean;
  submitLabel: string;
  defaultValues?: Partial<CreateApplicationDataBulletFormData>;
}

export function ApplicationDataBulletForm({
  onSubmit,
  isLoading,
  submitLabel,
  defaultValues,
}: ApplicationDataBulletFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateApplicationDataBulletFormData>({
    resolver: zodResolver(createApplicationDataBulletSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      icon: [],
      side: "left",
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

        <FormField
          control={form.control}
          name="side"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.cybersecurity.applicationData.bullets.columns.side")}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t(
                        "cms.cybersecurity.applicationData.bullets.columns.side"
                      )}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="left">
                    {t(
                      "cms.cybersecurity.applicationData.bullets.columns.left"
                    )}
                  </SelectItem>
                  <SelectItem value="right">
                    {t(
                      "cms.cybersecurity.applicationData.bullets.columns.right"
                    )}
                  </SelectItem>
                </SelectContent>
              </Select>
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
