import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { WhoWeAreStatForm } from "./WhoWeAreStatForm";
import {
  useLandingNumbersControllerReadOneQuery,
  useLandingNumbersControllerUpdate,
} from "@/sdk/modules/landingnumber.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

export const UpdateWhoWeAreStatModal = () => {
  const { t, lang } = useLang();
  const updateMutation = useLandingNumbersControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateWhoWeAreStat";

  const { data: landingNumberData, isPending } =
    useLandingNumbersControllerReadOneQuery({
      path: {
        id: data?.id,
      },
      query: {
        query: {
          relations: {
            landing_numbers_id_landing_numbers_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    });
  const landingNumber = landingNumberData?.data;

  const enTranslation =
    landingNumber?.landing_numbers_id_landing_numbers_translations?.find(
      (t) => t.language === "en"
    );

  const handleSubmit = async (values: {
    number: number;
    label: { en: string; ar: string };
  }) => {
    try {
      await updateMutation.mutateAsync({
        path: { id: String(data?.id) },
        body: {
          number: values.number,
          label: values.label.ar,
          landing_numbers_id_landing_numbers_translations: [
            { label: values.label.en, language: "en" },
          ],
        },
      });
      toast.success(t("cms.homePage.whoWeAreStats.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.homePage.whoWeAreStats.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{t("cms.homePage.whoWeAreStats.update")}</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <WhoWeAreStatForm
            defaultValues={{
              number: data?.number,
              label: {
                en: enTranslation?.label || "",
                ar: landingNumber?.label || "",
              },
            }}
            onSubmit={handleSubmit}
            isLoading={updateMutation.isPending}
            submitLabel={t("cms.homePage.whoWeAreStats.update")}
            isUpdate
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
