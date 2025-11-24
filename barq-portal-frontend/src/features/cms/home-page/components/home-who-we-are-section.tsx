import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useWhoAreWeControllerReadQuery,
  useWhoAreWeControllerCreate,
  useWhoAreWeControllerUpdate,
} from "@/sdk/modules/whoarewe.gen";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createWhoWeAreSchema,
  updateWhoWeAreSchema,
} from "../schemas/who-we-are.schema";
import type {
  CreateWhoWeAreFormData,
  UpdateWhoWeAreFormData,
} from "../schemas/who-we-are.schema";
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";
import { toast } from "sonner";

export default function HomeWhoWeAreSection() {
  const { lang, t } = useLang();
  const navigate = useLangNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useWhoAreWeControllerReadQuery({
    query: {
      query: {
        relations: {
          who_are_we_id_who_are_we_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.who_are_we_id_who_are_we_translations?.find(
        (tr) => tr.language === lang
      ),
    [existing, lang]
  );

  const isUpdate = !!existing;

  type FormData = CreateWhoWeAreFormData | UpdateWhoWeAreFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateWhoWeAreSchema : createWhoWeAreSchema
    ),
    defaultValues: {
      description: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;

    // Transform API data to i18n format
    const enTranslation = existing.who_are_we_id_who_are_we_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.who_are_we_id_who_are_we_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      description: {
        en: enTranslation?.description || existing.description || "",
        ar: arTranslation?.description || "",
      },
    } as unknown as FormData);
  }, [existing, form]);

  const createMutation = useWhoAreWeControllerCreate();
  const updateMutation = useWhoAreWeControllerUpdate();

  const onSubmit = async (values: FormData) => {
    if (!existing) {
      await createMutation.mutateAsync(
        {
          body: {
            description: values.description?.en || "",
            who_are_we_id_who_are_we_translations: [
              {
                description: values.description?.en || "",
                language: "en",
              },
              {
                description: values.description?.ar || "",
                language: "ar",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.whoWeAre.messages.whoWeAreCreated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
                t("cms.homePage.whoWeAre.messages.errorCreatingWhoWeAre")
            );
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existing.id) },
          body: {
            description: values.description?.en || "",
            who_are_we_id_who_are_we_translations: [
              {
                description: values.description?.en || "",
                language: "en",
              },
              {
                description: values.description?.ar || "",
                language: "ar",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.whoWeAre.messages.whoWeAreUpdated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
                t("cms.homePage.whoWeAre.messages.errorUpdatingWhoWeAre")
            );
          },
        }
      );
    }
  };

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.homePage.whoWeAre.form.subHeadline")}
                  required
                />
              </I18nTabContent>
              <I18nTabContent language="ar">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.homePage.whoWeAre.form.subHeadline")}
                  required
                />
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existing
                ? t("cms.homePage.whoWeAre.form.update")
                : t("cms.homePage.whoWeAre.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
