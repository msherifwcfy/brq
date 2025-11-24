import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useHomeAwardsControllerReadQuery,
  useHomeAwardsControllerCreate,
  useHomeAwardsControllerUpdate,
} from "@/sdk/modules/homeaward.gen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createHomeAwardsSchema,
  updateHomeAwardsSchema,
} from "../schemas/home-awards.schema";
import type {
  CreateHomeAwardsFormData,
  UpdateHomeAwardsFormData,
} from "../schemas/home-awards.schema";
import { toast } from "sonner";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { createHomeImagesSchema, updateHomeImagesSchema, type CreateHomeImagesFormData, type UpdateHomeImagesFormData } from "../schemas/home-images.schema";

export default function HomeSuccessStoriesImages() {
  const { t } = useLang();

  const { data, isLoading, refetch } = useHomeAwardsControllerReadQuery({
    query: {
      query: {
        relations: {
          home_awards_id_home_awards_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });


  const existing = data?.data?.[0];
  const isUpdate = !!existing;

  type FormData = CreateHomeImagesFormData | UpdateHomeImagesFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateHomeImagesSchema : createHomeImagesSchema
    ),
    defaultValues: {
      description: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation = existing.home_awards_id_home_awards_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.home_awards_id_home_awards_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      description: {
        en: enTranslation?.description || existing.description || "",
        ar: arTranslation?.description || "",
      },
    } as unknown as FormData);
  }, [existing, form]);

  // const createMutation = useHomeAwardsControllerCreate();
  // const updateMutation = useHomeAwardsControllerUpdate();

  const onSubmit = async (values: FormData) => {
    if (!existing) {
      // await createMutation.mutateAsync(
      //   {
      //     body: {
      //       image1: values.image1?.[0]?.id || "",
      //       image2: values.image2?.[0]?.id || "",
      //       image3: values.image3?.[0]?.id || "",
      //     },
      //   },
      //   {
      //     onSuccess: () => {
      //       toast.success(t("cms.homePage.homeAwards.messages.homeAwardsCreated"));
      //     },
      //     onError: (error) => {
      //       toast.error(
      //         error.message ||
      //         t("cms.homePage.homeAwards.messages.errorCreatingHomeAwards")
      //       );
      //     },
      //   }
      // );
    } else {
      // await updateMutation.mutateAsync(
      //   {
      //     path: { id: String(existing.id) },
      //     body: {
      //       image1: values.image1?.[0]?.id || "",
      //       image2: values.image2?.[0]?.id || "",
      //       image3: values.image3?.[0]?.id || "",
      //     },
      //   },
      //   {
      //     onSuccess: () => {
      //       toast.success(t("cms.homePage.hero.messages.imagesUpdated"));
      //     },
      //     onError: (error) => {
      //       toast.error(
      //         error.message ||
      //         t("cms.homePage.hero.messages.errorUpdatingImages")
      //       );
      //     },
      //   }
      // );
    }
  };

  if (isLoading) return <div />;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name={"image1"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cms.homePage.success_stories_images.image1")}</FormLabel>
                  <FormControl>
                    <DocumentUploader
                      value={(field.value as any) || []}
                      maxDocuments={1}
                      maxSize={100 * 1024 * 1024}
                      acceptedFileTypes={["image/*", "video/*"]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"image2"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cms.homePage.success_stories_images.image2")}</FormLabel>
                  <FormControl>
                    <DocumentUploader
                      value={(field.value as any) || []}
                      maxDocuments={1}
                      maxSize={100 * 1024 * 1024}
                      acceptedFileTypes={["image/*", "video/*"]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"image3"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cms.homePage.success_stories_images.image3")}</FormLabel>
                  <FormControl>
                    <DocumentUploader
                      value={(field.value as any) || []}
                      maxDocuments={1}
                      maxSize={100 * 1024 * 1024}
                      acceptedFileTypes={["image/*", "video/*"]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex justify-end items-center gap-3">
        <Button type="submit" loading={form.formState.isSubmitting}>
          {existing ? t("cms.homePage.hero.form.update") : t("cms.homePage.hero.form.create")}
        </Button>
      </div>
    </div>
  );
}

