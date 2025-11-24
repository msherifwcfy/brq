import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useHomeAwardsControllerReadQuery,
  useHomeAwardsControllerCreate,
  useHomeAwardsControllerUpdate,
} from "@/sdk/modules/homeaward.gen";
import {
  Form,
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
  createHomeAwardsSchema,
  updateHomeAwardsSchema,
} from "../schemas/home-awards.schema";
import type {
  CreateHomeAwardsFormData,
  UpdateHomeAwardsFormData,
} from "../schemas/home-awards.schema";
import { toast } from "sonner";
import { useHomeAwardsCardsColumns } from "../columns/home-awards-cards-columns";
import { useModal } from "@/shared/store/modal-store";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import type { HomeAwardsCardsEntity } from "@/sdk/types.gen";

export default function HomeAwardsSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading, refetch } = useHomeAwardsControllerReadQuery({
    query: {
      query: {
        relations: {
          home_awards_id_home_awards_translations: true,
          home_awards_id_home_awards_cards: {
            home_awards_cards_id_home_awards_cards_translations: true,
            icon: true,
          },
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const { onOpen } = useModal();

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.home_awards_id_home_awards_translations?.find(
        (tr) => tr.language === lang
      ),
    [existing, lang]
  );

  const isUpdate = !!existing;

  type FormData = CreateHomeAwardsFormData | UpdateHomeAwardsFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateHomeAwardsSchema : createHomeAwardsSchema
    ),
    defaultValues: {
      description: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation = existing.home_awards_id_home_awards_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.home_awards_id_home_awards_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      description: {
        en: enTranslation?.description || existing.description || "",
        ar: arTranslation?.description || "",
      },
    } as unknown as FormData);
  }, [existing, form]);

  const createMutation = useHomeAwardsControllerCreate();
  const updateMutation = useHomeAwardsControllerUpdate();

  const onSubmit = async (values: FormData) => {
    if (!existing) {
      await createMutation.mutateAsync(
        {
          body: {
            description: values.description?.ar || "",
            home_awards_id_home_awards_translations: [
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
            toast.success(t("cms.homePage.homeAwards.messages.homeAwardsCreated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
              t("cms.homePage.homeAwards.messages.errorCreatingHomeAwards")
            );
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existing.id) },
          body: {
            description: values.description?.ar || "",
            home_awards_id_home_awards_translations: [
              {
                description: values.description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.homeAwards.messages.homeAwardsUpdated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
              t("cms.homePage.homeAwards.messages.errorUpdatingHomeAwards")
            );
          },
        }
      );
    }
  };

  const cards = existing?.home_awards_id_home_awards_cards || [];
  const canAddMoreCards = cards.length < 3;
  const handleCreateCard = () => {
    if (!existing) {
      toast.error(t("cms.homePage.homeAwards.cards.messages.homeAwardsNotFound"));
      return;
    }
    onOpen("createHomeAwardsCard", {}, refetch);
  };

  const handleEditCard = (card: HomeAwardsCardsEntity) => {
    onOpen("updateHomeAwardsCard", { card }, refetch);
  };

  const handleDeleteCard = (card: HomeAwardsCardsEntity) => {
    onOpen("deleteHomeAwardsCard", { card }, refetch);
  };

  const cardsColumns = useHomeAwardsCardsColumns(handleEditCard, handleDeleteCard);

  if (isLoading) return <div />;

  return (
    <div className="space-y-6">
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
                  label={t("cms.homePage.homeAwards.form.description")}
                  required
                />
              </I18nTabContent>
              <I18nTabContent language="ar">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.homePage.homeAwards.form.description")}
                  required
                />
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existing
                ? t("cms.homePage.homeAwards.form.update")
                : t("cms.homePage.homeAwards.form.create")}
            </Button>
          </div>
        </form>
      </Form>
      <div className="h-[1px] w-full bg-gray-700" />

      {existing && (
        <div className="space-y-4">
          <div className="flex justify-end items-center">
            <ProtectedComponent
              permissionKey={PERMISSION_KEYS.HOME_AWARDS.CREATE}
            >
              <Button onClick={handleCreateCard} size="sm" disabled={!canAddMoreCards}>
                <PlusIcon className="w-4 h-4" />
                {t("cms.homePage.homeAwards.cards.create")}
              </Button>
            </ProtectedComponent>
          </div>

          <DataTable
            columns={cardsColumns}
            data={cards}
            loading={isLoading}
            page={0}
            limit={cards.length || 10}
            pagesCount={1}
            tableId="home-awards-cards"
            filters={false}
            hideSearch
          />
        </div>
      )}
    </div>
  );
}

