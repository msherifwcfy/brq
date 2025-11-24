import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import DatePicker from "@/shared/components/custom/DatePicker";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsroomArticleSchema, type NewsroomArticleFormData } from "../schemas/newsroom.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface NewsroomArticleFormProps {
  article?: any;
  onClose: () => void;
}

export default function NewsroomArticleForm({ article, onClose }: NewsroomArticleFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<NewsroomArticleFormData>({
    resolver: zodResolver(newsroomArticleSchema),
    defaultValues: {
      categoryId: article?.category_id || "",
      title: { en: article?.title_en || "", ar: article?.title_ar || "" },
      description: { en: article?.description_en, ar: article?.description_ar },
      slug: article?.slug || "",
      publishDate: article?.publish_date ? new Date(article.publish_date) : new Date(),
      mediaType: article?.media_type || "image",
      thumbnailImage: [],
      mainImage: [],
      videoUrl: article?.video_url || "",
      isPublished: article?.is_published ?? false,
      displayOrder: article?.display_order ?? 0,
    },
    mode: "onChange",
  });

  const mediaType = form.watch("mediaType");

  const onSubmit = async (values: NewsroomArticleFormData) => {
    try {
      console.log("Newsroom Article data:", values);
      toast.success(article ? "Article updated successfully" : "Article created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save article");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="press-release">Press Release</SelectItem>
                    <SelectItem value="interviews">Interviews</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (URL)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="article-url-slug" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="publishDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Media Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="horizontal-video">Horizontal Video</SelectItem>
                    <SelectItem value="vertical-video">Vertical Video</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="thumbnailImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Image (Card)</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value}
                  onChange={field.onChange}
                  multiple={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mediaType !== "image" && (
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {mediaType === "image" && (
          <FormField
            control={form.control}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image (Article Detail)</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nTabContent language="en">
            <I18nFormProvider currentLanguage="en">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label="Title"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="Short Description"
                />
              </div>
            </I18nFormProvider>
          </I18nTabContent>
          <I18nTabContent language="ar">
            <I18nFormProvider currentLanguage="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label="العنوان"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="الوصف المختصر"
                />
              </div>
            </I18nFormProvider>
          </I18nTabContent>
        </I18nTabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {article ? "Update Article" : "Create Article"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
