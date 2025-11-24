import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useContactUsFormControllerReadQuery, useContactUsFormControllerUpdate } from "../../../../../mock-sdk/modules/contact-us-form.gen";

export default function ContactUsFormSection() {
  const { data } = useContactUsFormControllerReadQuery();
  const updateMutation = useContactUsFormControllerUpdate();
  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSubtext, setFormSubtext] = useState("");
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const [hearAboutOptions, setHearAboutOptions] = useState<string[]>([]);
  const [newRequestType, setNewRequestType] = useState("");
  const [newHearAboutOption, setNewHearAboutOption] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setSubtext(data.subtext ?? "");
      setBackgroundImageUrl((data as any).backgroundImageUrl ?? "");
      setFormTitle((data as any).formTitle ?? "");
      setFormSubtext((data as any).formSubtext ?? "");
      setRequestTypes((data as any).requestTypes ?? []);
      setHearAboutOptions((data as any).hearAboutOptions ?? []);
    }
  }, [data]);

  const onSave = () => {
    updateMutation.mutate({
      body: {
        id: "contact-us-form",
        title,
        subtext,
        backgroundImageUrl,
        formTitle,
        formSubtext,
        requestTypes,
        hearAboutOptions,
      },
    } as any);
  };

  const addRequestType = () => {
    if (newRequestType.trim() && !requestTypes.includes(newRequestType.trim())) {
      setRequestTypes([...requestTypes, newRequestType.trim()]);
      setNewRequestType("");
    }
  };

  const removeRequestType = (type: string) => {
    setRequestTypes(requestTypes.filter(t => t !== type));
  };

  const addHearAboutOption = () => {
    if (newHearAboutOption.trim() && !hearAboutOptions.includes(newHearAboutOption.trim())) {
      setHearAboutOptions([...hearAboutOptions, newHearAboutOption.trim()]);
      setNewHearAboutOption("");
    }
  };

  const removeHearAboutOption = (option: string) => {
    setHearAboutOptions(hearAboutOptions.filter(o => o !== option));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subtext</label>
          <Textarea value={subtext} onChange={(e) => setSubtext(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background Image URL</label>
          <Input value={backgroundImageUrl} onChange={(e) => setBackgroundImageUrl(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Form Title</label>
          <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Form Subtext</label>
          <Textarea value={formSubtext} onChange={(e) => setFormSubtext(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Request Types</label>
          <div className="flex gap-2 mb-2">
            <Input 
              value={newRequestType} 
              onChange={(e) => setNewRequestType(e.target.value)}
              placeholder="Add request type"
              onKeyPress={(e) => e.key === 'Enter' && addRequestType()}
            />
            <Button type="button" onClick={addRequestType} size="sm">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {requestTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                <span>{type}</span>
                <button 
                  type="button"
                  onClick={() => removeRequestType(type)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hear About Options</label>
          <div className="flex gap-2 mb-2">
            <Input 
              value={newHearAboutOption} 
              onChange={(e) => setNewHearAboutOption(e.target.value)}
              placeholder="Add hear about option"
              onKeyPress={(e) => e.key === 'Enter' && addHearAboutOption()}
            />
            <Button type="button" onClick={addHearAboutOption} size="sm">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {hearAboutOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                <span>{option}</span>
                <button 
                  type="button"
                  onClick={() => removeHearAboutOption(option)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}


