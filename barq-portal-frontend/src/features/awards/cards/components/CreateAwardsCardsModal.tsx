import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAwardsCardsControllerCreate } from "@/sdk/modules/awardscard.gen";
import { useModal } from "@/shared/store/modal-store";
import { AwardsCardsForm } from "./AwardsCardsForm";
import type { CreateAwardsCardsFormData } from "../schemas/awards-cards.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateAwardsCardsModal = () => {
  const { t } = useLang();
  const createAwardsCardsMutation = useAwardsCardsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createAwardsCards";

  const handleSubmit = async (data: CreateAwardsCardsFormData) => {
    try {
      await createAwardsCardsMutation.mutateAsync({
        body: {
          media_id: (data as any)?.media_id,
          name: data.name?.ar || "",
          description: data.description?.ar || "",
          awards_cards_id_awards_cards_translations: [
            {
              name: data.name?.en || "",
              description: data.description?.en || "",
              language: "en",
            },
          ],
        },
      });
      toast.success(t("awardsCards.messages.awardsCardCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("awardsCards.messages.errorCreatingAwardsCard")
      );
      console.error("Error creating awards card:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("awardsCards.createNewAwardsCard")}</DialogTitle>
        </DialogHeader>

        <AwardsCardsForm
          onSubmit={handleSubmit as any}
          isLoading={createAwardsCardsMutation.isPending}
          submitLabel={t("awardsCards.createAwardsCard")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
