import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { HomeAwardsCardForm } from "./HomeAwardsCardForm";
import { useHomeAwardsControllerUpdate, useHomeAwardsControllerReadQuery } from "@/sdk/modules/homeaward.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { UpdateHomeAwardsCardFormData } from "../schemas/home-awards-cards.schema";
import type { HomeAwardsCardsEntity } from "@/sdk/types.gen";

export const UpdateHomeAwardsCardModal = () => {
  const { t } = useLang();
  const updateMutation = useHomeAwardsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateHomeAwardsCard";
  const card = data?.card as HomeAwardsCardsEntity | undefined;

  const { data: homeAwardsData } = useHomeAwardsControllerReadQuery({
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

  const existing = homeAwardsData?.data?.[0];

  const handleSubmit = async (values: UpdateHomeAwardsCardFormData) => {
    if (!existing || !card) {
      toast.error(t("cms.homePage.homeAwards.cards.messages.homeAwardsNotFound"));
      return;
    }

    try {
      const existingCards = existing.home_awards_id_home_awards_cards || [];
      const enTranslation = existing.home_awards_id_home_awards_translations?.find(
        (t) => t.language === "en"
      );
      const arTranslation = existing.home_awards_id_home_awards_translations?.find(
        (t) => t.language === "ar"
      );

      const cardEnTranslation = card.home_awards_cards_id_home_awards_cards_translations?.find(
        (t) => t.language === "en"
      );
      const cardArTranslation = card.home_awards_cards_id_home_awards_cards_translations?.find(
        (t) => t.language === "ar"
      );

      await updateMutation.mutateAsync({
        path: { id: String(existing.id) },
        body: {
          description: existing.description,
          home_awards_id_home_awards_translations: [
            {
              description: enTranslation?.description || existing.description || "",
              language: "en",
            },
            {
              description: arTranslation?.description || "",
              language: "ar",
            },
          ],
          home_awards_id_home_awards_cards: existingCards.map((c) => {
            if (c.id === card.id) {
              return {
                id: c.id,
                title: values.title?.ar || c.title,
                date: values.date || c.date,
                icon_id: (values as any).icon_id || c.icon_id,
                home_awards_cards_id_home_awards_cards_translations: [
                  {
                    title: values.title?.en || cardEnTranslation?.title || "",
                    language: "en",
                  },
                  {
                    title: values.title?.ar || cardArTranslation?.title || "",
                    language: "ar",
                  },
                ],
              };
            }
            return {
              id: c.id,
              title: c.title,
              date: c.date,
              icon_id: c.icon_id,
              home_awards_cards_id_home_awards_cards_translations: c.home_awards_cards_id_home_awards_cards_translations?.map((t) => ({
                title: t.title,
                language: t.language,
              })),
            };
          }),
        },
      });
      toast.success(t("cms.homePage.homeAwards.cards.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.homePage.homeAwards.cards.messages.errorUpdating")
      );
    }
  };

  if (!card) return null;

  const cardEnTranslation = card.home_awards_cards_id_home_awards_cards_translations?.find(
    (t) => t.language === "en"
  );
  const cardArTranslation = card.home_awards_cards_id_home_awards_cards_translations?.find(
    (t) => t.language === "ar"
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.homePage.homeAwards.cards.update")}</DialogTitle>
        </DialogHeader>
        <HomeAwardsCardForm
          defaultValues={{
            title: {
              en: cardEnTranslation?.title || card.title || "",
              ar: cardArTranslation?.title || card.title || "",
            },
            date: card.date,
            icon: card.icon ? [card.icon] : [],
          }}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.homePage.homeAwards.cards.update")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};

