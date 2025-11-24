import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useCareerOpportunityControllerReadQuery,
} from "@/sdk/modules/careeropportunity.gen";
import { useModal } from "@/shared/store/modal-store";
import { useCareerOpportunitiesColumns } from "../columns/career-opportunities-columns";

export default function CareerOpportunitiesSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { data, isLoading, refetch } = useCareerOpportunityControllerReadQuery({
    query: {
      query: {
        relations: {
          career_opportunity_id_career_opportunity_translations: true,
        },
        pagination: { take: 100, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const opportunities = data?.data ?? [];

  const handleCreate = () => {
    onOpen("createCareerOpportunity", {}, refetch);
  };

  const handleEdit = (opportunity: any) => {
    onOpen("updateCareerOpportunity", { opportunity }, refetch);
  };

  const handleDelete = (opportunity: any) => {
    onOpen("deleteCareerOpportunity", { opportunity }, refetch);
  };

  const columns = useCareerOpportunitiesColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button onClick={handleCreate} size="sm">
          <PlusIcon className="w-4 h-4" />
          {t("cms.careers.manageItems.opportunities.create") || "Create Opportunity"}
        </Button>
      </div>

      <DataTable
        columns={columns as any}
        data={opportunities as any}
        loading={isLoading}
        tableId="career-opportunities"
      />
    </div>
  );
}

