import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { type LanguageCode } from "@/shared/constants";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAcademyHighlightCardSchema,
  type CreateAcademyHighlightCardFormData,
} from "../schemas/academy-highlight-card.schema";
import { useLang } from "@/shared/hooks/use-lang";

interface AcademyHighlightCardFormProps {
  onSubmit: (values: CreateAcademyHighlightCardFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  defaultValues?: Partial<CreateAcademyHighlightCardFormData>;
}

export default function AcademyHighlightCardForm({
  onSubmit,
  isLoading,
  submitLabel = "Save",
  defaultValues,
}: AcademyHighlightCardFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateAcademyHighlightCardFormData>({
    resolver: zodResolver(createAcademyHighlightCardSchema),
    defaultValues: defaultValues || {
      title: { en: "", ar: "" },
      icon: [],
      cardType: "internships",
      stat1Value: "",
      stat1Label: { en: "", ar: "" },
      stat2Value: "",
      stat2Label: { en: "", ar: "" },
      stat3Value: "",
      stat3Label: { en: "", ar: "" },
      displayOrder: 0,
    },
    mode: "onChange",
  });

  const resolvedSubmitLabel = submitLabel ?? t("common.save");
  const selectPlaceholder = t("cms.academy.highlightCards.cardTypes.placeholder");
  const stat2Label = t("cms.academy.highlightCards.form.statisticOptional", {
    number: 2,
  });
  const stat3Label = t("cms.academy.highlightCards.form.statisticOptional", {
    number: 3,
  });
  const buttonLabel = isLoading
    ? t("cms.academy.highlightCards.form.saving")
    : resolvedSubmitLabel;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.icon")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
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
            <I18nTabContent language="en">
              <I18nFormProvider currentLanguage="en">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("cms.academy.highlightCards.form.cardTitle")}
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormProvider currentLanguage="ar">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("cms.academy.highlightCards.form.cardTitle")}
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
          </I18nTabs>

          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("cms.academy.highlightCards.form.cardType")}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={selectPlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="internships">
                      {t("cms.academy.highlightCards.cardTypes.internships")}
                    </SelectItem>
                    <SelectItem value="trainings">
                      {t("cms.academy.highlightCards.cardTypes.trainings")}
                    </SelectItem>
                    <SelectItem value="seminars">
                      {t("cms.academy.highlightCards.cardTypes.seminars")}
                    </SelectItem>
                    <SelectItem value="graduates">
                      {t("cms.academy.highlightCards.cardTypes.graduates")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <FormLabel>
              {t("cms.academy.highlightCards.form.statisticRequired")}
            </FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat1Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statValueExample"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat1Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statLabelPlaceholder"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormLabel>{stat2Label}</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat2Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statValuePlaceholder"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat2Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statLabelPlaceholder"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormLabel>{stat3Label}</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat3Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statValuePlaceholder"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat3Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "cms.academy.highlightCards.form.statLabelPlaceholder"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("cms.academy.highlightCards.form.displayOrder")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {buttonLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}
