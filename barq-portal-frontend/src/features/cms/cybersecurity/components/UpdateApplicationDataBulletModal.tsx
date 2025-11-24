import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { ApplicationDataBulletForm } from "./ApplicationDataBulletForm";
import { useApplicationDataBulletsControllerUpdate } from "@/mock-sdk/modules/application-data-bullets.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { type CreateApplicationDataBulletFormData } from "../schemas/application-data.schema";

export const UpdateApplicationDataBulletModal = () => {
  const { t } = useLang();
  const updateMutation = useApplicationDataBulletsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateApplicationDataBullet";

  const bullet = data?.bullet;

  const defaultValues: Partial<CreateApplicationDataBulletFormData> = {
    text: {
      en:
        bullet?.application_data_bullets_id_application_data_bullets_translations?.find(
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
    side: bullet?.side || "left",
  };

  const handleSubmit = async (values: CreateApplicationDataBulletFormData) => {
    try {
      const iconId = values.icon?.[0]?.id;
      await updateMutation.mutateAsync({
        path: { id: String(bullet?.id) },
        body: {
          text: values.text.ar,
          icon_id: iconId,
          side: values.side,
          application_data_bullets_id_application_data_bullets_translations: [
            {
              language: "en",
              text: values.text.en,
            },
          ],
        } as any,
      } as any);
      toast.success(
        t("cms.cybersecurity.applicationData.bullets.messages.updated")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.applicationData.bullets.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.applicationData.bullets.update")}
          </DialogTitle>
        </DialogHeader>
        <ApplicationDataBulletForm
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.cybersecurity.applicationData.bullets.update")}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
};
