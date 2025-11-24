import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { FooterLocationForm } from "./FooterLocationForm";
import { useFooterLocationsControllerUpdate } from "@/sdk/modules/footerlocation.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const UpdateFooterLocationModal = () => {
  const { t } = useLang();
  const updateMutation = useFooterLocationsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateFooterLocation";

  const handleSubmit = async (values: { name: string }) => {
    try {
      await updateMutation.mutateAsync({
        path: { id: String(data?.id) },
        body: {
          name: values.name,
          footer_locations_id_footer_locations_translations: [
            {
              name: values.name,
              language: "en",
            },
            {
              name: values.name,
              language: "ar",
            },
          ],
        },
      });
      toast.success(t("footerLocations.messages.footerLocationUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerLocations.messages.errorUpdatingFooterLocation")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{t("footerLocations.updateFooterLocation")}</DialogTitle>
        </DialogHeader>
        <FooterLocationForm
          defaultValues={{
            name: data?.name,
          }}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("footerLocations.updateFooterLocation")}
          isUpdate
        />
      </DialogContent>
    </Dialog>
  );
};
