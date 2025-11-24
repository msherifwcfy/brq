import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useSolutionsControllerCreate } from "@/sdk/modules/solution.gen";
import { useModal } from "@/shared/store/modal-store";
import { SolutionForm } from "./SolutionForm";
import type { CreateSolutionFormData } from "../schemas/solutions.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateSolutionModal = () => {
  const { t } = useLang();
  const createSolutionMutation = useSolutionsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createSolution";

  const handleSubmit = async (data: CreateSolutionFormData) => {
    try {
      await createSolutionMutation.mutateAsync({
        body: {
          name: data.name,
          solutions_id_solutions_translations:
            data.solution_id_solution_translations || [],
        },
      });
      toast.success(t("solutions.messages.solutionCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("solutions.messages.errorCreatingSolution")
      );
      console.error("Error creating solution:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("solutions.createNewSolution")}</DialogTitle>
        </DialogHeader>

        <SolutionForm
          onSubmit={handleSubmit as any}
          isLoading={createSolutionMutation.isPending}
          submitLabel={t("solutions.createSolution")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
