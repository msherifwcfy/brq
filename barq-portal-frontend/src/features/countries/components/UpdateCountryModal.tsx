import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useCountryControllerReadOneQuery,
  useCountryControllerUpdate,
} from "@/sdk/modules/country.gen";
import { useModal } from "@/shared/store/modal-store";
import { CountryForm } from "./CountryForm";
import type { UpdateCountryFormData } from "../schemas/countries.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateCountryModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateCountry";

  const { data: countryData, isLoading } = useCountryControllerReadOneQuery(
    {
      path: {
        id: data?.country?.id.toString(),
      },

      query: {
        query: {
          relations: {
            country_id_country_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {}
  );
  const country = countryData?.data;

  const updateCountryMutation = useCountryControllerUpdate();

  const handleSubmit = async (formData: UpdateCountryFormData) => {
    if (!country) return;

    try {
      await updateCountryMutation.mutateAsync({
        body: {
          name: formData.name,
          country_id_country_translations:
            formData.country_id_country_translations || [],
        },
        path: {
          id: country.id.toString(),
        },
      });
      toast.success(t("countries.messages.countryUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("countries.messages.errorUpdatingCountry")
      );
      console.error("Error updating country:", error);
    }
  };

  if (!country) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("countries.updateCountryTitle", { name: country.name })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <CountryForm
            defaultValues={{
              name: country.name,
              country_id_country_translations:
                country.country_id_country_translations?.map((trans) => ({
                  id: trans.id,
                  country_id: trans.country_id,
                  name: trans.name,
                  language: trans.language,
                })) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateCountryMutation.isPending}
            submitLabel={t("countries.updateCountry")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
