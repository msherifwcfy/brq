import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useCareerOpenPositionControllerReadQuery,
  useCareerOpenPositionControllerCreate,
  useCareerOpenPositionControllerUpdate,
  useCareerOpenPositionControllerDelete,
} from "@/sdk/modules/careeropenposition.gen";
import { useModal } from "@/shared/store/modal-store";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useOpenPositionsColumns } from "../columns/open-positions-columns";

export default function OpenPositionsSection() {
  const { t } = useLang();
  const { onOpen } = useModal();

  const { data, isLoading, refetch } = useCareerOpenPositionControllerReadQuery({
    query: {
      query: {
        relations: {
          career_open_position_id_career_open_position_translations: true,
          career_opportunity: {
            career_opportunity_id_career_opportunity_translations: true,
          },
          career_category: {
            career_category_id_career_category_translations: true,
          },
          city: {
            city_id_city_translations: true,
          },
        },
        pagination: { take: 100, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const positions = data?.data ?? [];

  const handleCreate = () => {
    onOpen("createCareerOpenPosition", {}, refetch);
  };

  const handleEdit = (position: any) => {
    onOpen("updateCareerOpenPosition", { position }, refetch);
  };

  const handleDelete = (position: any) => {
    onOpen("deleteCareerOpenPosition", { position }, refetch);
  };

  const columns = useOpenPositionsColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button onClick={handleCreate} size="sm">
          <PlusIcon className="w-4 h-4" />
          {t("cms.careers.openPositions.create") || "Create Open Position"}
        </Button>
      </div>

      <DataTable
        columns={columns as any}
        data={positions as any}
        loading={isLoading}
        tableId="career-open-positions"
      />
    </div>
  );
}

