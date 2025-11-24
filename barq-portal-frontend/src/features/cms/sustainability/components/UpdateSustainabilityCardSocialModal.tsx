import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useCardSocialControllerReadOneQuery,
  useCardSocialControllerUpdate,
} from "@/sdk/modules/cardsocial.gen";
import { useModal } from "@/shared/store/modal-store";
import { SustainabilityCardSocialForm } from "./SustainabilityCardSocialForm";
import type { UpdateCardSocialFormData } from "../schemas/sustainability-card-social.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { Loader2 } from "lucide-react";

export const UpdateSustainabilityCardSocialModal = () => {
  const { t } = useLang();
  const updateCardSocialMutation = useCardSocialControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateSustainabilityCardSocial";

  const { data: cardSocialData, isPending } =
    useCardSocialControllerReadOneQuery({
      path: {
        id: data?.cardSocial?.id.toString(),
      },
      query: {
        query: {
          relations: {
            card_social_id_card_social_translations:true,
            media: true,
          },
        },
        headers: {
          "x-skip-translations": "true",
        },
      },
    });
  const cardSocial = cardSocialData?.data;
  console.log(cardSocial, "cardSocial");
  const enTranslation =
    cardSocial?.card_social_id_card_social_translations?.find(
      (t) => t.language === "en"
    );
  const arTranslation =
    cardSocial?.card_social_id_card_social_translations?.find(
      (t) => t.language === "ar"
    );

  const handleSubmit = async (formData: UpdateCardSocialFormData) => {
    try {
      await updateCardSocialMutation.mutateAsync({
        path: {
          id: cardSocial?.id.toString() || "",
        },
        body: {
          title: formData.title?.ar || cardSocial?.title,
          description: formData.description?.ar || cardSocial?.description,
          media_id: formData.icon?.[0]?.id || cardSocial?.media_id,
          card_social_id_card_social_translations: [
            {
              language: "en",
              title: formData.title?.en || cardSocial?.title,
              description: formData.description?.en || cardSocial?.description,
            },
          ] as any,
        },
      });
      toast.success(t("sustainability.cardSocial.messages.cardSocialUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("sustainability.cardSocial.messages.errorUpdatingCardSocial")
      );
      console.error("Error updating card social:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("sustainability.cardSocial.updateCardSocial")}
          </DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <SustainabilityCardSocialForm
            defaultValues={{
              title: {
                en: enTranslation?.title || "",
                ar: cardSocial?.title || arTranslation?.title || "",
              },
              description: {
                en: enTranslation?.description || "",
                ar: cardSocial?.description || arTranslation?.description || "",
              },
              icon: cardSocial?.media ? [cardSocial?.media] : ([] as any),
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateCardSocialMutation.isPending}
            submitLabel={t("sustainability.cardSocial.updateCardSocial")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
