import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useAwardsCardsControllerReadOneQuery,
  useAwardsCardsControllerUpdate,
} from "@/sdk/modules/awardscard.gen";
import { useModal } from "@/shared/store/modal-store";
import { AwardsCardsForm } from "./AwardsCardsForm";
import type { UpdateAwardsCardsFormData } from "../schemas/awards-cards.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { Loader2 } from "lucide-react";

export const UpdateAwardsCardsModal = () => {
  const { t } = useLang();
  const updateAwardsCardsMutation = useAwardsCardsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateAwardsCards";

  const { data: awardsCardData, isPending } =
    useAwardsCardsControllerReadOneQuery({
      path: {
        id: data?.awardsCard?.id.toString(),
      },
      query: {
        query: {
          relations: {
            awards_cards_id_awards_cards_translations: true,
            media: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    });
  const awardsCard = awardsCardData?.data;
  console.log(awardsCard, "awardsCard");
  const enTranslation =
    awardsCard?.awards_cards_id_awards_cards_translations?.find(
      (t) => t.language === "en"
    );
  const arTranslation =
    awardsCard?.awards_cards_id_awards_cards_translations?.find(
      (t) => t.language === "ar"
    );

  const handleSubmit = async (formData: UpdateAwardsCardsFormData) => {
    if (!awardsCard) return;

    try {
      await updateAwardsCardsMutation.mutateAsync({
        body: {
          media_id: (formData as any)?.media_id,
          name: formData.name?.ar || "",
          description: formData.description?.ar || "",
          awards_cards_id_awards_cards_translations: [
            {
              name: formData.name?.en || "",
              description: formData.description?.en || "",
              language: "en",
            },
          ],
        },
        path: {
          id: awardsCard.id.toString(),
        },
      });
      toast.success(t("awardsCards.messages.awardsCardUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("awardsCards.messages.errorUpdatingAwardsCard")
      );
      console.error("Error updating awards card:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("awardsCards.updateAwardsCard")}</DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <AwardsCardsForm
            defaultValues={{
              media: awardsCard?.media ? [awardsCard?.media] : [],
              name: {
                en: enTranslation?.name || "",
                ar: awardsCard?.name || arTranslation?.name || "",
              },
              description: {
                en: enTranslation?.description || "",
                ar: awardsCard?.description || arTranslation?.description || "",
              },
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateAwardsCardsMutation.isPending}
            submitLabel={t("awardsCards.updateAwardsCard")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
