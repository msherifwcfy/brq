import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useCardSocialControllerCreate } from "@/sdk/modules/cardsocial.gen";
import { useModal } from "@/shared/store/modal-store";
import { SustainabilityCardSocialForm } from "./SustainabilityCardSocialForm";
import type { CreateCardSocialFormData } from "../schemas/sustainability-card-social.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateSustainabilityCardSocialModal = () => {
  const { t } = useLang();
  const createCardSocialMutation = useCardSocialControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createSustainabilityCardSocial";

  const handleSubmit = async (data: CreateCardSocialFormData) => {
    try {
      await createCardSocialMutation.mutateAsync({
        body: {
          media_id: data.icon?.[0]?.id || 0,
          title: data.title?.ar || "",
          description: data.description?.ar || "",
          card_social_id_card_social_translations: [
            {
              language: "en",
              title: data.title?.en || "",
              description: data.description?.en || "",
            },
          ],
        },
      });
      toast.success(t("sustainability.cardSocial.messages.cardSocialCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("sustainability.cardSocial.messages.errorCreatingCardSocial")
      );
      console.error("Error creating card social:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("sustainability.cardSocial.createNewCardSocial")}
          </DialogTitle>
        </DialogHeader>

        <SustainabilityCardSocialForm
          onSubmit={handleSubmit as any}
          isLoading={createCardSocialMutation.isPending}
          submitLabel={t("sustainability.cardSocial.createCardSocial")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
