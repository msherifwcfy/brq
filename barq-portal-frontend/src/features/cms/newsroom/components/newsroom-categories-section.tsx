import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useNewsroomCategoryControllerReadQuery,
} from "@/sdk/modules/newsroomcategory.gen";
import { useModal } from "@/shared/store/modal-store";
import { useNewsroomCategoriesColumns } from "../columns/newsroom-categories-columns";

export default function NewsroomCategoriesSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { data, isLoading, refetch } = useNewsroomCategoryControllerReadQuery({
    query: {
      query: {
        relations: {
          newsroom_category_id_newsroom_category_translations: true,
        },
        pagination: { take: 100, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const categories = data?.data ?? [];

  const handleCreate = () => {
    onOpen("createNewsroomCategory", {}, refetch);
  };

  const handleEdit = (category: any) => {
    onOpen("updateNewsroomCategory", { category }, refetch);
  };

  const columns = useNewsroomCategoriesColumns(handleEdit);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button onClick={handleCreate} size="sm">
          <PlusIcon className="w-4 h-4" />
          {t("cms.newsroom.manageItems.categories.create") || "Create Category"}
        </Button>
      </div>

      <DataTable
        columns={columns as any}
        data={categories as any}
        loading={isLoading}
        tableId="newsroom-categories"
      />
    </div>
  );
}

