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
import {
  useContactUsOfficesControllerCreate,
  useContactUsOfficesControllerUpdate,
} from "@/sdk/modules/contactusoffice.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export function CreateContactUsOfficeModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "createContactUsOffice";
  const createMutation = useContactUsOfficesControllerCreate();
  const updateMutation = useContactUsOfficesControllerUpdate();

  const existingOffices = data?.existingOffices;

  const handleSubmit = async (values: ContactUsOfficeFormValues) => {
    const newBullet = {
      country_name: values.country.ar,
      office_name: values.officeTitle.ar,
      location: values.location.ar,
      phone: values.phone || "",
      fax: values.fax || "",
      email: values.email || "",
      icon_id: values.countryFlag?.[0]?.id,
      contact_us_offices_bullets_id_contact_us_offices_bullets_translations: [
        {
          country_name: values.country.en,
          office_name: values.officeTitle.en,
          location: values.location.en,
          language: "en" as const,
        },
      ],
    };

    try {
      if (existingOffices?.id) {
        const prevBullets =
          existingOffices.contact_us_offices_bullets_id_contact_us_offices_bullets ||
          [];
        await updateMutation.mutateAsync({
          path: { id: String(existingOffices.id) },
          body: {
            contact_us_offices_bullets_id_contact_us_offices_bullets: [
              ...prevBullets,
              newBullet,
            ],
          },
        });
      } else {
        await createMutation.mutateAsync({
          body: {
            contact_us_offices_bullets_id_contact_us_offices_bullets: [
              newBullet as any,
            ],
          },
        });
      }
      toast.success(t("cms.contactUs.offices.messages.officeSaved"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.contactUs.offices.messages.errorSaving")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.contactUs.offices.createOffice")}</DialogTitle>
        </DialogHeader>
        <ContactUsOfficeForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending || updateMutation.isPending}
          submitLabel={t("cms.contactUs.offices.form.create")}
        />
      </DialogContent>
    </Dialog>
  );
}
