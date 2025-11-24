import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/shared/components/ui/data-table";
import {
  useAdditionalManagedServicesOneControllerReadQuery,
} from "@/sdk/modules/additionalmanagedservicesone.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function AdditionalManagedServicesOneSection() {
  const { t } = useLang();
  const { data, isLoading, refetch } = useAdditionalManagedServicesOneControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          additional_managed_services_one_id_additional_managed_services_one_translations: true,
          file: true,
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
    onOpen("createAdditionalManagedServicesOne", {}, refetch);
  };

  const handleEdit = (service: any) => {
    onOpen("updateAdditionalManagedServicesOne", { service }, refetch);
  };

  const handleDelete = (service: any) => {
    onOpen("deleteAdditionalManagedServicesOne", { service }, refetch);
  };

  const columns = [
    {
      accessorKey: "description",
      header: t("cms.managedServices.additionalOne.list.columns.description"),
      cell: ({ row }: any) => {
        const translations = row.original.additional_managed_services_one_id_additional_managed_services_one_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span className="line-clamp-2">{enTranslation?.description || row.original.description || "-"}</span>;
      },
    },
    {
      accessorKey: "cta_label",
      header: t("cms.managedServices.additionalOne.list.columns.ctaLabel"),
      cell: ({ row }: any) => {
        const translations = row.original.additional_managed_services_one_id_additional_managed_services_one_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span>{enTranslation?.cta_label || row.original.cta_label || "-"}</span>;
      },
    },
    {
      id: "actions",
      header: t("cms.managedServices.additionalOne.list.columns.actions"),
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              {t("cms.managedServices.additionalOne.list.actions.edit")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              {t("cms.managedServices.additionalOne.list.actions.delete")}
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
          <CardTitle>{t("cms.managedServices.additionalOne.list.title")}</CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {t("cms.managedServices.additionalOne.list.addService")}
          </Button>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("cms.managedServices.additionalOne.list.noServices")}
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

