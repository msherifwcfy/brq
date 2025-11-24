import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { OperationIntelligenceBulletForm } from "./OperationIntelligenceBulletForm";
import { useOperationIntelligenceBulletsControllerCreate } from "@/mock-sdk/modules/operation-intelligence-bullets.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateOperationIntelligenceBulletFormData } from "../schemas/operation-intelligence.schema";

export const CreateOperationIntelligenceBulletModal = () => {
  const { t } = useLang();
  const createMutation = useOperationIntelligenceBulletsControllerCreate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "createOperationIntelligenceBullet";

  const handleSubmit = async (
    values: CreateOperationIntelligenceBulletFormData
  ) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await createMutation.mutateAsync({
        body: {
          text: values.text.ar,
          icon_id: iconId,
          operation_intelligence_id: data?.operationIntelligenceId || 1,
          operation_intelligence_cards_id_operation_intelligence_cards_translations:
            [
              {
                language: "en",
                text: values.text.en,
              },
            ],
        } as any,
      } as any);
      toast.success(
        t("cms.cybersecurity.operationIntelligence.bullets.messages.created")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t(
            "cms.cybersecurity.operationIntelligence.bullets.messages.errorCreating"
          )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.operationIntelligence.bullets.create")}
          </DialogTitle>
        </DialogHeader>
        <OperationIntelligenceBulletForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t(
            "cms.cybersecurity.operationIntelligence.bullets.create"
          )}
        />
      </DialogContent>
    </Dialog>
  );
};
