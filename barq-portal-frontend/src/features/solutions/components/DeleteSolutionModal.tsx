import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useSolutionsControllerDelete } from "@/sdk/modules/solution.gen";
import type { SolutionsEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteSolutionModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteSolution";
  const solution = data?.solution;
  const deleteSolutionMutation = useSolutionsControllerDelete();

  const handleDelete = async () => {
    if (!solution) return;

    try {
      await deleteSolutionMutation.mutateAsync({
        path: {
          id: solution.id.toString(),
        },
      });
      toast.success(t("solutions.messages.solutionDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("solutions.messages.errorDeletingSolution")
      );
      console.error("Error deleting solution:", error);
    }
  };

  if (!solution) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("solutions.deleteSolutionTitle")}</DialogTitle>
          <DialogDescription>
            {t("solutions.deleteSolutionDescription", { name: solution.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteSolutionMutation.isPending}
            onClick={handleDelete}
          >
            {deleteSolutionMutation.isPending
              ? t("solutions.form.loading")
              : t("solutions.deleteSolution")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
