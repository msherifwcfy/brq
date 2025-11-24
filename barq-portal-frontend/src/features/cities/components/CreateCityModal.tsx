import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useCityControllerCreate } from "@/sdk/modules/city.gen";
import { useModal } from "@/shared/store/modal-store";
import { CityForm } from "./CityForm";
import type { CreateCityFormData } from "../schemas/cities.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateCityModal = () => {
  const { t } = useLang();
  const createCityMutation = useCityControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createCity";

  const handleSubmit = async (data: CreateCityFormData) => {
    try {
      await createCityMutation.mutateAsync({
        body: {
          name: data.name,
          country_id: data.country_id,
          city_id_city_translations:
            data.city_id_city_translations || [],
        },
      });
      toast.success(t("cities.messages.cityCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cities.messages.errorCreatingCity")
      );
      console.error("Error creating city:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cities.createNewCity")}</DialogTitle>
        </DialogHeader>

        <CityForm
          onSubmit={handleSubmit as any}
          isLoading={createCityMutation.isPending}
          submitLabel={t("cities.createCity")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};

