import { useMemo } from "react";
import { DataTable } from "@/shared/components/ui/data-table";
import { useManagedServiceDownloadFormControllerReadQuery } from "@/sdk/modules/managedservicedownloadform.gen";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";
import { useLang } from "@/shared/hooks/use-lang";

export default function ManagedServicesFormSubmissionsSection() {
  const { t } = useLang();

  const { data, isLoading } = useManagedServiceDownloadFormControllerReadQuery({
    query: {
      query: {
        relations: {
          managed_soc_services_details: {
            managed_soc_services_details_id_managed_soc_services_details_translations: true,
          },
        },
        pagination: { take: 50, skip: 0 },
      },
    },
  });

  const submissions = data?.data ?? [];

  const columns = useMemo(() => {
    return [
      { header: t("cms.managedServices.formSubmissions.columns.id") || "ID", accessorKey: "id" },
      {
        header: t("cms.managedServices.formSubmissions.columns.firstName") || "First Name",
        accessorKey: "first_name",
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.lastName") || "Last Name",
        accessorKey: "last_name",
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.email") || "Email",
        accessorKey: "email",
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.phoneNumber") || "Phone Number",
        accessorKey: "phone_number",
        cell: ({ row }: any) => {
          const phoneNumber = row.original.phone_number;
          const phoneKey = row.original.phone_number_key;
          return phoneKey && phoneNumber ? `${phoneKey} ${phoneNumber}` : phoneNumber || "-";
        },
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.position") || "Position",
        accessorKey: "position",
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.service") || "Service",
        accessorKey: "managed_soc_services_details",
        cell: ({ row }: any) => {
          const service = row.original.managed_soc_services_details;
          if (service) {
            return  service?.description || "-";
          }
          return "-";
        },
      },
      {
        header: t("cms.managedServices.formSubmissions.columns.createdAt") || "Created At",
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
          {t("common.loading") || "Loading..."}
        </div>
      ) : submissions?.length ? (
        <DataTable columns={columns as any} data={submissions as any} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {t("cms.managedServices.formSubmissions.messages.noSubmissionsFound") ||
            "No form submissions found"}
        </div>
      )}
    </div>
  );
}

