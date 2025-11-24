import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useSolutionsControllerReadOneQuery,
  useSolutionsControllerUpdate,
} from "@/sdk/modules/solution.gen";
import { useModal } from "@/shared/store/modal-store";
import { SolutionForm } from "./SolutionForm";
import type { UpdateSolutionFormData } from "../schemas/solutions.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateSolutionModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateSolution";

  const { data: solutionData, isLoading } = useSolutionsControllerReadOneQuery(
    {
      path: {
        id: data?.solution?.id.toString(),
      },

      query: {
        query: {
          relations: {
            solutions_id_solutions_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {}
  );
  const solution = solutionData?.data;

  const updateSolutionMutation = useSolutionsControllerUpdate();

  const handleSubmit = async (formData: UpdateSolutionFormData) => {
    if (!solution) return;

    try {
      await updateSolutionMutation.mutateAsync({
        body: {
          name: formData.name,
          solutions_id_solutions_translations:
            formData.solution_id_solution_translations || [],
        },
        path: {
          id: solution.id.toString(),
        },
      });
      toast.success(t("solutions.messages.solutionUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("solutions.messages.errorUpdatingSolution")
      );
      console.error("Error updating solution:", error);
    }
  };

  if (!solution) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("solutions.updateSolutionTitle", { name: solution.name })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <SolutionForm
            defaultValues={{
              name: solution.name,
              solution_id_solution_translations:
                solution.solutions_id_solutions_translations?.map((trans) => ({
                  id: trans.id,
                  solution_id: trans.solutions_id,
                  name: trans.name,
                  language: trans.language,
                })) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateSolutionMutation.isPending}
            submitLabel={t("solutions.updateSolution")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
