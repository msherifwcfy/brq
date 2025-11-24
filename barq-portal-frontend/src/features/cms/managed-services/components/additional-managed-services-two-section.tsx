import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/shared/components/ui/data-table";
import {
  useAdditionalManagedServicesTwoControllerReadQuery,
} from "@/sdk/modules/additionalmanagedservicestwo.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function AdditionalManagedServicesTwoSection() {
  const { t } = useLang();
  const { data, isLoading, refetch } = useAdditionalManagedServicesTwoControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          additional_managed_services_two_images: true,
          additional_managed_services_two_id_additional_managed_services_two_translations: true,
          additional_managed_services_two_id_managed_service_download_form: true,
        },
      },
    },
    headers:{
      'x-skip-translations': true,
    },
  });

  const services = data?.data || [];
  const { onOpen } = useModal();

  const handleCreate = () => {
    onOpen("createAdditionalManagedServicesTwo", {}, refetch);
  };

  const handleEdit = (service: any) => {
    onOpen("updateAdditionalManagedServicesTwo", { service }, refetch);
  };

  const handleDelete = (service: any) => {
    onOpen("deleteAdditionalManagedServicesTwo", { service }, refetch);
  };

  const columns = [
    {
      accessorKey: "description",
      header: t("cms.managedServices.additionalTwo.list.columns.description"),
      cell: ({ row }: any) => {
        const translations = row.original.additional_managed_services_two_id_additional_managed_services_two_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span className="line-clamp-2">{enTranslation?.description || row.original.description || "-"}</span>;
      },
    },
    {
      accessorKey: "images",
      header: t("cms.managedServices.additionalTwo.list.columns.images"),
      cell: ({ row }: any) => {
        const images = row.original.additional_managed_services_two_images || [];
        return <span>{images.length} {t("cms.managedServices.additionalTwo.list.columns.imageCount")}</span>;
      },
    },
    {
      id: "actions",
      header: t("cms.managedServices.additionalTwo.list.columns.actions"),
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              {t("cms.managedServices.additionalTwo.list.actions.edit")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("cms.managedServices.additionalTwo.title")}</CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {t("cms.managedServices.additionalTwo.list.actions.addService")}
          </Button>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("cms.managedServices.additionalTwo.list.emptyState")}
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={services}
              loading={isLoading}
              hideSearch
              filters={false}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

