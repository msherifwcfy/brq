import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useNewsroomCardsControllerUpdate,
} from "@/sdk/modules/newsroomcard.gen";
import { useModal } from "@/shared/store/modal-store";
import NewsroomArticleForm from "./newsroom-article-form";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomArticleFormData } from "../schemas/newsroom-article.schema";
import type { NewsroomCardsEntity, UpdateNewsroomCards } from "@/sdk/types.gen";

export const UpdateNewsroomArticleModal = () => {
  const { t } = useLang();
  const updateMutation = useNewsroomCardsControllerUpdate();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateNewsroomArticle";

  const article = data?.article as NewsroomCardsEntity;


  const handleSubmit = async (values: NewsroomArticleFormData) => {
    if (!article) return;

    const imageId = values.image?.[0]?.id;

    const body: UpdateNewsroomCards = {
      date_time: values.date,
      image_id: imageId,
      is_featured: values.is_featured,
      newsroom_category_id: values.categoryId,
      is_vertical: values.is_vertical,
      home_image_id: values.home_image[0]?.id,
      newsroom_cards_id_newsroom_cards_translations: [
        {
          title: values.title.ar,
          description: values.description.ar,
          long_description: values.long_description.ar,
          language: "ar" as const,
        },
      ],
    };

    try {
      await updateMutation.mutateAsync({
        path: { id: String(article.id) },
        body,
      } as any);
      toast.success(t("cms.newsroom.articles.messages.updated"));
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
            {t("cms.newsroom.articles.dialog.editTitle")}
          </DialogTitle>
        </DialogHeader>
        <NewsroomArticleForm
          article={article ?? null}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
