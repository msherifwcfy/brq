import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/shared/components/ui/data-table";
import { useManagedServiceCardsControllerFindAllQuery } from "@/sdk/modules/managedservicecard.gen";
import { useModal } from "@/shared/store/modal-store";
import { ProtectedComponent } from "@/shared/components/rbac/ProtectedComponent";
import { PERMISSION_KEYS } from "@/shared/config/permissions";
import { useLang } from "@/shared/hooks/use-lang";

export default function ManagedServiceCardsSection() {
  const { t } = useLang();
  const { data, isLoading, refetch } = useManagedServiceCardsControllerFindAllQuery({
    query: {
      query: { relations: { managed_service_cards_id_managed_service_cards_translations: true, logo: true, image: true } },
    },
    headers: {
      'x-skip-translations': true,
    }
  });

  const cards = data?.data || [];
  const { onOpen } = useModal();

  const handleCreate = () => {
    onOpen("createManagedServiceCard", {}, refetch);
  };

  const handleEdit = (card: any) => {
    onOpen("updateManagedServiceCard", { card }, refetch);
  };

  const handleDelete = (card: any) => {
    onOpen("deleteManagedServiceCard", { card }, refetch);
  };

  const columns = [
    {
      accessorKey: "type",
      header: t("cms.managedServices.coreCards.list.columns.type"),
      cell: ({ row }: any) => {
        const type = row.original.type;
        return <span className="capitalize">{type}</span>;
      },
    },
    {
      accessorKey: "description",
      header: t("cms.managedServices.coreCards.list.columns.description"),
      cell: ({ row }: any) => {
        const translations = row.original.managed_service_cards_id_managed_service_cards_translations || [];
        const enTranslation = translations.find((translation: any) => translation.language === "en");
        return <span className="line-clamp-2">{enTranslation?.description || row.original.description || "-"}</span>;
      },
    },
    {
      accessorKey: "bullet_one",
      header: t("cms.managedServices.coreCards.list.columns.bulletOne"),
      cell: ({ row }: any) => {
        const translations = row.original.managed_service_cards_id_managed_service_cards_translations || [];
        const enTranslation = translations.find((translation: any) => translation.language === "en");
        return <span>{enTranslation?.bullet_one || row.original.bullet_one || "-"}</span>;
      },
    },
    {
      accessorKey: "bullet_two",
      header: t("cms.managedServices.coreCards.list.columns.bulletTwo"),
      cell: ({ row }: any) => {
        const translations = row.original.managed_service_cards_id_managed_service_cards_translations || [];
        const enTranslation = translations.find((translation: any) => translation.language === "en");
        return <span>{enTranslation?.bullet_two || row.original.bullet_two || "-"}</span>;
      },
    },
    {
      id: "actions",
      header: t("cms.managedServices.coreCards.list.columns.actions"),
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-2">
            <ProtectedComponent permissionKey={PERMISSION_KEYS.MANAGED_SERVICE_CARDS.UPDATE}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(row.original)}
              >
                {t("cms.managedServices.coreCards.list.actions.edit")}
              </Button>
            </ProtectedComponent>
            <ProtectedComponent permissionKey={PERMISSION_KEYS.MANAGED_SERVICE_CARDS.DELETE}>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(row.original)}
              >
                {t("cms.managedServices.coreCards.list.actions.delete")}
              </Button>
            </ProtectedComponent>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("cms.managedServices.coreCards.title")}</CardTitle>
          <Button onClick={handleCreate} disabled={cards.length >= 3}>
            <Plus className="mr-2 h-4 w-4" />
            {t("cms.managedServices.coreCards.list.actions.addCard")}
          </Button>
        </CardHeader>
        <CardContent>
          {cards.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t("cms.managedServices.coreCards.list.emptyState")}
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={cards}
              loading={isLoading}
              hideSearch
              filters={false}
            />
          )}
          {cards.length >= 3 && (
            <p className="text-sm text-muted-foreground mt-4">
              {t("cms.managedServices.coreCards.list.maxReached")}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

