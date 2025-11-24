import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useCountryControllerCreate } from "@/sdk/modules/country.gen";
import { useModal } from "@/shared/store/modal-store";
import { CountryForm } from "./CountryForm";
import type { CreateCountryFormData } from "../schemas/countries.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateCountryModal = () => {
  const { t } = useLang();
  const createCountryMutation = useCountryControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createCountry";

  const handleSubmit = async (data: CreateCountryFormData) => {
    try {
      await createCountryMutation.mutateAsync({
        body: {
          name: data.name,
          country_id_country_translations:
            data.country_id_country_translations || [],
        },
      });
      toast.success(t("countries.messages.countryCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("countries.messages.errorCreatingCountry")
      );
      console.error("Error creating country:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("countries.createNewCountry")}</DialogTitle>
        </DialogHeader>

        <CountryForm
          onSubmit={handleSubmit as any}
          isLoading={createCountryMutation.isPending}
          submitLabel={t("countries.createCountry")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
