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
import { useLang } from "@/shared/hooks/use-lang";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import {
  createLandingNumbersSchema,
  updateLandingNumbersSchema,
} from "../schemas/landing-numbers.schema";

type Props = {
  defaultValues?: Partial<{
    number: number;
    label: { en: string; ar: string };
  }>;
  onSubmit: (values: {
    number: number;
    label: { en: string; ar: string };
  }) => void;
  isLoading?: boolean;
  submitLabel: string;
  isUpdate?: boolean;
};

export function WhoWeAreStatForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate,
}: Props) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const schema = isUpdate
    ? updateLandingNumbersSchema
    : createLandingNumbersSchema;
  const methods = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: {
      number: 0,
      label: { en: "", ar: "" },
      ...defaultValues,
    } as any,
    mode: "onChange",
  });

  const { handleSubmit, control } = methods as any;

  return (
    <Form {...(methods as any)}>
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            name={"number" as any}
            control={control}
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>
                  {t("cms.homePage.whoWeAreStats.form.number")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value as any}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value || 0))
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <I18nFormTextField
                  name="label"
                  control={control}
                  label={t("cms.homePage.whoWeAreStats.form.label")}
                  required
                />
              </I18nTabContent>
              <I18nTabContent language="ar">
                <I18nFormTextField
                  name="label"
                  control={control}
                  label={t("cms.homePage.whoWeAreStats.form.label")}
                  required
                />
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
        </div>
        <Button type="submit" loading={isLoading} className="w-full">
          {isLoading ? t("common.loading") : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
