import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { NetworkSectionCardForm } from "./NetworkSectionCardForm";
import { useNetworkSectionCardsControllerCreate } from "@/mock-sdk/modules/network-section-cards.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateNetworkSectionCardFormData } from "../schemas/network-section.schema";

export const CreateNetworkSectionCardModal = () => {
  const { t } = useLang();
  const createMutation = useNetworkSectionCardsControllerCreate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "createNetworkSectionCard";

  const handleSubmit = async (values: CreateNetworkSectionCardFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await createMutation.mutateAsync({
        body: {
          text: values.text.ar,
          icon_id: iconId,
          network_section_id: data?.networkSectionId || 1,
          row_number: values.row_number,
          position: values.position,
          network_section_cards_id_network_section_cards_translations: [
            {
              language: "en",
              text: values.text.en,
            },
          ],
        } as any,
      } as any);
      toast.success(
        t("cms.cybersecurity.networkSection.cards.messages.created")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.networkSection.cards.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.networkSection.cards.create")}
          </DialogTitle>
        </DialogHeader>
        <NetworkSectionCardForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.cybersecurity.networkSection.cards.create")}
        />
      </DialogContent>
    </Dialog>
  );
};
