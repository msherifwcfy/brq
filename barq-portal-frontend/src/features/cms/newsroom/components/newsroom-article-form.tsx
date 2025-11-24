import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
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
import { DocumentUploader, type DocumentUploadValue } from "@/shared/components/custom/DocumentUploader";
import {
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabContent,
  I18nTabs,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  newsroomArticleSchema,
  type NewsroomArticleFormData,
} from "../schemas/newsroom-article.schema";
import { type LanguageCode } from "@/shared/constants";
import { type NewsroomCardsEntity } from "@/sdk/types.gen";
import { transformTranslationsToI18n } from "@/shared/schemas/i18n.schema";
import { useLang } from "@/shared/hooks/use-lang";
import DatePicker from "@/shared/components/custom/DatePicker";
import { useNewsroomCategoryControllerReadQuery } from "@/sdk/modules/newsroomcategory.gen";
import { hasLanguageErrors } from "@/shared/utils/hasLanguageErrors";
import { toast } from "sonner";
import { Switch } from "@/shared/components/ui/switch";

export type CategoryOption = {
  id: number;
  label: string;
};

interface NewsroomArticleFormProps {
  article?: NewsroomCardsEntity | null;
  onSubmit: (values: NewsroomArticleFormData) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function NewsroomArticleForm({
  article,
  onSubmit,
  onCancel,
  isSubmitting,
}: NewsroomArticleFormProps) {
  const { t, lang } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useNewsroomCategoryControllerReadQuery({
      query: {
        query: {
          relations: {
            newsroom_category_id_newsroom_category_translations: true,
          },
          pagination: { take: 100, skip: 0 },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    });

  const categories = useMemo<CategoryOption[]>(() => {
    const categoriesList = categoriesData?.data ?? [];
    return categoriesList.map((category) => {
      const translation =
        category.newsroom_category_id_newsroom_category_translations?.find(
          (t) => t.language === lang
        );
      const enTranslation =
        category.newsroom_category_id_newsroom_category_translations?.find(
          (t) => t.language === "en"
        );
      const label =
        translation?.name || enTranslation?.name || category.name || "";
      return {
        id: category.id,
        label,
      };
    });
  }, [categoriesData, lang]);

  const initialValues = useMemo(() => {
    const translations =
      article?.newsroom_cards_id_newsroom_cards_translations || [];

    const titleTranslations = translations.map((item) => ({
      title: item.title,
      language: item.language,
    }));
    const descriptionTranslations = translations.map((item) => ({
      description: item.description,
      language: item.language,
    }));
    const description = transformTranslationsToI18n(
      descriptionTranslations as any,
      "description"
    );
    const longDescriptionTranslations = translations.map((item) => ({
      long_description: item.long_description,
      language: item.language,
    }));
    const long_description = transformTranslationsToI18n(
      longDescriptionTranslations as any,
      "long_description"
    );

    const title = transformTranslationsToI18n(
      titleTranslations as any,
      "title"
    );

    if (!title.ar && article?.title) {
      title.ar = article.title;
    }
    if (!description.ar && article?.description) {
      description.ar = article.description;
    }
    return {
      title,
      description,
      is_vertical: article?.is_vertical ?? true,
      long_description,
      is_featured: article?.is_featured ?? false,
      date: article?.date_time ? article.date_time : "",
      categoryId: article?.newsroom_category_id || categories[0]?.id,
      image: article?.image
        ? [
          {
            id: article.image.id,
            url: article.image.url,
            key: article.image.key,
            format: article.image.format,
            mime_type: article.image.mime_type,
            size: article.image.size,
          },
        ]
        : [],
      home_image: article?.home_image ? [article?.home_image] : [],
    };
  }, [article, categories]);

  const form = useForm<NewsroomArticleFormData>({
    resolver: zodResolver(newsroomArticleSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  const handleSubmit = (values: NewsroomArticleFormData) => {
    onSubmit(values);
  };

  const onError = (err: any) => {
    const hasOppositeLangErrors = hasLanguageErrors(err, currentLanguage);
    if (hasOppositeLangErrors) {
      const oppositeLanguage: LanguageCode =
        currentLanguage === "en" ? "ar" : "en";
      const languageName = t(`common.language.${oppositeLanguage}`);
      toast.error(
        t("common.formValidation.completeLanguageForm", {
          language: languageName,
        }),
        {
          duration: 5000,
        }
      );
    }
    console.log(err);
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.newsroom.articles.form.date")}</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={(value) => field.onChange(value?.toISOString())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.newsroom.articles.form.category")}</FormLabel>
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={isLoadingCategories}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isLoadingCategories
                          ? t("common.loading")
                          : t("cms.newsroom.articles.form.categoryPlaceholder")
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((option) => (
                    <SelectItem key={option.id} value={String(option.id)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_vertical"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.newsroom.articles.form.layout")}</FormLabel>
              <Select
                value={field.value === true ? "vertical" : field.value === false ? "horizontal" : "vertical"}
                onValueChange={(value) => {
                  field.onChange(value === "vertical");
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        t("cms.newsroom.articles.form.layoutPlaceholder")
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vertical">{t("cms.newsroom.articles.form.vertical")}</SelectItem>
                  <SelectItem value="horizontal">{t("cms.newsroom.articles.form.horizontal")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="is_featured"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("caseStudies.form.featured")}</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>



      <FormField
        control={form.control}
        name="home_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("cms.newsroom.articles.form.thumbnailImage")}</FormLabel>
            <FormControl>
              <DocumentUploader
                value={field.value as DocumentUploadValue[] || []}
                maxDocuments={1}
                placeholder={t("cms.newsroom.articles.form.thumbnailImagePlaceholder")}
                maxSize={50 * 1024 * 1024}
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
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("cms.newsroom.articles.form.image")}</FormLabel>
            <FormControl>
              <DocumentUploader
                value={(field.value as any) || []}
                maxDocuments={1}
                maxSize={50 * 1024 * 1024}
                acceptedFileTypes={["image/*", "video/*",]}
                onChange={field.onChange}
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
            <div className="grid gap-4">
              <I18nFormTextField
                name="title"
                control={form.control}
                label={t("cms.newsroom.articles.form.title")}
                placeholder={t("cms.newsroom.articles.form.titlePlaceholder")}
                required
              />
              <I18nFormTextareaField
                name="description"
                control={form.control}
                label={t("cms.newsroom.articles.form.description")}
                placeholder={t(
                  "cms.newsroom.articles.form.descriptionPlaceholder"
                )}
                required
              />
              <I18nFormTextareaField
                name="long_description"
                control={form.control}
                label={t("cms.newsroom.articles.form.longDescription")}
                placeholder={t(
                  "cms.newsroom.articles.form.longDescriptionPlaceholder"
                )}
                required
                rows={6}
              />
            </div>
          </I18nTabContent>
          <I18nTabContent language="ar">
            <div className="grid gap-4">
              <I18nFormTextField
                name="title"
                control={form.control}
                label={t("cms.newsroom.articles.form.title")}
                placeholder={t("cms.newsroom.articles.form.titlePlaceholder")}
                required
              />
              <I18nFormTextareaField
                name="description"
                control={form.control}
                label={t("cms.newsroom.articles.form.description")}
                placeholder={t(
                  "cms.newsroom.articles.form.descriptionPlaceholder"
                )}
                required
              />
              <I18nFormTextareaField
                name="long_description"
                control={form.control}
                label={t("cms.newsroom.articles.form.longDescription")}
                placeholder={t(
                  "cms.newsroom.articles.form.longDescriptionPlaceholder"
                )}
                required
                rows={6}
              />
            </div>
          </I18nTabContent>
        </I18nFormProvider>
      </I18nTabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button
          onClick={form.handleSubmit(handleSubmit, onError)}
          loading={isSubmitting}
        >
          {article ? t("common.update") : t("common.create")}
        </Button>
      </div>
    </Form>
  );
}
