import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { useContactUsControllerReadQuery } from "@/sdk/modules/contactus.gen";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useLang } from "@/shared/hooks/use-lang";
import { useUpdateQueryParam } from "@/shared/hooks/useUpdateQueryParam";

export default function ContactUsSubmissionsSection() {
  const { t } = useLang();
  const { getQueryParam } = useUpdateQueryParam();
  const keyword = getQueryParam("keyword");
  
  const { data, isLoading } = useContactUsControllerReadQuery({
    query: {
      query: {
        pagination: { take: 50, skip: 0 },
        filters: keyword ? { name: { $val: keyword, $op: 'Contains' } } : {},
        relations:{
          hear_about_drop: {
            contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: true,
          },
          request_type: {
            contact_us_request_type_id_contact_us_request_type_translations: true,
          },
        }
      },
    },
  });

  const submissions = data?.data ?? [];

  const columns = useMemo(() => {
    return [
      { header: t("cms.contactUs.submissions.columns.id"), accessorKey: "id" },
      { header: t("cms.contactUs.submissions.columns.name"), accessorKey: "name" },
      { header: t("cms.contactUs.submissions.columns.email"), accessorKey: "email" },
      { header: t("cms.contactUs.submissions.columns.phone"), accessorKey: "phone_number",cell: ({ row }) => {
        return <div>
          {row.original.phone_number_key} {row.original.phone_number}
        </div>
      } },
      { header: t("cms.contactUs.submissions.columns.message"), accessorKey: "message" },
      { header: t("cms.contactUs.submissions.columns.requestType"), accessorKey: "request_type.title" },
      { header: t("cms.contactUs.submissions.columns.hearAboutDrop"), accessorKey: "hear_about_drop.title" },
      { header: t("cms.contactUs.submissions.columns.createdAt"), accessorKey: "created_at",cell: ({ row }) => {
        return <DateTimeDisplay
          date={row.original.created_at}
          format="dateAndTime"
        />
      } },
      { header: t("cms.contactUs.submissions.columns.updatedAt"), accessorKey: "updated_at",cell: ({ row }) => {
        return <DateTimeDisplay
          date={row.original.updated_at}
          format="dateAndTime"
        />
      } },
    ];

  }, [t]);

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">{t("common.loading")}</div>
      ) : submissions?.length ? (
        <DataTable columns={columns} data={submissions } />
      ) : (
        <div className="text-center py-8 text-muted-foreground">{t("cms.contactUs.submissions.messages.noSubmissionsFound")}</div>
      )}
    </div>
  );
}


