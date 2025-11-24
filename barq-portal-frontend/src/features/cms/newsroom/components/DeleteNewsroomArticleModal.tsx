import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/store/modal-store";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomCardsEntity } from "@/sdk/types.gen";
import { useNewsroomCardsControllerDelete } from "@/sdk/modules/newsroomcard.gen";

export const DeleteNewsroomArticleModal = () => {
  const { t } = useLang();
  const deleteMutation = useNewsroomCardsControllerDelete();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteNewsroomArticle";

  const article = data?.article as NewsroomCardsEntity | undefined;

  const handleDelete = async () => {
    if (!article) return;

    try {
      await deleteMutation.mutateAsync({
        path: { id: String(article.id) },
      } );
      toast.success(t("cms.newsroom.articles.messages.deleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.newsroom.articles.messages.errorDeleting")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("cms.newsroom.articles.dialog.deleteTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("cms.newsroom.articles.dialog.deleteDescription", {
              title: article?.title ?? "",
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

