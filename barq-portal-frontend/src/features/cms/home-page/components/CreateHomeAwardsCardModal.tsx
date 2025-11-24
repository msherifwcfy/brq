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
import type { CreateHomeAwardsCardFormData } from "../schemas/home-awards-cards.schema";

export const CreateHomeAwardsCardModal = () => {
  const { t } = useLang();
  const updateMutation = useHomeAwardsControllerUpdate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createHomeAwardsCard";

  const { data } = useHomeAwardsControllerReadQuery({
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

  const existing = data?.data?.[0];

  const handleSubmit = async (values: CreateHomeAwardsCardFormData) => {
    if (!existing) {
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
          home_awards_id_home_awards_cards: [
            ...existingCards.map((card) => ({
              id: card.id,
              title: card.title,
              date: card.date,
              icon_id: card.icon_id,
              home_awards_cards_id_home_awards_cards_translations: card.home_awards_cards_id_home_awards_cards_translations?.map((t) => ({
                title: t.title,
                language: t.language,
              })),
            })),
            {
              title: values.title?.ar || "",
              date: values.date || "",
              icon_id: (values as any).icon_id,
              home_awards_cards_id_home_awards_cards_translations: [
                {
                  title: values.title?.en || "",
                  language: "en",
                },
              
              ],
            },
          ],
        },
      });
      toast.success(t("cms.homePage.homeAwards.cards.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.homePage.homeAwards.cards.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.homePage.homeAwards.cards.create")}</DialogTitle>
        </DialogHeader>
        <HomeAwardsCardForm
          onSubmit={handleSubmit as any}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.homePage.homeAwards.cards.create")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};

