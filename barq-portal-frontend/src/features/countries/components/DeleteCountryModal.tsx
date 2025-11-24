import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useCountryControllerDelete } from "@/sdk/modules/country.gen";
import type { CountryEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteCountryModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteCountry";
  const country = data?.country;
  const deleteCountryMutation = useCountryControllerDelete();

  const handleDelete = async () => {
    if (!country) return;

    try {
      await deleteCountryMutation.mutateAsync({
        path: {
          id: country.id.toString(),
        },
      });
      toast.success(t("countries.messages.countryDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("countries.messages.errorDeletingCountry")
      );
      console.error("Error deleting country:", error);
    }
  };

  if (!country) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("countries.deleteCountryTitle")}</DialogTitle>
          <DialogDescription>
            {t("countries.deleteCountryDescription", { name: country.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteCountryMutation.isPending}
            onClick={handleDelete}
          >
            {deleteCountryMutation.isPending
              ? t("countries.form.loading")
              : t("countries.deleteCountry")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
