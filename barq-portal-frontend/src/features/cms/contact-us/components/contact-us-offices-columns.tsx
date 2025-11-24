import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useLang } from "@/shared/hooks/use-lang";

export type ContactUsOfficeRow = {
  id?: number;
  country: {
    en: string;
    ar: string;
  };
  countryFlag?: Array<{ id: number; url: string }>;
  officeTitle: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  phone: string;
  fax: string;
  email: string;
};

export const useContactUsOfficesColumns = (
  handleEdit: (office: ContactUsOfficeRow) => void,
  handleDelete: (office: ContactUsOfficeRow) => void
): ColumnDef<ContactUsOfficeRow>[] => {
  const { t } = useLang();

  return [
    {
      accessorKey: "country",
      header: t("cms.contactUs.offices.columns.country"),
      cell: ({ row }) => row.original.country.en || row.original.country.ar,
    },
    {
      accessorKey: "officeTitle",
      header: t("cms.contactUs.offices.columns.officeTitle"),
      cell: ({ row }) =>
        row.original.officeTitle.en || row.original.officeTitle.ar,
    },
    {
      accessorKey: "location",
      header: t("cms.contactUs.offices.columns.location"),
      cell: ({ row }) => row.original.location.en || row.original.location.ar,
    },
    { accessorKey: "phone", header: t("cms.contactUs.offices.columns.phone") },
    { accessorKey: "fax", header: t("cms.contactUs.offices.columns.fax") },
    { accessorKey: "email", header: t("cms.contactUs.offices.columns.email") },
    {
      id: "actions",
      header: t("cms.contactUs.offices.columns.actions"),
      cell: ({ row }) => {
        const office = row.original;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align="end">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none px-3 py-2"
                onClick={() => handleEdit(office)}
              >
                <PencilIcon className="w-4 h-4" />
                {t("common.update")}
              </Button>
              {/* <Button
                variant="ghost"
                className="w-full justify-start rounded-none px-3 py-2 text-destructive"
                onClick={() => handleDelete(office)}
              >
                <TrashIcon className="w-4 h-4" />
                {t("actions.delete")}
              </Button> */}
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];
};
