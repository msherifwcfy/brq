import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { useSuccessStoryCaseStudiesControllerSoftDelete } from "@/sdk/modules/successstorycasestudy.gen";
import type { SuccessStoryCaseStudiesEntity } from "@/sdk";

export const DeleteCaseStudyModal = () => {
  const { t } = useLang();
  const { onClose, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteCaseStudy";
  const caseStudy = data?.caseStudy as SuccessStoryCaseStudiesEntity;

  const deleteMutation = useSuccessStoryCaseStudiesControllerSoftDelete();
  const handleDelete = async () => {
    if (!caseStudy) return;

    try {
      await deleteMutation.mutateAsync({
        path: { id: String(caseStudy.id) },
      });
      toast.success(t("cms.newsroom.articles.messages.deleted"));
      onClose();
    } catch (error: any) {
      toast.error(
        error?.message ||
        t("caseStudies.messages.errorDeletingCaseStudy")
      );
      console.error("Error deleting case study:", error);
    }
  };

  if (!caseStudy) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("caseStudies.deleteCaseStudyTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("caseStudies.deleteCaseStudyDescription", {
              id: caseStudy.id,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            {t("caseStudies.deleteCaseStudy")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

