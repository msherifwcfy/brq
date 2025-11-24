import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { FooterLocationForm } from "./FooterLocationForm";
import { useFooterLocationsControllerCreate } from "@/sdk/modules/footerlocation.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateFooterLocationModal = () => {
  const { t } = useLang();
  const createMutation = useFooterLocationsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createFooterLocation";

  const handleSubmit = async (values: { name: string }) => {
    try {
      await createMutation.mutateAsync({
        body: {
          name: values.name,
          footer_locations_id_footer_locations_translations: [
            { name: values.name, language: "en" },
            { name: values.name, language: "ar" },
          ],
        },
      });
      toast.success(t("footerLocations.messages.footerLocationCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerLocations.messages.errorCreatingFooterLocation")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{t("footerLocations.createFooterLocation")}</DialogTitle>
        </DialogHeader>
        <FooterLocationForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("footerLocations.createFooterLocation")}
        />
      </DialogContent>
    </Dialog>
  );
};
