import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { useNewsroomCardsControllerReadQuery } from "@/sdk/modules/newsroomcard.gen";
import { useNewsroomArticlesColumns } from "../columns/newsroom-articles-columns";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomCardsEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { PlusIcon } from "lucide-react";

export default function NewsroomArticlesSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { data, isLoading, refetch } = useNewsroomCardsControllerReadQuery({
    query: {
      query: {
        relations: {
          newsroom_cards_id_newsroom_cards_translations: true,
          newsroom_category: true,
          image: true,
        },
        pagination: { skip: 0, take: 9 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  } );

  const articles = useMemo<NewsroomCardsEntity[]>(() => data?.data ?? [], [data?.data]);
  const handleCreate = () => {
    onOpen("createNewsroomArticle", {}, refetch);
  };

  const handleEdit = (article: NewsroomCardsEntity) => {
    onOpen("updateNewsroomArticle", { article }, refetch);
  };

  const handleDelete = (article: NewsroomCardsEntity) => {
    onOpen("deleteNewsroomArticle", { article }, refetch);
  };

  const columns = useNewsroomArticlesColumns(handleEdit, handleDelete, t);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <ProtectedComponent permissionKey={PERMISSION_KEYS.NEWSROOM_CARDS.CREATE}>
          <Button onClick={handleCreate}>
            <PlusIcon className="mr-2 h-4 w-4" />
            {t("cms.newsroom.articles.actions.add")}
          </Button>
        </ProtectedComponent>
      </div>
      {isLoading ? (
        <div>{t("common.loading")}</div>
      ) : articles.length > 0 ? (
        <DataTable<NewsroomCardsEntity, unknown> columns={columns} data={articles} />
      ) : (
        <div className="py-8 text-center text-muted-foreground">{t("cms.newsroom.articles.emptyState")}</div>
      )}
    </div>
  );
}


