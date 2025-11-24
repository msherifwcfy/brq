import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createSolutionSchema,
  updateSolutionSchema,
} from "../schemas/solutions.schema";
import type {
  CreateSolutionFormData,
  UpdateSolutionFormData,
} from "../schemas/solutions.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { Separator } from "@/shared/components/ui/separator";

export type SolutionFormProps = {
  defaultValues?: Partial<CreateSolutionFormData | UpdateSolutionFormData>;
  onSubmit: (values: CreateSolutionFormData | UpdateSolutionFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function SolutionForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: SolutionFormProps) {
  const { t } = useLang();

  // Create localized schemas
  const localizedCreateSchema = z.object({
    name: z.string().min(1, t("solutions.validation.solutionNameRequired")),
    solution_id_solution_translations: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, t("solutions.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    name: z
      .string()
      .min(1, t("solutions.validation.solutionNameRequired"))
      .optional(),
    solution_id_solution_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          solution_id: z.number().positive().optional(),
          name: z
            .string()
            .min(1, t("solutions.validation.translationNameRequired")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateSolutionFormData | UpdateSolutionFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      solution_id_solution_translations: [{ name: "", language: "en" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("solutions.form.solutionName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("solutions.form.solutionNamePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormLabel>{t("solutions.form.translations")}</FormLabel>

          <FormField
            name="solution_id_solution_translations.0.name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("solutions.form.englishName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("solutions.form.englishNamePlaceholder")}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("solutions.form.loading")
            : submitLabel || t("solutions.form.save")}
        </Button>
      </form>
    </Form>
  );
}
