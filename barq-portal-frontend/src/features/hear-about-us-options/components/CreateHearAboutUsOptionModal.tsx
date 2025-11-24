import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useContactUsHearAboutDropControllerCreate } from "@/sdk/modules/contactushearaboutdrop.gen";
import { useModal } from "@/shared/store/modal-store";
import { HearAboutUsOptionForm } from "./HearAboutUsOptionForm";
import type { CreateHearAboutUsOptionFormData } from "../schemas/hear-about-us-options.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateHearAboutUsOptionModal = () => {
  const { t } = useLang();
  const createHearAboutUsOptionMutation = useContactUsHearAboutDropControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createHearAboutUsOption";

  const handleSubmit = async (data: CreateHearAboutUsOptionFormData) => {
    try {
      await createHearAboutUsOptionMutation.mutateAsync({
        body: {
          title: data.title,
          contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations:
            data.contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations || [],
        },
      });
      toast.success(t("hearAboutUsOptions.messages.optionCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("hearAboutUsOptions.messages.errorCreatingOption")
      );
      console.error("Error creating hear about us option:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("hearAboutUsOptions.createNewOption")}</DialogTitle>
        </DialogHeader>

        <HearAboutUsOptionForm
          onSubmit={handleSubmit as any}
          isLoading={createHearAboutUsOptionMutation.isPending}
          submitLabel={t("hearAboutUsOptions.createOption")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};

