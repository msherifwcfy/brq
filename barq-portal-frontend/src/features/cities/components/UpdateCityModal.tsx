import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useCityControllerReadOneQuery,
  useCityControllerUpdate,
} from "@/sdk/modules/city.gen";
import { useModal } from "@/shared/store/modal-store";
import { CityForm } from "./CityForm";
import type { UpdateCityFormData } from "../schemas/cities.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateCityModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateCity";

  const { data: cityData, isLoading } = useCityControllerReadOneQuery(
    {
      path: {
        id: data?.city?.id.toString() || "",
      },

      query: {
        query: {
          relations: {
            city_id_city_translations: true,
            country: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {
      enabled: open && !!data?.city?.id,
    }as any
  );
  const city = cityData?.data;

  const updateCityMutation = useCityControllerUpdate();

  const handleSubmit = async (formData: UpdateCityFormData) => {
    if (!city) return;

    try {
      await updateCityMutation.mutateAsync({
        body: {
          name: formData.name,
          country_id: formData.country_id,
          city_id_city_translations:
            formData.city_id_city_translations || [],
        },
        path: {
          id: city.id.toString(),
        },
      });
      toast.success(t("cities.messages.cityUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cities.messages.errorUpdatingCity")
      );
      console.error("Error updating city:", error);
    }
  };

  if (!city) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cities.updateCityTitle", { name: city.name })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <CityForm
            defaultValues={{
              name: city.name,
              country_id: city.country_id,
              city_id_city_translations:
                city.city_id_city_translations?.map((trans) => ({
                  id: trans.id,
                  city_id: trans.city_id,
                  name: trans.name,
                  language: trans.language,
                })) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateCityMutation.isPending}
            submitLabel={t("cities.updateCity")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

