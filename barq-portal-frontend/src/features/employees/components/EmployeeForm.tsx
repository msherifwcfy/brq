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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRolesControllerReadQuery } from "@/sdk/modules/role.gen";
import { useLang } from "@/shared/hooks/use-lang";

const createEmployeeCreateSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("employees.validation.nameRequired")),
    email: z
      .string()
      .min(1, t("employees.validation.emailRequired"))
      .email(t("employees.validation.emailInvalid")),
    role_id: z.string().min(1, t("employees.validation.roleRequired")),
  });

const createEmployeeUpdateSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("employees.validation.nameRequired")),
    role_id: z.string().min(1, t("employees.validation.roleRequired")),
  });

export type EmployeeFormProps = {
  defaultValues?: Partial<{
    name: string;
    email: string;
    role_id: string;
  }>;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function EmployeeForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Save",
  isUpdate = false,
}: EmployeeFormProps) {
  const { t } = useLang();
  const schema = isUpdate
    ? createEmployeeUpdateSchema(t)
    : createEmployeeCreateSchema(t);
  type FormData = z.infer<typeof schema>;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role_id: "",
      ...defaultValues,
    } as any,
    mode: "onChange",
  });

  const { data: rolesData } = useRolesControllerReadQuery({
    query: {
      query: {
        pagination: { take: 1000 },
      },
    },
  });
  const roles = rolesData?.data || [];

  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.form.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("employees.form.namePlaceholder")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isUpdate && (
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("employees.form.email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("employees.form.emailPlaceholder")}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="role_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.form.role")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("employees.form.selectRole")} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role: any) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t("employees.form.loading") : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
