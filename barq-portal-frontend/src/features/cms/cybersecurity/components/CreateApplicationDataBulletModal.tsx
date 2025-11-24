import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { ApplicationDataBulletForm } from "./ApplicationDataBulletForm";
import { useApplicationDataBulletsControllerCreate } from "@/mock-sdk/modules/application-data-bullets.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateApplicationDataBulletFormData } from "../schemas/application-data.schema";

export const CreateApplicationDataBulletModal = () => {
  const { t } = useLang();
  const createMutation = useApplicationDataBulletsControllerCreate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "createApplicationDataBullet";

  const handleSubmit = async (values: CreateApplicationDataBulletFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await createMutation.mutateAsync({
        body: {
          text: values.text.ar,
          icon_id: iconId,
          side: values.side,
          application_data_id: data?.applicationDataId || 1,
          application_data_bullets_id_application_data_bullets_translations: [
            {
              language: "en",
              text: values.text.en,
            },
          ],
        } as any,
      } as any);
      toast.success(
        t("cms.cybersecurity.applicationData.bullets.messages.created")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.applicationData.bullets.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.applicationData.bullets.create")}
          </DialogTitle>
        </DialogHeader>
        <ApplicationDataBulletForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.cybersecurity.applicationData.bullets.create")}
        />
      </DialogContent>
    </Dialog>
  );
};
