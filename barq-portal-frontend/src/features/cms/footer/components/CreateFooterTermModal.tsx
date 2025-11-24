import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { FooterTermsForm } from "./FooterTermsForm";
import { useFooterTermsControllerCreate } from "@/sdk/modules/footerterm.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { transformI18nToTranslations } from "@/shared/schemas/i18n.schema";

export const CreateFooterTermModal = () => {
  const { t } = useLang();
  const createMutation = useFooterTermsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createFooterTerm";

  const handleSubmit = async (values: { title: { en: string; ar: string }; file?: any }) => {
    try {
      await createMutation.mutateAsync({
        body: {
          file_id: values.file?.id,
          terms: values.title.ar,
          footer_terms_id_footer_terms_translations: [{
            terms: values.title.en,
            language: "en",
          }],
        },
      });
      toast.success(t("footerTerms.messages.footerTermCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerTerms.messages.errorCreatingFooterTerm")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("footerTerms.createFooterTerm")}</DialogTitle>
        </DialogHeader>
        <FooterTermsForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("footerTerms.createFooterTerm")}
        />
      </DialogContent>
    </Dialog>
  );
};

