import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { IdentityManagementCardForm } from "./IdentityManagementCardForm";
import { useIdentityManagementCardsControllerCreate } from "@/mock-sdk/modules/identity-management-cards.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateIdentityManagementCardFormData } from "../schemas/identity-management.schema";

export const CreateIdentityManagementCardModal = () => {
  const { t } = useLang();
  const createMutation = useIdentityManagementCardsControllerCreate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "createIdentityManagementCard";

  const handleSubmit = async (values: CreateIdentityManagementCardFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await createMutation.mutateAsync({
        body: {
          title: values.title.ar,
          description: values.description.ar,
          icon_id: iconId,
          identity_management_id: data?.identityManagementId || 1,
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
        t("cms.cybersecurity.identityManagement.cards.messages.created")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.identityManagement.cards.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.identityManagement.cards.create")}
          </DialogTitle>
        </DialogHeader>
        <IdentityManagementCardForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.cybersecurity.identityManagement.cards.create")}
        />
      </DialogContent>
    </Dialog>
  );
};
