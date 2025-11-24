import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import SecurityServiceForm from "./SecurityServiceForm";
import { DataTable } from "@/shared/components/ui/data-table";
import { useSecurityServicesColumns } from "../columns/security-services-columns";

export default function SecurityServicesSection() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const columns = useSecurityServicesColumns({
    onEdit: setEditingService,
    onDelete: () => {},
  });

  const mockData: any[] = [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Security Services (SOC, Cybersecurity, GRC)</CardTitle>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          {mockData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No services yet. Click "Add Service" to create one.
            </div>
          ) : (
            <DataTable columns={columns} data={mockData} />
          )}
        </CardContent>
      </Card>

      {(isCreating || editingService) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? "Create Security Service" : "Edit Security Service"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SecurityServiceForm
              service={editingService}
              onClose={() => {
                setIsCreating(false);
                setEditingService(null);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
