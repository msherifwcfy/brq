import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { WhoWeAreStatForm } from "./WhoWeAreStatForm";
import { useLandingNumbersControllerCreate } from "@/sdk/modules/landingnumber.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateWhoWeAreStatModal = () => {
  const { t } = useLang();
  const createMutation = useLandingNumbersControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createWhoWeAreStat";

  const handleSubmit = async (values: {
    number: number;
    label: { en: string; ar: string };
  }) => {
    try {
      await createMutation.mutateAsync({
        body: {
          number: values.number,
          label: values.label.ar,
          landing_numbers_id_landing_numbers_translations: [
            { label: values.label.en, language: "en" },
          ],
        },
      });
      toast.success(t("cms.homePage.whoWeAreStats.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.homePage.whoWeAreStats.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{t("cms.homePage.whoWeAreStats.create")}</DialogTitle>
        </DialogHeader>
        <WhoWeAreStatForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.homePage.whoWeAreStats.create")}
        />
      </DialogContent>
    </Dialog>
  );
};
