import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useContactUsHearAboutDropControllerSoftDelete } from "@/sdk/modules/contactushearaboutdrop.gen";
import type { ContactUsHearAboutDropEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteHearAboutUsOptionModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteHearAboutUsOption";
  const hearAboutUsOption = data?.hearAboutUsOption;
  const deleteHearAboutUsOptionMutation = useContactUsHearAboutDropControllerSoftDelete();

  const handleDelete = async () => {
    if (!hearAboutUsOption) return;

    try {
      await deleteHearAboutUsOptionMutation.mutateAsync({
        path: {
          id: hearAboutUsOption.id.toString(),
        },
      });
      toast.success(t("hearAboutUsOptions.messages.optionDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("hearAboutUsOptions.messages.errorDeletingOption")
      );
      console.error("Error deleting hear about us option:", error);
    }
  };

  if (!hearAboutUsOption) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("hearAboutUsOptions.deleteOptionTitle")}</DialogTitle>
          <DialogDescription>
            {t("hearAboutUsOptions.deleteOptionDescription", { title: hearAboutUsOption.title })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteHearAboutUsOptionMutation.isPending}
            onClick={handleDelete}
          >
            {deleteHearAboutUsOptionMutation.isPending
              ? t("hearAboutUsOptions.form.loading")
              : t("hearAboutUsOptions.deleteOption")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

