import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useCareerCategoryControllerReadQuery,
} from "@/sdk/modules/careercategory.gen";
import { useModal } from "@/shared/store/modal-store";
import { useCareerCategoriesColumns } from "../columns/career-categories-columns";

export default function CareerCategoriesSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { data, isLoading, refetch } = useCareerCategoryControllerReadQuery({
    query: {
      query: {
        relations: {
          career_category_id_career_category_translations: true,
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
    onOpen("createCareerCategory", {}, refetch);
  };

  const handleEdit = (category: any) => {
    onOpen("updateCareerCategory", { category }, refetch);
  };

  const handleDelete = (category: any) => {
    onOpen("deleteCareerCategory", { category }, refetch);
  };

  const columns = useCareerCategoriesColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button onClick={handleCreate} size="sm">
          <PlusIcon className="w-4 h-4" />
          {t("cms.careers.manageItems.categories.create") || "Create Category"}
        </Button>
      </div>

      <DataTable
        columns={columns as any}
        data={categories as any}
        loading={isLoading}
        tableId="career-categories"
      />
    </div>
  );
}

