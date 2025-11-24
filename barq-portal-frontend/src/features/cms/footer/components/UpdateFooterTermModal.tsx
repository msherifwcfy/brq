import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { FooterTermsForm } from "./FooterTermsForm";
import { useFooterTermsControllerUpdate } from "@/sdk/modules/footerterm.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { useMemo } from "react";
import type { FooterTermsEntity } from "@/sdk";

export const UpdateFooterTermModal = () => {
  const { t } = useLang();
  const updateMutation = useFooterTermsControllerUpdate();
  const { onClose, refetch, isOpen, type, data:defaultData } = useModal();
  const open = isOpen && type === "updateFooterTerm";
  const data = defaultData as FooterTermsEntity;

  const defaultValues = useMemo(() => {
    if (!data) return undefined;
    
 
    const title = {
      en: data?.footer_terms_id_footer_terms_translations.find((item) => item.language === "en")?.terms || "",
      ar: data?.terms
    }

    return {
      title:{
        en: title.en,
        ar: title.ar,
      },
      file: data.file as any,
    };
  }, [data]);

  const handleSubmit = async (values: { title: { en: string; ar: string }; file?: any }) => {
    try {
      await updateMutation.mutateAsync({
        path: { id: String(data?.id) },
        body: {
          file_id: values.file?.id,
          terms: values.title.ar,
          footer_terms_id_footer_terms_translations: [{
            terms: values.title.en,
            language: "en",
          }],
        },
      });
      toast.success(t("footerTerms.messages.footerTermUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerTerms.messages.errorUpdatingFooterTerm")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("footerTerms.updateFooterTerm")}</DialogTitle>
        </DialogHeader>
        <FooterTermsForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("footerTerms.updateFooterTerm")}
          isUpdate
        />
      </DialogContent>
    </Dialog>
  );
};

