import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAlliancesVendorsControllerUpdate } from "@/sdk/modules/alliancesvendor.gen";
import { useModal } from "@/shared/store/modal-store";
import { AlliancesVendorForm } from "./AlliancesVendorForm";
import type { UpdateAlliancesVendorFormData } from "../schemas/alliances-vendors.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const UpdateAlliancesVendorModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateAlliancesVendor";
  const alliancesVendor = data?.alliancesVendor;

  const updateAlliancesVendorMutation = useAlliancesVendorsControllerUpdate();

  const handleSubmit = async (formData: UpdateAlliancesVendorFormData) => {
    if (!alliancesVendor) return;

    try {
      await updateAlliancesVendorMutation.mutateAsync({
        body: {
          countries_ids: formData.countries_ids,
          solutions_ids: formData.solutions_ids,
          media_id: formData.media?.[0].id,
        },
        path: {
          id: alliancesVendor.id.toString(),
        },
      });
      toast.success(t("alliancesVendors.messages.alliancesVendorUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
        t("alliancesVendors.messages.errorUpdatingAlliancesVendor")
      );
      console.error("Error updating alliances vendor:", error);
    }
  };

  if (!alliancesVendor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesVendors.updateAlliancesVendorTitle", {
              id: alliancesVendor.id,
            })}
          </DialogTitle>
        </DialogHeader>

        <AlliancesVendorForm
          defaultValues={{
            media: [alliancesVendor.media],
            countries_ids: alliancesVendor.countries.map((country) => country.id),
            solutions_ids: alliancesVendor.solutions.map((solution) => solution.id),
          }}
          onSubmit={handleSubmit as any}
          isLoading={updateAlliancesVendorMutation.isPending}
          submitLabel={t("alliancesVendors.updateAlliancesVendor")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};
