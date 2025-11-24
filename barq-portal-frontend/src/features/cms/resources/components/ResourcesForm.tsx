import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(15).max(60),
  description: z.string().min(30).max(150),
  date: z.string(),
  readTime: z.coerce.number().min(1),
  layout: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  campaignCRMID: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type ResourcesFormData = z.infer<typeof schema>;

export default function ResourcesForm({ item, onClose, onSubmit }: { item?: any; onClose: () => void; onSubmit: (values: ResourcesFormData) => void; }) {
  const form = useForm<ResourcesFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: item?.title ?? "",
      description: item?.description ?? "",
      date: item?.date ?? "Aug 14, 2025",
      readTime: item?.readTime ?? 5,
      layout: item?.layout ?? 1,
      campaignCRMID: item?.campaignCRMID ?? "",
      imageUrl: item?.imageUrl ?? "",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Aug 14, 2025" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField control={form.control} name="readTime" render={({ field }) => (
            <FormItem>
              <FormLabel>Read Time (min)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="layout" render={({ field }) => (
            <FormItem>
              <FormLabel>Layout</FormLabel>
              <Select onValueChange={(v) => field.onChange(parseInt(v) as 1|2|3)} value={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Layout 1</SelectItem>
                  <SelectItem value="2">Layout 2</SelectItem>
                  <SelectItem value="3">Layout 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="campaignCRMID" render={({ field }) => (
            <FormItem>
              <FormLabel>CRM Campaign ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}


