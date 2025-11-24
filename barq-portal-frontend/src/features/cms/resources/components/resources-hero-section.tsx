import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useResourcesHeroControllerReadQuery, useResourcesHeroControllerUpdate } from "../../../../../mock-sdk/modules/resources-hero.gen";

export default function ResourcesHeroSection() {
  const { data } = useResourcesHeroControllerReadQuery();
  const [title, setTitle] = useState(data?.title ?? "");
  const [subtext, setSubtext] = useState(data?.subtext ?? "");
  const updateMutation = useResourcesHeroControllerUpdate();

  return (
    <div className="flex flex-col gap-4">
    
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resources" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subtext</label>
            <Textarea value={subtext} onChange={(e) => setSubtext(e.target.value)} placeholder="Discover insights, campaigns, and more." />
          </div>
        </div>
        <div className="flex justify-end">
       <Button
          onClick={() => updateMutation.mutate({ body: { id: "resources-hero", title, subtext } } as any)}
        >
          Save
        </Button>
        </div>
    </div>
  );
}


