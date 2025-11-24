import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import {
  ContactUsOfficeForm,
  type ContactUsOfficeFormValues,
} from "./ContactUsOfficeForm";
import { useContactUsOfficesControllerUpdate } from "@/sdk/modules/contactusoffice.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type {
  ContactUsOfficesBulletsEntity,
  ContactUsOfficesBulletsTranslationsEntity,
} from "@/sdk";

export function UpdateContactUsOfficeModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateContactUsOffice";
  const updateMutation = useContactUsOfficesControllerUpdate();

  const existingOffices = data?.existingOffices;
  const office = data?.office;

  const handleSubmit = async (values: ContactUsOfficeFormValues) => {
    const prevBullets =
      existingOffices?.contact_us_offices_bullets_id_contact_us_offices_bullets ||
      [];
    const nextBullets = prevBullets.map((b: ContactUsOfficesBulletsEntity) => {
      if (b.id !== office?.id)
        return {
          // make sure no null values are passed
          id: b.id,
          country_name: b.country_name || undefined,
          office_name: b.office_name || undefined,
          location: b.location || undefined,
          phone: b.phone || undefined,
          fax: b.fax || undefined,
          email: b.email || undefined,
          icon_id: b.icon_id || undefined,
          contact_us_offices_bullets_id_contact_us_offices_bullets_translations:
            b.contact_us_offices_bullets_id_contact_us_offices_bullets_translations.map(
              (t: ContactUsOfficesBulletsTranslationsEntity) => ({
                country_name: t.country_name || undefined,
                office_name: t.office_name || undefined,
                location: t.location || undefined,
                language: t.language,
              })
            ),
        } as ContactUsOfficesBulletsEntity;
      return {
        id: b.id,
        country_name: values.country.ar,
        office_name: values.officeTitle.ar,
        location: values.location.ar || undefined,
        phone: values.phone || undefined,
        fax: values.fax || undefined,
        email: values.email || undefined,
        icon_id: values.countryFlag?.[0]?.id,
        contact_us_offices_bullets_id_contact_us_offices_bullets_translations: [
          {
            country_name: values.country.en || undefined,
            office_name: values.officeTitle.en || undefined,
            location: values.location.en || undefined,
            language: "en" as const,
          },
        ],
      };
    });

    try {
      await updateMutation.mutateAsync({
        path: { id: String(existingOffices.id) },
        body: {
          contact_us_offices_bullets_id_contact_us_offices_bullets: nextBullets,
        },
      });
      toast.success(t("cms.contactUs.offices.messages.officeUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.contactUs.offices.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.contactUs.offices.updateOffice")}</DialogTitle>
        </DialogHeader>
        <ContactUsOfficeForm
          defaultValues={{
            country: office?.country || { en: "", ar: "" },
            countryFlag: office?.countryFlag || [],
            officeTitle: office?.officeTitle || { en: "", ar: "" },
            location: office?.location || { en: "", ar: "" },
            phone: office?.phone || "",
            fax: office?.fax || "",
            email: office?.email || "",
          }}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.contactUs.offices.form.update")}
        />
      </DialogContent>
    </Dialog>
  );
}
