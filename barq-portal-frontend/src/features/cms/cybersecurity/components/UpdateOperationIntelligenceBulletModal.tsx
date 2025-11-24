import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { OperationIntelligenceBulletForm } from "./OperationIntelligenceBulletForm";
import { useOperationIntelligenceBulletsControllerUpdate } from "@/mock-sdk/modules/operation-intelligence-bullets.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateOperationIntelligenceBulletFormData } from "../schemas/operation-intelligence.schema";

export const UpdateOperationIntelligenceBulletModal = () => {
  const { t } = useLang();
  const updateMutation = useOperationIntelligenceBulletsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateOperationIntelligenceBullet";

  const bullet = data?.bullet;

  const defaultValues: Partial<CreateOperationIntelligenceBulletFormData> = {
    text: {
      en:
        bullet?.operation_intelligence_cards_id_operation_intelligence_cards_translations?.find(
          (t: any) => t.language === "en"
        )?.text || "",
      ar: bullet?.text || "",
    },
    icon: bullet?.icon?.id
      ? [
          {
            id: bullet.icon.id,
            url: bullet.icon.url,
            key: bullet.icon.key,
            format: bullet.icon.format,
            mime_type: bullet.icon.mime_type,
            size: bullet.icon.size,
          },
        ]
      : [],
  };

  const handleSubmit = async (
    values: CreateOperationIntelligenceBulletFormData
  ) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await updateMutation.mutateAsync({
        path: { id: String(bullet?.id) },
        body: {
          text: values.text.ar,
          icon_id: iconId,
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
        t("cms.cybersecurity.operationIntelligence.bullets.messages.updated")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t(
            "cms.cybersecurity.operationIntelligence.bullets.messages.errorUpdating"
          )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.operationIntelligence.bullets.update")}
          </DialogTitle>
        </DialogHeader>
        <OperationIntelligenceBulletForm
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t(
            "cms.cybersecurity.operationIntelligence.bullets.update"
          )}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};
