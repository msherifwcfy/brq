import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { DataTable } from "@/shared/components/ui/data-table";
import { DocumentPreviewer } from "@/shared/components/ui/document-previewer";
import { useManagedSocServicesDetailsControllerReadQuery } from "@/sdk/modules/managedsocservicesdetail.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export default function SocServicesDetailsSection() {
  const { t } = useLang();
  const { data, isLoading, refetch } = useManagedSocServicesDetailsControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          file: true,
          managed_soc_services_details_id_managed_soc_services_details_translations: true,
        },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const services = data?.data || [];
  const { onOpen } = useModal();

  const handleCreate = () => {
    onOpen("createSocServicesDetails", {}, refetch);
  };

  const handleEdit = (service: any) => {
    onOpen("updateSocServicesDetails", { service }, refetch);
  };

  const columns = [
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }: any) => {
        const translations = row.original.managed_soc_services_details_id_managed_soc_services_details_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span className="line-clamp-2">{enTranslation?.description || row.original.description || "-"}</span>;
      },
    },
    {
      accessorKey: "cta_button_text",
      header: "CTA Button Text",
      cell: ({ row }: any) => {
        const translations = row.original.managed_soc_services_details_id_managed_soc_services_details_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span>{enTranslation?.cta_button_text || row.original.cta_button_text || "-"}</span>;
      },
    },
    {
      accessorKey: "logo",
      header: "Logo",
      cell: ({ row }: any) => {
        if (!row.original.logo) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
            <DocumentPreviewer
              documentUrl={row.original.logo.url + row.original.logo.key}
              documentName={row.original.logo.key || "Logo"}
              documentFormat={row.original.logo.format}
              showDefaultTrigger
              triggerClassName="w-10 h-10"
            />
        );
      },
    },
    {
      accessorKey: "file",
      header: "File",
      cell: ({ row }: any) => {
        if (!row.original.file) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
            <DocumentPreviewer
              documentUrl={row.original.file.url + row.original.file.key}
              documentName={row.original.file.key || "File"}
              documentFormat={row.original.file.format}
              showDefaultTrigger
              triggerClassName="w-10 h-10"
            />
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
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
          <CardTitle>SOC Services Details</CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No SOC Services Details found. Click Create to add one.
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

