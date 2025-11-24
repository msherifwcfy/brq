import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { useCareerApplicationFormControllerReadQuery } from "@/sdk/modules/careerapplicationform.gen";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useLang } from "@/shared/hooks/use-lang";
import { BASE_URL } from "@/shared/utils/env";

export default function FormSubmissionsSection() {
  const { t } = useLang();

  const { data, isLoading } = useCareerApplicationFormControllerReadQuery({
    query: {
      query: {
        relations: {
          career_job_detail: {
            career_open_position: {
              career_open_position_id_career_open_position_translations: true,
            },
          },
          resume: true,
        },
        pagination: { take: 50, skip: 0 },
      },
    },
  });

  const submissions = data?.data ?? [];

  const columns = useMemo(() => {
    return [
      { header: t("cms.careers.formSubmissions.columns.id"), accessorKey: "id" },
      { header: t("cms.careers.formSubmissions.columns.firstName"), accessorKey: "first_name" },
      { header: t("cms.careers.formSubmissions.columns.lastName"), accessorKey: "last_name" },
      { header: t("cms.careers.formSubmissions.columns.email"), accessorKey: "email" },
      { header: t("cms.careers.formSubmissions.columns.phoneNumber"), accessorKey: "phone_number" },
      { header: t("cms.careers.formSubmissions.columns.jobTitle"), accessorKey: "job_title" },
      {
        header: t("cms.careers.formSubmissions.columns.linkedInUrl"),
        accessorKey: "linkedin_url",
        cell: ({ row }: any) => {
          const url = row.original.linkedin_url;
          return url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {url}
            </a>
          ) : (
            "-"
          );
        },
      },
      {
        header: t("cms.careers.formSubmissions.columns.position"),
        accessorKey: "career_job_detail.career_open_position.job_title",
        cell: ({ row }: any) => {
          const position = row.original.career_job_detail?.career_open_position;
          const enTranslation = position?.career_open_position_id_career_open_position_translations?.find(
            (t: any) => t.language === "en"
          );
          return enTranslation?.job_title || position?.job_title || "-";
        },
      },
      {
        header: t("cms.careers.formSubmissions.columns.resume"),
        accessorKey: "resume.url",
        cell: ({ row }: any) => {
          const resume = row.original.resume;
          return resume?.url ? (
            <a
              href={resume.url + resume.key}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t("cms.careers.formSubmissions.columns.viewResume")}
            </a>
          ) : (
            "-"
          );
        },
      },
      {
        header: t("cms.careers.formSubmissions.columns.createdAt"),
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
      ) : submissions?.length ? (
        <DataTable columns={columns as any} data={submissions as any} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {t("cms.careers.formSubmissions.messages.noSubmissionsFound")}
        </div>
      )}
    </div>
  );
}

