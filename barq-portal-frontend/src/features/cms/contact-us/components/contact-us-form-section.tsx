import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  useContactUsHeroControllerReadQuery,
  useContactUsHeroControllerCreate,
  useContactUsHeroControllerUpdate,
} from "@/sdk/modules/contactushero.gen";
import { useContactUsRequestTypeControllerReadQuery } from "@/sdk/modules/contactusrequesttype.gen";
import { useContactUsHearAboutDropControllerReadQuery } from "@/sdk/modules/contactushearaboutdrop.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
} from "@/shared/components/custom/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  contactUsFormSchema,
  type ContactUsFormData,
} from "../schemas/contact-us-form.schema";

export default function ContactUsFormSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useContactUsHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          contact_us_hero_id_contact_us_hero_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const { data: requestTypesData } = useContactUsRequestTypeControllerReadQuery(
    {
      query: {
        query: {
          pagination: { take: 100, skip: 0 },
        },
      },
    }
  );

  const { data: hearAboutData } = useContactUsHearAboutDropControllerReadQuery({
    query: {
      query: {
        pagination: { take: 100, skip: 0 },
      },
    },
  });

  const existingHero = data?.data?.[0];
  const isUpdate = !!existingHero;

  const createMutation = useContactUsHeroControllerCreate();
  const updateMutation = useContactUsHeroControllerUpdate();

  const form = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      subtext: { en: "", ar: "" },
      formTitle: { en: "", ar: "" },
      formSubtext: { en: "", ar: "" },
      backgroundMedia: [],
      selectedRequestTypes: [],
      selectedHearAboutOptions: [],
    },
    mode: "onChange",
  });

  const [requestTypeSelectValue, setRequestTypeSelectValue] =
    useState<string>("");
  const [hearAboutSelectValue, setHearAboutSelectValue] = useState<string>("");

  useEffect(() => {
    if (existingHero) {
      const enTranslation =
        existingHero.contact_us_hero_id_contact_us_hero_translations?.find(
          (t) => t.language === "en"
        );
      const arTranslation =
        existingHero.contact_us_hero_id_contact_us_hero_translations?.find(
          (t) => t.language === "ar"
        );

      form.reset({
        title: {
          en: enTranslation?.title ?? "",
          ar: existingHero.title ?? arTranslation?.title ?? "",
        },
        subtext: {
          en: enTranslation?.sub_title ?? "",
          ar: existingHero.sub_title ?? arTranslation?.sub_title ?? "",
        },
        formTitle: {
          en: enTranslation?.title ?? "",
          ar: arTranslation?.title ?? "",
        },
        formSubtext: {
          en: enTranslation?.sub_title ?? "",
          ar: arTranslation?.sub_title ?? "",
        },
        backgroundMedia: existingHero.image
          ? [
              {
                id: existingHero.image.id,
                url: existingHero.image.url,
                key: existingHero.image.key,
                format: existingHero.image.format,
                mime_type: existingHero.image.mime_type,
                size: existingHero.image.size,
              },
            ]
          : [],
        selectedRequestTypes: [],
        selectedHearAboutOptions: [],
      });
    }
  }, [existingHero, form]);

  const onSubmit = async (values: ContactUsFormData) => {
    try {
      const mediaId = values.backgroundMedia?.[0]?.id;
      if (!mediaId) {
        toast.error(t("cms.contactUs.validation.backgroundImageRequired"));
        return;
      }

      if (isUpdate && existingHero) {
        await updateMutation.mutateAsync(
          {
            path: { id: String(existingHero.id) },
            body: {
              title: values.title.ar,
              sub_title: values.subtext.ar,
              media_id: mediaId,
              contact_us_hero_id_contact_us_hero_translations: [
                {
                  title: values.formTitle.en,
                  sub_title: values.formSubtext.en,
                  language: "en",
                },
              ],
            },
          },
          {
            onSuccess: () => {
              toast.success(t("cms.contactUs.messages.updated"));
            },
            onError: (error) => {
              toast.error(
                error.message || t("cms.contactUs.messages.errorUpdating")
              );
            },
          }
        );
      } else {
        await createMutation.mutateAsync(
          {
            body: {
              title: values.title.ar,
              sub_title: values.subtext.ar,
              media_id: mediaId,
              contact_us_hero_id_contact_us_hero_translations: [
                {
                  title: values.formTitle.en,
                  sub_title: values.formSubtext.en,
                  language: "en",
                },
              ],
            },
          },
          {
            onSuccess: () => {
              toast.success(t("cms.contactUs.messages.created"));
            },
            onError: (error) => {
              toast.error(
                error.message || t("cms.contactUs.messages.errorCreating")
              );
            },
          }
        );
      }
    } catch (error) {
      console.error("Error saving contact form:", error);
    }
  };

  const handleRequestTypeSelect = (value: string) => {
    const id = Number(value);
    const currentTypes = form.getValues("selectedRequestTypes");
    if (!currentTypes.includes(id)) {
      form.setValue("selectedRequestTypes", [...currentTypes, id], {
        shouldValidate: true,
      });
      setRequestTypeSelectValue("");
    }
  };

  const removeRequestType = (id: number) => {
    const currentTypes = form.getValues("selectedRequestTypes");
    form.setValue(
      "selectedRequestTypes",
      currentTypes.filter((t) => t !== id),
      { shouldValidate: true }
    );
  };

  const handleHearAboutSelect = (value: string) => {
    const id = Number(value);
    const currentOptions = form.getValues("selectedHearAboutOptions");
    if (!currentOptions.includes(id)) {
      form.setValue("selectedHearAboutOptions", [...currentOptions, id], {
        shouldValidate: true,
      });
      setHearAboutSelectValue("");
    }
  };

  const removeHearAboutOption = (id: number) => {
    const currentOptions = form.getValues("selectedHearAboutOptions");
    form.setValue(
      "selectedHearAboutOptions",
      currentOptions.filter((o) => o !== id),
      { shouldValidate: true }
    );
  };

  const requestTypes = requestTypesData?.data ?? [];
  const hearAboutOptions = hearAboutData?.data ?? [];
  const selectedRequestTypes = form.watch("selectedRequestTypes");
  const selectedHearAboutOptions = form.watch("selectedHearAboutOptions");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full md:col-span-2"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("cms.contactUs.form.heroTitle")}
                    placeholder={t("cms.contactUs.form.heroTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="subtext"
                    control={form.control}
                    label={t("cms.contactUs.form.heroSubtext")}
                    placeholder={t("cms.contactUs.form.heroSubtext")}
                    required
                  />
                  <I18nFormTextField
                    name="formTitle"
                    control={form.control}
                    label={t("cms.contactUs.form.formTitle")}
                    placeholder={t("cms.contactUs.form.formTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="formSubtext"
                    control={form.control}
                    label={t("cms.contactUs.form.formSubtext")}
                    placeholder={t("cms.contactUs.form.formSubtext")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("cms.contactUs.form.heroTitle")}
                    placeholder={t("cms.contactUs.form.heroTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="subtext"
                    control={form.control}
                    label={t("cms.contactUs.form.heroSubtext")}
                    placeholder={t("cms.contactUs.form.heroSubtext")}
                    required
                  />
                  <I18nFormTextField
                    name="formTitle"
                    control={form.control}
                    label={t("cms.contactUs.form.formTitle")}
                    placeholder={t("cms.contactUs.form.formTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="formSubtext"
                    control={form.control}
                    label={t("cms.contactUs.form.formSubtext")}
                    placeholder={t("cms.contactUs.form.formSubtext")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <FormField
            control={form.control}
            name="backgroundMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.contactUs.form.backgroundImage")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value}
                    maxDocuments={1}
                    maxSize={50 * 1024 * 1024}
                    acceptedFileTypes={["image/*", "video/*"]}
                    onChange={(value) => field.onChange(value ?? [])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selectedRequestTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.contactUs.form.requestTypes")}</FormLabel>
                <FormControl>
                  <Select
                    value={requestTypeSelectValue}
                    onValueChange={handleRequestTypeSelect}
                    disabled={
                      requestTypes.filter(
                        (type) => !selectedRequestTypes.includes(type.id)
                      ).length === 0
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("cms.contactUs.form.selectRequestType")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes
                        .filter(
                          (type) => !selectedRequestTypes.includes(type.id)
                        )
                        .map((type) => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRequestTypes.map((id) => {
                    const type = requestTypes.find((t) => t.id === id);
                    if (!type) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
                      >
                        <span>{type.title}</span>
                        <button
                          type="button"
                          onClick={() => removeRequestType(id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selectedHearAboutOptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("cms.contactUs.form.hearAboutOptions")}
                </FormLabel>
                <FormControl>
                  <Select
                    value={hearAboutSelectValue}
                    onValueChange={handleHearAboutSelect}
                    disabled={
                      hearAboutOptions.filter(
                        (option) =>
                          !selectedHearAboutOptions.includes(option.id)
                      ).length === 0
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t(
                          "cms.contactUs.form.selectHearAboutOption"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {hearAboutOptions
                        .filter(
                          (option) =>
                            !selectedHearAboutOptions.includes(option.id)
                        )
                        .map((option) => (
                          <SelectItem key={option.id} value={String(option.id)}>
                            {option.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedHearAboutOptions.map((id) => {
                    const option = hearAboutOptions.find((o) => o.id === id);
                    if (!option) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
                      >
                        <span>{option.title}</span>
                        <button
                          type="button"
                          onClick={() => removeHearAboutOption(id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
