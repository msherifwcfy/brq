import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { DataTable } from "@/shared/components/ui/data-table";
import { useResourcesListingControllerReadQuery, useResourcesListingControllerCreate, useResourcesListingControllerUpdate, useResourcesListingControllerDelete, type ResourceCard } from "../../../../../mock-sdk/modules/resources-listing.gen";
import { useResourcesColumns } from "../columns/resources-columns";
import ResourcesForm from "./ResourcesForm";

export default function ResourcesListingSection() {
  const [page] = useState(1);
  const pageSize = 9;
  const { data } = useResourcesListingControllerReadQuery({ query: { page, pageSize } } as any);
  const createMutation = useResourcesListingControllerCreate();
  const updateMutation = useResourcesListingControllerUpdate();
  const deleteMutation = useResourcesListingControllerDelete();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const columns = useResourcesColumns({
    onEdit: setEditing,
    onDelete: (id) => deleteMutation.mutate({ body: { id } } as any),
  });

  const onCreate = () => {
    setEditing(null);
    setIsOpen(true);
  };

  const onSave = (values: any) => {
    const id = editing?.id ?? `res-${Date.now()}`;
    const body: ResourceCard = { id, ...values } as any;
    if (editing) {
      updateMutation.mutate({ body } as any);
    } else {
      createMutation.mutate({ body } as any);
    }
    setIsOpen(false);
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={onCreate}>Add Resource</Button>
      </div>
      {data?.items?.length ? (
        <DataTable columns={columns as any} data={data.items as any} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">No resources yet. Click "Add Resource" to create one.</div>
      )}
      <Dialog open={isOpen || !!editing} onOpenChange={(open) => { if (!open) { setIsOpen(false); setEditing(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Resource" : "Create Resource"}</DialogTitle>
          </DialogHeader>
          <ResourcesForm item={editing ?? undefined} onClose={() => { setIsOpen(false); setEditing(null); }} onSubmit={onSave} />
        </DialogContent>
      </Dialog>
    </div>
  );
}


