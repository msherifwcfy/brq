import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import {
  careerOpportunitySchema,
  type CareerOpportunityFormData,
} from "../schemas/career-opportunity.schema";
import type { CareerOpportunityEntity } from "@/sdk/types.gen";
import { useLang } from "@/shared/hooks/use-lang";

type Props = {
  defaultValues?: Partial<CareerOpportunityFormData>;
  onSubmit: (values: CareerOpportunityFormData) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
  opportunity?: CareerOpportunityEntity;
};

export function CareerOpportunityForm({
  defaultValues = {},
  onSubmit,
  isLoading,
  submitLabel = "Save",
  opportunity,
}: Props) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const enTranslation = opportunity?.career_opportunity_id_career_opportunity_translations?.find(
    (t) => t.language === "en"
  );
  const arTranslation = opportunity?.career_opportunity_id_career_opportunity_translations?.find(
    (t) => t.language === "ar"
  );

  const form = useForm<CareerOpportunityFormData>({
    resolver: zodResolver(careerOpportunitySchema),
    defaultValues: {
      name: defaultValues.name || {
        en: enTranslation?.name || opportunity?.name || "",
        ar: arTranslation?.name || "",
      },
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <I18nFormTextField
                name="name"
                control={form.control}
                label={t("cms.careers.manageItems.opportunities.form.name")}
                placeholder={t("cms.careers.manageItems.opportunities.form.namePlaceholder")}
                required
              />
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormTextField
                name="name"
                control={form.control}
                label={t("cms.careers.manageItems.opportunities.form.name")}
                placeholder={t("cms.careers.manageItems.opportunities.form.namePlaceholder")}
                required
              />
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

