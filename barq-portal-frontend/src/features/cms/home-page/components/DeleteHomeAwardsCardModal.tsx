import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useHomeAwardsControllerUpdate, useHomeAwardsControllerReadQuery } from "@/sdk/modules/homeaward.gen";
import type { HomeAwardsCardsEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteHomeAwardsCardModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteHomeAwardsCard";
  const card = data?.card as HomeAwardsCardsEntity | undefined;
  const updateMutation = useHomeAwardsControllerUpdate();

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

  const handleDelete = async () => {
    if (!existing || !card) return;

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
          home_awards_id_home_awards_cards: existingCards
            .filter((c) => c.id !== card.id)
            .map((c) => ({
              id: c.id,
              title: c.title,
              date: c.date,
              icon_id: c.icon_id,
              home_awards_cards_id_home_awards_cards_translations: c.home_awards_cards_id_home_awards_cards_translations?.map((t) => ({
                title: t.title,
                language: t.language,
              })),
            })),
        },
      });
      toast.success(t("cms.homePage.homeAwards.cards.messages.deleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.homePage.homeAwards.cards.messages.errorDeleting")
      );
      console.error("Error deleting home awards card:", error);
    }
  };

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("cms.homePage.homeAwards.cards.deleteTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("cms.homePage.homeAwards.cards.deleteDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={updateMutation.isPending}
            onClick={handleDelete}
          >
            {updateMutation.isPending
              ? t("cms.homePage.homeAwards.cards.form.loading")
              : t("cms.homePage.homeAwards.cards.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

