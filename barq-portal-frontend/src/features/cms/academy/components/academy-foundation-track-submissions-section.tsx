import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useBarqAcademyFoundationTracksFormControllerReadQuery } from "@/sdk/modules/barqacademyfoundationtracksform.gen";
import { useLang } from "@/shared/hooks/use-lang";

export default function AcademyFoundationTrackSubmissionsSection() {
  const { t } = useLang();

  const { data, isLoading } =
    useBarqAcademyFoundationTracksFormControllerReadQuery({
      query: {
        query: {
          relations: {
            resume: true,
            barq_academy_programs_opportunities: {
              barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations:
                true,
            },
          },
          pagination: { take: 50, skip: 0 },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    });

  const submissions = data?.data ?? [];

  const columns = useMemo(() => {
    return [
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.id") || "ID",
        accessorKey: "id",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.firstName") ||
          "First Name",
        accessorKey: "first_name",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.lastName") ||
          "Last Name",
        accessorKey: "last_name",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.email") ||
          "Email",
        accessorKey: "email",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.phone") ||
          "Phone",
        accessorKey: "phone",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.university") ||
          "University",
        accessorKey: "university_name",
      },
      {
        header:
          t(
            "cms.academy.foundationTrackSubmissions.columns.currentAcademicYear"
          ) || "Academic Year",
        accessorKey: "current_academic_year",
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.linkedinUrl") ||
          "LinkedIn URL",
        accessorKey: "linkedin_url",
        cell: ({ row }: any) => {
          const url = row.original.linkedin_url;
          return url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {url}
            </a>
          ) : (
            "-"
          );
        },
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.resume") ||
          "Resume",
        accessorKey: "resume",
        cell: ({ row }: any) => {
          const resume = row.original.resume;
          return resume?.url ? (
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t(
                "cms.academy.foundationTrackSubmissions.columns.viewResume"
              ) || "View Resume"}
            </a>
          ) : (
            "-"
          );
        },
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.track") ||
          "Track",
        accessorKey: "barq_academy_programs_opportunities",
        cell: ({ row }: any) => {
          const track = row.original.barq_academy_programs_opportunities;
          if (!track) {
            return "-";
          }
          const translations =
            track.barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations ||
            [];
          const enTranslation = translations.find(
            (translation: any) => translation.language === "en"
          );
          return enTranslation?.title || track.title || "-";
        },
      },
      {
        header:
          t("cms.academy.foundationTrackSubmissions.columns.createdAt") ||
          "Created At",
        accessorKey: "created_at",
        cell: ({ row }: any) => {
          return (
            <DateTimeDisplay date={row.original.created_at} format="dateAndTime" />
          );
        },
      },
    ];
  }, [t]);

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("common.loading") || "Loading..."}
        </div>
      ) : submissions.length ? (
        <DataTable columns={columns as any} data={submissions as any} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {t(
            "cms.academy.foundationTrackSubmissions.messages.noSubmissionsFound"
          ) || "No submissions found"}
        </div>
      )}
    </div>
  );
}


