import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "@/shared/components/ui/data-table";
import { Form } from "@/shared/components/ui/form";
import {
  useContactUsOfficesControllerReadQuery,
  useContactUsOfficesControllerUpdate,
} from "@/sdk/modules/contactusoffice.gen";
import { useModal } from "@/shared/store/modal-store";
import {
  useContactUsOfficesColumns,
  type ContactUsOfficeRow,
} from "./contact-us-offices-columns";
import { useLang } from "@/shared/hooks/use-lang";
import {
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
  I18nFormTextField,
} from "@/shared/components/custom/i18n";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

type Office = ContactUsOfficeRow;

type OfficeTitleFormValues = {
  officeTitle: {
    en: string;
    ar: string;
  };
};

export default function ContactUsOfficesSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  
  const form = useForm<OfficeTitleFormValues>({
    defaultValues: {
      officeTitle: {
        en: "",
        ar: "",
      },
    },
  });

  const { data, isLoading, refetch } = useContactUsOfficesControllerReadQuery({
    query: {
      query: {
        relations: {
          contact_us_offices_id_contact_us_offices_translations: true,
          contact_us_offices_bullets_id_contact_us_offices_bullets: {
            contact_us_offices_bullets_id_contact_us_offices_bullets_translations:
              true,
            icon: true,
          },
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingOffices = data?.data?.[0];
  const { onOpen } = useModal();
  const [offices, setOffices] = useState<Office[]>([]);

  const updateMutation = useContactUsOfficesControllerUpdate();

  useEffect(() => {
    if (existingOffices) {
      const bullets =
        existingOffices.contact_us_offices_bullets_id_contact_us_offices_bullets ??
        [];
      const mappedOffices: Office[] = bullets.map((bullet) => {
        const enTranslation =
          bullet.contact_us_offices_bullets_id_contact_us_offices_bullets_translations?.find(
            (t) => t.language === "en"
          );
        return {
          id: bullet.id,
          country: {
            en: enTranslation?.country_name ?? "",
            ar: bullet.country_name ?? "",
          },
          countryFlag: bullet.icon
            ? [{ id: bullet.icon.id, url: bullet.icon.url }]
            : [],
          officeTitle: {
            en: enTranslation?.office_name ?? "",
            ar: bullet.office_name ?? "",
          },
          location: {
            en: enTranslation?.location ?? "",
            ar: bullet.location ?? "",
          },
          phone: bullet.phone ?? "",
          fax: bullet.fax ?? "",
          email: bullet.email ?? "",
        };
      });
      setOffices(mappedOffices);

      const enTranslation =
        existingOffices.contact_us_offices_id_contact_us_offices_translations?.find(
          (t) => t.language === "en"
        );
      form.reset({
        officeTitle: {
          en: enTranslation?.title ?? "",
          ar: existingOffices.title ?? "",
        },
      });
    }
  }, [existingOffices, form]);

  const handleCreate = () =>
    onOpen("createContactUsOffice", { existingOffices }, refetch);
  const handleEdit = (office: Office) =>
    onOpen("updateContactUsOffice", { office, existingOffices }, refetch);
  const handleDelete = (office: Office) =>
    onOpen("deleteContactUsOffice", { office, existingOffices }, refetch);

  const columns = useContactUsOfficesColumns(handleEdit, handleDelete);

  const onSubmit = async (values: OfficeTitleFormValues) => {
    if (!existingOffices?.id) {
      toast.error(t("cms.contactUs.offices.messages.errorUpdating"));
      return;
    }

    try {
      await updateMutation.mutateAsync({
        path: {
          id: existingOffices.id.toString(),
        },
        body: {
          title: values.officeTitle.ar,
          contact_us_offices_id_contact_us_offices_translations: [
            {
              title: values.officeTitle.en,
              language: "en",
            },
          ],
        },
      });

      toast.success(t("cms.contactUs.offices.messages.officeSaved"));
      await refetch();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("cms.contactUs.offices.messages.errorUpdating")
      );
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <I18nTabs value={currentLanguage} onValueChange={setCurrentLanguage}>
            <I18nTabContent language="en">
              <I18nFormProvider currentLanguage="en">
                <I18nFormTextField
                  name="officeTitle"
                  control={form.control}
                  label={t("cms.contactUs.offices.officeTitle")}
                  placeholder={t("cms.contactUs.offices.officeTitlePlaceholder")}
                />
              </I18nFormProvider>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormProvider currentLanguage="ar">
                <I18nFormTextField
                  name="officeTitle"
                  control={form.control}
                  label={t("cms.contactUs.offices.officeTitle")}
                  placeholder={t("cms.contactUs.offices.officeTitlePlaceholder")}
                />
              </I18nFormProvider>
            </I18nTabContent>
          </I18nTabs>
          <div className="flex justify-end">
            <Button type="submit" loading={updateMutation.isPending}>
              {t("cms.contactUs.offices.submit")}
            </Button>
          </div>
        </form>
      </Form>

      <DataTable
        columns={columns}
        data={offices}
        loading={isLoading}
        tableId="contact-us-offices"
        hideSearch
      />
    </div>
  );
}
