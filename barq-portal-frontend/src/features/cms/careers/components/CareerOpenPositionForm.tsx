import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import {
  careerOpenPositionSchema,
  type CareerOpenPositionFormData,
} from "../schemas/career-open-position.schema";
import type { CareerOpenPositionEntity } from "@/sdk/types.gen";
import { useCareerOpportunityControllerReadQuery } from "@/sdk/modules/careeropportunity.gen";
import { useCareerCategoryControllerReadQuery } from "@/sdk/modules/careercategory.gen";
import { useCityControllerReadQuery, useCityControllerReadOneQuery } from "@/sdk/modules/city.gen";
import { CountrySelect } from "@/shared/components/select/country-select";
import { useLang } from "@/shared/hooks/use-lang";
import DatePicker from "@/shared/components/custom/DatePicker";

type Props = {
  onSubmit: (values: CareerOpenPositionFormData) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
  position?: CareerOpenPositionEntity;
};

export function CareerOpenPositionForm({
  onSubmit,
  isLoading,
  submitLabel = "Save",
  position,
}: Props) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data: opportunitiesData } = useCareerOpportunityControllerReadQuery({
    query: {
      query: {
        relations: {
          career_opportunity_id_career_opportunity_translations: true,
        },
        pagination: { take: 100, skip: 0 },
      },
    },
  });

  const { data: categoriesData } = useCareerCategoryControllerReadQuery({
    query: {
      query: {
        relations: {
          career_category_id_career_category_translations: true,
        },
        pagination: { take: 100, skip: 0 },
      },
    },
  });



  const opportunities = opportunitiesData?.data || [];
  const categories = categoriesData?.data || [];

  const { data: existingCityData } = useCityControllerReadOneQuery(
    {
      path: {
        id: position?.city_id?.toString() || "",
      },
      query: {
        query: {
          relations: {
            country: true,
          },
        },
      },
    }
  );

  const enTranslation = position?.career_open_position_id_career_open_position_translations?.find(
    (t) => t.language === "en"
  );

  const form = useForm<CareerOpenPositionFormData>({
    resolver: zodResolver(careerOpenPositionSchema),
    defaultValues: {
      job_title: {
        en: enTranslation?.job_title  || "",
        ar: position?.job_title || "",
      },
      job_description: {
        en: enTranslation?.job_description  || "",
        ar: position?.job_description || "",
      },
      opening_date: position?.opening_date ? new Date(position?.opening_date) : undefined,
      closing_date: position?.closing_date ? new Date(position?.closing_date) : undefined,
      status: (position?.status as "OPEN" | "CLOSED") || "OPEN",
      country_id: undefined,
      city_id: position?.city_id,
      career_opportunity_id: position?.career_opportunity_id,
      career_category_id: position?.career_category_id,
    },
  });

  useEffect(() => {
    if (existingCityData?.data?.country_id && !form.getValues("country_id")) {
      form.setValue("country_id", existingCityData.data.country_id);
    }
  }, [existingCityData?.data?.country_id, form]);

  const selectedCountryId = form.watch("country_id");

  const { data: citiesData } = useCityControllerReadQuery({
    query: {
      query: {
        relations: {
          city_id_city_translations: true,
        },
        filters: {
          country: {
            id: {
              $op: "Eq",
              $val: selectedCountryId,
            },
          },
        },
        pagination: { take: 100, skip: 0 },
      },
    },
  });
  const cities = citiesData?.data || [];


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
            <I18nTabContent className="space-y-4" language="en">
              <I18nFormTextField
                name="job_title"
                control={form.control}
                label={t("cms.careers.openPositions.form.jobTitle")}
                placeholder={t("cms.careers.openPositions.form.jobTitlePlaceholder")}
                required
              />
              <I18nFormTextareaField
                name="job_description"
                control={form.control}
                label={t("cms.careers.openPositions.form.jobDescription")}
                placeholder={t("cms.careers.openPositions.form.jobDescriptionPlaceholder")}
                required
                rows={6}
              />
            </I18nTabContent>
            <I18nTabContent className="space-y-4" language="ar">
              <I18nFormTextField
                name="job_title"
                control={form.control}
                label={t("cms.careers.openPositions.form.jobTitle")}
                placeholder={t("cms.careers.openPositions.form.jobTitlePlaceholder")}
                required
              />
              <I18nFormTextareaField
                name="job_description"
                control={form.control}
                label={t("cms.careers.openPositions.form.jobDescription")}
                placeholder={t("cms.careers.openPositions.form.jobDescriptionPlaceholder")}
                required
                rows={6}
              />
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="opening_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.careers.openPositions.form.openingDate")}</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closing_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.careers.openPositions.form.closingDate")}</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

<div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.openPositions.form.status")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("cms.careers.openPositions.form.statusPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN">OPEN</SelectItem>
                  <SelectItem value="CLOSED">CLOSED</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="career_opportunity_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.openPositions.form.careerOpportunity")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("cms.careers.openPositions.form.careerOpportunityPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {opportunities.map((opp) => {
                    const enTranslation = opp.career_opportunity_id_career_opportunity_translations?.find(
                      (t) => t.language === "en"
                    );
                    return (
                      <SelectItem key={opp.id} value={opp.id.toString()}>
                        {enTranslation?.name || opp.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
<div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="career_category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.openPositions.form.careerCategory")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("cms.careers.openPositions.form.careerCategoryPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => {
                    const enTranslation = cat.career_category_id_career_category_translations?.find(
                      (t) => t.language === "en"
                    );
                    return (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {enTranslation?.name || cat.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.openPositions.form.country")}</FormLabel>
              <FormControl>
                <CountrySelect
                  value={field.value?.toString()}
                  onValueChange={(value) => {
                    field.onChange(value ? Number(value) : undefined);
                    form.setValue("city_id", undefined);
                  }}
                  placeholder={t("cms.careers.openPositions.form.countryPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
<div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.openPositions.form.city")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
                disabled={!selectedCountryId}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("cms.careers.openPositions.form.cityPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => {
                  
                    return (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

