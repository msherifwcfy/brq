import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useCityControllerDelete } from "@/sdk/modules/city.gen";
import type { CityEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteCityModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteCity";
  const city = data?.city;
  const deleteCityMutation = useCityControllerDelete();

  const handleDelete = async () => {
    if (!city) return;

    try {
      await deleteCityMutation.mutateAsync({
        path: {
          id: city.id.toString(),
        },
      });
      toast.success(t("cities.messages.cityDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cities.messages.errorDeletingCity")
      );
      console.error("Error deleting city:", error);
    }
  };

  if (!city) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("cities.deleteCityTitle")}</DialogTitle>
          <DialogDescription>
            {t("cities.deleteCityDescription", { name: city.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteCityMutation.isPending}
            onClick={handleDelete}
          >
            {deleteCityMutation.isPending
              ? t("cities.form.loading")
              : t("cities.deleteCity")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

