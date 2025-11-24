import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useBarqAcademyFoundationInternshipFormControllerReadQuery } from "@/sdk/modules/barqacademyfoundationinternshipform.gen";
import { useLang } from "@/shared/hooks/use-lang";

export default function AcademyInternshipSubmissionsSection() {
  const { t } = useLang();

  const { data, isLoading } =
    useBarqAcademyFoundationInternshipFormControllerReadQuery({
      query: {
        query: {
          relations: {
            resume: true,
            barq_academy_programs_opportunities_internship: {
              barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations:
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
        header: t("cms.academy.internshipSubmissions.columns.id") || "ID",
        accessorKey: "id",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.firstName") ||
          "First Name",
        accessorKey: "first_name",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.lastName") ||
          "Last Name",
        accessorKey: "last_name",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.email") || "Email",
        accessorKey: "email",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.phone") || "Phone",
        accessorKey: "phone",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.university") ||
          "University",
        accessorKey: "university_name",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.currentAcademicYear") ||
          "Academic Year",
        accessorKey: "current_academic_year",
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.linkedinUrl") ||
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
          t("cms.academy.internshipSubmissions.columns.resume") || "Resume",
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
              {t("cms.academy.internshipSubmissions.columns.viewResume") ||
                "View Resume"}
            </a>
          ) : (
            "-"
          );
        },
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.program") || "Program",
        accessorKey: "barq_academy_programs_opportunities_internship",
        cell: ({ row }: any) => {
          const program =
            row.original.barq_academy_programs_opportunities_internship;
          if (!program) {
            return "-";
          }
          const translations =
            program.barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations ||
            [];
          const enTranslation = translations.find(
            (translation: any) => translation.language === "en"
          );
          return enTranslation?.title || program.title || "-";
        },
      },
      {
        header:
          t("cms.academy.internshipSubmissions.columns.createdAt") ||
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
          {t("cms.academy.internshipSubmissions.messages.noSubmissionsFound") ||
            "No submissions found"}
        </div>
      )}
    </div>
  );
}

