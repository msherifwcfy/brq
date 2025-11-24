import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useContactUsHearAboutDropControllerReadOneQuery,
  useContactUsHearAboutDropControllerUpdate,
} from "@/sdk/modules/contactushearaboutdrop.gen";
import { useModal } from "@/shared/store/modal-store";
import { HearAboutUsOptionForm } from "./HearAboutUsOptionForm";
import type { UpdateHearAboutUsOptionFormData } from "../schemas/hear-about-us-options.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateHearAboutUsOptionModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateHearAboutUsOption";

  const { data: hearAboutUsOptionData, isLoading } = useContactUsHearAboutDropControllerReadOneQuery(
    {
      path: {
        id: data?.hearAboutUsOption?.id.toString(),
      },

      query: {
        query: {
          relations: {
            contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {}
  );
  const hearAboutUsOption = hearAboutUsOptionData?.data;

  const updateHearAboutUsOptionMutation = useContactUsHearAboutDropControllerUpdate();

  const handleSubmit = async (formData: UpdateHearAboutUsOptionFormData) => {
    if (!hearAboutUsOption) return;

    try {
      await updateHearAboutUsOptionMutation.mutateAsync({
        body: {
          title: formData.title,
          contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations:
            formData.contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations || [],
        },
        path: {
          id: hearAboutUsOption.id.toString(),
        },
      });
      toast.success(t("hearAboutUsOptions.messages.optionUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("hearAboutUsOptions.messages.errorUpdatingOption")
      );
      console.error("Error updating hear about us option:", error);
    }
  };

  if (!hearAboutUsOption) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("hearAboutUsOptions.updateOptionTitle", { title: hearAboutUsOption.title })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <HearAboutUsOptionForm
            defaultValues={{
              title: hearAboutUsOption.title,
              contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations:
                hearAboutUsOption.contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations?.map((trans) => ({
                  id: trans.id,
                  contact_us_hear_about_drop_id: trans.contact_us_hear_about_drop_id,
                  title: trans.title,
                  language: trans.language,
                })) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateHearAboutUsOptionMutation.isPending}
            submitLabel={t("hearAboutUsOptions.updateOption")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

