import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAlliancesVendorsControllerCreate } from "@/sdk/modules/alliancesvendor.gen";
import { useModal } from "@/shared/store/modal-store";
import { AlliancesVendorForm } from "./AlliancesVendorForm";
import type { CreateAlliancesVendorFormData } from "../schemas/alliances-vendors.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateAlliancesVendorModal = () => {
  const { t } = useLang();
  const createAlliancesVendorMutation = useAlliancesVendorsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createAlliancesVendor";

  const handleSubmit = async (data: CreateAlliancesVendorFormData) => {
    try {
      await createAlliancesVendorMutation.mutateAsync({
        body: {
          media_id: (data as any)?.media_id,
          countries_ids: data.countries_ids,
          solutions_ids: data.solutions_ids,
        },
      });
      toast.success(t("alliancesVendors.messages.alliancesVendorCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
        t("alliancesVendors.messages.errorCreatingAlliancesVendor")
      );
      console.error("Error creating alliances vendor:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesVendors.createNewAlliancesVendor")}
          </DialogTitle>
        </DialogHeader>

        <AlliancesVendorForm
          onSubmit={handleSubmit as any}
          isLoading={createAlliancesVendorMutation.isPending}
          submitLabel={t("alliancesVendors.createAlliancesVendor")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
