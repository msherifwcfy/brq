import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useNewsroomCardsControllerCreate } from "@/sdk/modules/newsroomcard.gen";
import NewsroomArticleForm from "./newsroom-article-form";
import { useModal } from "@/shared/store/modal-store";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomArticleFormData } from "../schemas/newsroom-article.schema";

export const CreateNewsroomArticleModal = () => {
  const { t } = useLang();
  const createMutation = useNewsroomCardsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createNewsroomArticle";

  const handleSubmit = async (values: NewsroomArticleFormData) => {
    const imageId = values.image?.[0]?.id;

    const body = {
      date_time: values.date,
      image_id: imageId,
      is_vertical: values.is_vertical,
      newsroom_category_id: values.categoryId,
      newsroom_cards_id_newsroom_cards_translations: [
        {
          language: "ar" as const,
          title: values.title.ar,
          description: values.description.ar,
          long_description: values.long_description.ar,
        },
      ],
      home_image_id: values.home_image[0]?.id,
    };

    try {
      await createMutation.mutateAsync({
        body,
      } as any);
      toast.success(t("cms.newsroom.articles.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.newsroom.articles.messages.error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("cms.newsroom.articles.dialog.createTitle")}
          </DialogTitle>
        </DialogHeader>
        <NewsroomArticleForm
          article={null}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
