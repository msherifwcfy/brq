import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { NetworkSectionCardForm } from "./NetworkSectionCardForm";
import { useNetworkSectionCardsControllerUpdate } from "@/mock-sdk/modules/network-section-cards.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateNetworkSectionCardFormData } from "../schemas/network-section.schema";

export const UpdateNetworkSectionCardModal = () => {
  const { t } = useLang();
  const updateMutation = useNetworkSectionCardsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateNetworkSectionCard";

  const card = data?.card;

  const defaultValues: Partial<CreateNetworkSectionCardFormData> = {
    text: {
      en:
        card?.network_section_cards_id_network_section_cards_translations?.find(
          (t: any) => t.language === "en"
        )?.text || "",
      ar: card?.text || "",
    },
    icon: card?.icon?.id
      ? [
          {
            id: card.icon.id,
            url: card.icon.url,
            key: card.icon.key,
            format: card.icon.format,
            mime_type: card.icon.mime_type,
            size: card.icon.size,
          },
        ]
      : [],
    row_number: card?.row_number || 1,
    position: card?.position || 1,
  };

  const handleSubmit = async (values: CreateNetworkSectionCardFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await updateMutation.mutateAsync({
        path: { id: String(card?.id) },
        body: {
          text: values.text.ar,
          icon_id: iconId,
          row_number: values.row_number,
          position: values.position,
          network_section_cards_id_network_section_cards_translations: [
            {
              language: "en",
              text: values.text.en,
            },
          ],
        } as any,
      }as any);
      toast.success(
        t("cms.cybersecurity.networkSection.cards.messages.updated")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.networkSection.cards.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.networkSection.cards.update")}
          </DialogTitle>
        </DialogHeader>
        <NetworkSectionCardForm
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.cybersecurity.networkSection.cards.update")}
          defaultValues={defaultValues}
          isUpdate
        />
      </DialogContent>
    </Dialog>
  );
};
