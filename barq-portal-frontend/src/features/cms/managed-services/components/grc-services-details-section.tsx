import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useManagedGrcServicesDetailsControllerFindAllQuery } from "@/sdk/modules/managedgrcservicesdetail.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { DataTable } from "@/shared/components/ui/data-table";

export default function GrcServicesDetailsSection() {
  const { t } = useLang();
  const { data, isLoading, refetch } = useManagedGrcServicesDetailsControllerFindAllQuery({
    query: {
      query: {
        relations: {
          managed_grc_services_details_id_managed_grc_services_details_translations: true,
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
    onOpen("createGrcServicesDetails", {}, refetch);
  };

  const handleEdit = (service: any) => {
    onOpen("updateGrcServicesDetails", { service }, refetch);
  };

  const handleDelete = (service: any) => {
    onOpen("deleteGrcServicesDetails", { service }, refetch);
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: any) => {
        const translations = row.original.managed_grc_services_details_id_managed_grc_services_details_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span>{enTranslation?.title || row.original.title || "-"}</span>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }: any) => {
        const translations = row.original.managed_grc_services_details_id_managed_grc_services_details_translations || [];
        const enTranslation = translations.find((t: any) => t.language === "en");
        return <span className="line-clamp-2">{enTranslation?.description || row.original.description || "-"}</span>;
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
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
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
          <CardTitle>GRC Services Details</CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No GRC Services Details found. Click Create to add one.
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

