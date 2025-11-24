import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { useCareerJobDetailControllerReadQuery } from "@/sdk/modules/careerjobdetail.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";

export default function CareerJobDetailSection() {
  const { t } = useLang();

  const { data, isLoading } = useCareerJobDetailControllerReadQuery({
    query: {
      query: {
        relations: {
          career_open_position: {
            career_open_position_id_career_open_position_translations: true,
            career_category: {
              career_category_id_career_category_translations: true,
            },
            career_opportunity: {
              career_opportunity_id_career_opportunity_translations: true,
            },
          },
          career_job_detail_id_career_job_detail_translations: true,
          career_job_detail_cards_id_career_job_detail_cards: {
            career_job_detail_cards_id_career_job_detail_cards_translations: true,
          },
        },
        pagination: { take: 50, skip: 0 },
      },
    },
  });

  const jobDetails = data?.data ?? [];

  const columns = useMemo(() => {
    return [
      { header: t("cms.careers.jobDetail.columns.id"), accessorKey: "id" },
      {
        header: t("cms.careers.jobDetail.columns.jobTitle"),
        accessorKey: "career_open_position.job_title",
        cell: ({ row }: any) => {
          const position = row.original.career_open_position;
          const enTranslation = position?.career_open_position_id_career_open_position_translations?.find(
            (t: any) => t.language === "en"
          );
          return enTranslation?.job_title || position?.job_title || "-";
        },
      },
      {
        header: t("cms.careers.jobDetail.columns.category"),
        accessorKey: "career_open_position.career_category.name",
        cell: ({ row }: any) => {
          const category = row.original.career_open_position?.career_category;
          const enTranslation = category?.career_category_id_career_category_translations?.find(
            (t: any) => t.language === "en"
          );
          return enTranslation?.name || category?.name || "-";
        },
      },
      {
        header: t("cms.careers.jobDetail.columns.introSentence"),
        accessorKey: "intr_sentence",
        cell: ({ row }: any) => {
          const enTranslation = row.original.career_job_detail_id_career_job_detail_translations?.find(
            (t: any) => t.language === "en"
          );
          return enTranslation?.intr_sentence || row.original.intr_sentence || "-";
        },
      },
      {
        header: t("cms.careers.jobDetail.columns.cardsCount"),
        accessorKey: "career_job_detail_cards_id_career_job_detail_cards",
        cell: ({ row }: any) => {
          return row.original.career_job_detail_cards_id_career_job_detail_cards?.length || 0;
        },
      },
      {
        header: t("cms.careers.jobDetail.columns.createdAt"),
        accessorKey: "created_at",
        cell: ({ row }: any) => {
          return (
            <DateTimeDisplay
              date={row.original.created_at}
              format="dateAndTime"
            />
          );
        },
      },
    ];
  }, [t]);

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("common.loading")}
        </div>
      ) : jobDetails?.length ? (
        <DataTable columns={columns as any} data={jobDetails as any} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {t("cms.careers.jobDetail.messages.noJobDetailsFound")}
        </div>
      )}
    </div>
  );
}

