import { useEffect, useMemo } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useFooterContactsControllerReadQuery,
  useFooterContactsControllerCreate,
  useFooterContactsControllerUpdate,
} from "@/sdk/modules/footercontact.gen";
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
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/shared/components/ui/input";

const createFooterContactsSchema = z.object({
  phone_number_key: z
    .string()
    .min(1, "Phone number key is required")
    .regex(/^\+[0-9]+$/, {
      message: "Phone number key must start with + followed by digits only",
    })
    .min(2, "Phone number key must be at least 2 characters (e.g., +966)")
    .max(6, "Phone number key must not exceed 6 characters"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, {
      message: "Phone number must contain only digits",
    })
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters"),
});

const updateFooterContactsSchema = createFooterContactsSchema;

type CreateFooterContactsFormData = z.infer<typeof createFooterContactsSchema>;
type UpdateFooterContactsFormData = z.infer<typeof updateFooterContactsSchema>;

export default function FooterContactsSection() {
  const { t } = useLang();

  const {
    data: footerContactsData,
    isLoading,
    refetch,
  } = useFooterContactsControllerReadQuery({
    query: {
      query: {
        pagination: {
          take: 1,
        },
        relations: {
          footer_contacts_id_footer_contacts_translations: true,
        },
      },
    },
  });

  const footerContacts = footerContactsData?.data?.[0];
  const isUpdate = !!footerContacts;

  const schema = isUpdate
    ? updateFooterContactsSchema
    : createFooterContactsSchema;
  type FormData = CreateFooterContactsFormData | UpdateFooterContactsFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone_number_key: "",
      phone_number: "",
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  const createFooterContactsMutation = useFooterContactsControllerCreate();
  const updateFooterContactsMutation = useFooterContactsControllerUpdate();

  // Reset form when data changes
  useEffect(() => {
    if (footerContacts) {
      reset({
        phone_number_key: footerContacts.phone_number_key,
        phone_number: footerContacts.phone_number,
        email: footerContacts.email,
      });
    } else {
      reset({
        phone_number_key: "",
        phone_number: "",
        email: "",
      });
    }
  }, [footerContacts, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isUpdate && footerContacts) {
        await updateFooterContactsMutation.mutateAsync({
          body: {
            phone_number_key: data.phone_number_key,
            phone_number: data.phone_number,
            email: data.email,
          },
          path: {
            id: footerContacts.id.toString(),
          },
        });
        toast.success(t("footerContacts.messages.footerContactsUpdated"));
      } else {
        await createFooterContactsMutation.mutateAsync({
          body: {
            phone_number_key: data.phone_number_key,
            phone_number: data.phone_number,
            email: data.email,
          },
        });
        toast.success(t("footerContacts.messages.footerContactsCreated"));
      }
      refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          (isUpdate
            ? t("footerContacts.messages.errorUpdatingFooterContacts")
            : t("footerContacts.messages.errorCreatingFooterContacts"))
      );
      console.error("Error saving footer contacts:", error);
    }
  };

  const isLoadingMutation =
    createFooterContactsMutation.isPending ||
    updateFooterContactsMutation.isPending;

  return (
    <div className="space-y-6">
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="phone_number_key"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("footerContacts.form.phoneNumberKey")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t(
                      "footerContacts.form.phoneNumberKeyPlaceholder"
                    )}
                    disabled={isLoadingMutation}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone_number"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("footerContacts.form.phoneNumber")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t(
                      "footerContacts.form.phoneNumberPlaceholder"
                    )}
                    disabled={isLoadingMutation}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("footerContacts.form.email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("footerContacts.form.emailPlaceholder")}
                    disabled={isLoadingMutation}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoadingMutation}
              loading={isLoadingMutation}
              className="min-w-[120px]"
            >
              {isUpdate
                ? t("footerContacts.updateFooterContacts")
                : t("footerContacts.createFooterContacts")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
