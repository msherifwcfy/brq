import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { IdentityManagementCardForm } from "./IdentityManagementCardForm";
import { useIdentityManagementCardsControllerUpdate } from "@/mock-sdk/modules/identity-management-cards.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateIdentityManagementCardFormData } from "../schemas/identity-management.schema";

export const UpdateIdentityManagementCardModal = () => {
  const { t } = useLang();
  const updateMutation = useIdentityManagementCardsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateIdentityManagementCard";

  const card = data?.card;

  const defaultValues: Partial<CreateIdentityManagementCardFormData> = {
    title: {
      en:
        card?.identity_management_cards_id_identity_management_cards_translations?.find(
          (t: any) => t.language === "en"
        )?.title || "",
      ar: card?.title || "",
    },
    description: {
      en:
        card?.identity_management_cards_id_identity_management_cards_translations?.find(
          (t: any) => t.language === "en"
        )?.description || "",
      ar: card?.description || "",
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
  };

  const handleSubmit = async (values: CreateIdentityManagementCardFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await updateMutation.mutateAsync({
        path: { id: String(card?.id) },
        body: {
          title: values.title.ar,
          description: values.description.ar,
          icon_id: iconId,
          identity_management_cards_id_identity_management_cards_translations: [
            {
              language: "en",
              title: values.title.en,
              description: values.description.en,
            },
          ],
        } as any,
      } as any);
      toast.success(
        t("cms.cybersecurity.identityManagement.cards.messages.updated")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.identityManagement.cards.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.identityManagement.cards.update")}
          </DialogTitle>
        </DialogHeader>
        <IdentityManagementCardForm
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.cybersecurity.identityManagement.cards.update")}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};
