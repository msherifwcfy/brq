import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { DataTable } from "@/shared/components/ui/data-table";
import { useContactUsOfficesControllerReadQuery, useContactUsOfficesControllerUpdate, type Office } from "../../../../../mock-sdk/modules/contact-us-offices.gen";

export default function ContactUsOfficesSection() {
  const { data } = useContactUsOfficesControllerReadQuery();
  const updateMutation = useContactUsOfficesControllerUpdate();
  const [sectionTitle, setSectionTitle] = useState("");
  const [offices, setOffices] = useState<Office[]>([] as any);

  useEffect(() => {
    if (data) {
      setSectionTitle((data as any).sectionTitle ?? "");
      setOffices((data as any).offices ?? []);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      { header: "Country", accessorKey: "country" },
      { header: "Office Title", accessorKey: "officeTitle" },
      { header: "Location", accessorKey: "location" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Fax", accessorKey: "fax" },
      { header: "Email", accessorKey: "email" },
    ],
    []
  );

  const onSave = () => {
    updateMutation.mutate({ body: { sectionTitle, offices } as any } as any);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <Input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
        </div>
      </div>

      <div>
        {offices?.length ? (
          <DataTable columns={columns as any} data={offices as any} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">No offices found.</div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}


